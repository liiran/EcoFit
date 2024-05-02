from keras.api.applications.vgg16 import VGG16
from PIL import Image
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os

class Img2Vec:
  def __init__(self):
    # Initialize vgg16 model with pre-computed weights from imagenet 
    # (we can fine-tune the model if we want)
    self.vgg16 = VGG16(weights='imagenet', include_top=False, 
                        pooling='max', input_shape=(224, 224, 3))
    
    # Freeze model so gradients aren't calculated (no additional learning is done)
    for model_layer in self.vgg16.layers:
        model_layer.trainable = False
  
  def load_image(self, image_path):
    """
    Takes in a local image path and returns a (224, 224, 3) 
    numpy array of the image
    """
    input_image = Image.open(image_path)
    resized_image = input_image.resize((224, 224))
    image1_array = np.array(resized_image)
    image1_array = np.expand_dims(image1_array, axis=0)
    return image1_array
  
  def get_image_embedding(self, image):
    """
    Gets dense vector embedding for an image in the form of a
    (224, 224, 3) numpy array
    """
    image_embedding = self.vgg16.predict(image)
    return image_embedding
  
  def calculate_similarity(self, embedding1, embedding2):
    """
    Calculate cosine similarity for two vector embeddings
    """
    similarity_score = cosine_similarity(embedding1, embedding2)
    return similarity_score


# *************************************************************************************


# Print similarities of all images in testimages folder
# img2vec = Img2Vec()

# folder_path = "./img2vec/testimages"
# image_files = os.listdir(folder_path)
# image_embeddings = []
# image_names = []
# for img_file in image_files:
#     img_path = os.path.join(folder_path, img_file)
#     image = img2vec.load_image(img_path)
#     image_embedding = img2vec.get_image_embedding(image)
#     image_embeddings.append(image_embedding)
#     image_names.append(img_file)

# print("Similarity Scores:")
# for i in range(len(image_embeddings)):
#     for j in range(i+1, len(image_embeddings)):
#         similarity_score = img2vec.calculate_similarity(image_embeddings[i], image_embeddings[j])
#         print(f"{image_names[i]} vs {image_names[j]}: {similarity_score[0][0]:.4f}")
