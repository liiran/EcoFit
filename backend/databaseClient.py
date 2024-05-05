from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from img2vec import Img2Vec
import os
from dotenv import load_dotenv

class DatabaseClient:
    def __init__(self):
        # Create a new client and connect to the server
        load_dotenv()
        self.client = MongoClient(os.getenv("MONGO_DB_URI"), server_api=ServerApi('1'))  
        try:
          self.client.admin.command('ping')
          print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
           print("Error")
            # raise e
        
        # Access collection
        self.collection = self.client.SustainableClothing.data

        # Create instance of vectorization class
        self.img2vec = Img2Vec()
    
    def insert_local_images(self, folder_path):
        image_files = os.listdir(folder_path)
        for img_file in image_files:
          img_path = os.path.join(folder_path, img_file)
          image = self.img2vec.load_local_image(img_path)
          image_embedding = self.img2vec.get_image_embedding(image)
          image_base64 = self.img2vec.convert_base64(img_path)
          self.collection.insert_one({"image_embedding": image_embedding.flatten().tolist(), "image_name": img_file, "company_name" : "Paka", "imageBase64" : image_base64})
    
    def query_image(self, image_base64):
        """
        Takes in a base64 string image and returns the top 4
        sustainable clothing alternatives
        """
        image_array = self.img2vec.load_base64_image(image_base64)
        image_embedding = self.img2vec.get_image_embedding(image_array).flatten().tolist()

        results = self.collection.aggregate([
          {
              "$vectorSearch": {
                "queryVector": image_embedding,
                "path": "image_embedding",
                "numCandidates": 200,
                "limit": 8,
                "index": "vector_index",
              }
          }
        ])
        
        return results
