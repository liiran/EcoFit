# Acess DB
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from img2vec import Img2Vec
import os

uri = "mongodb+srv://devdesai:9Xh2WDU7BaK1XPWW@cluster0.enhlkqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
  
db = client.SustainableClothing
collection = db.data

img2vec = Img2Vec()
test_image = img2vec.load_image("./img2vec/testimages/tee2.jpeg")
test_image_embedding = img2vec.get_image_embedding(test_image).flatten().tolist()

results = collection.aggregate([
   {
      "$vectorSearch": {
         "queryVector": test_image_embedding,
         "path": "image_embedding",
         "numCandidates": 10,
         "limit": 2,
         "index": "vector_index",
      }
   }
])

for r in results:
   print(f'Image: {r["image_name"]}\n')

# folder_path = "./img2vec/testimages"
# image_files = os.listdir(folder_path)

# for img_file in image_files:
#     img_path = os.path.join(folder_path, img_file)
#     image = img2vec.load_image(img_path)
#     image_embedding = img2vec.get_image_embedding(image)
#     collection.insert_one({"image_embedding": image_embedding.flatten().tolist(), "image_name": img_file})