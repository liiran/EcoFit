from PIL import Image, ImageEnhance
from keras.api.applications.vgg19 import VGG19, preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os
import base64

class Img2Vec:

  def __init__(self):

    # Initialize vgg19 model with pre-computed weights from imagenet 
    # fine-tune the model? - resnet50 vs vgg19
    self.vgg19 = VGG19(weights='imagenet', include_top=False, pooling='max', input_shape=(224, 224, 3))

    # Freeze all layers in the model to prevent them from being updated during training - so gradients are not calculated (no additional learning is done)
    for model_layer in self.vgg19.layers:
        model_layer.trainable = False
  
  def load_image(self, image_path):
    """
    Takes in a local image path and returns a (224, 224, 3) 
    numpy array of the image
    """
    # Open the image file and resize the image to 224x224
    input_image = Image.open(image_path)
    resized_image = input_image.resize((224, 224))

    # Enhance the contrast of the image and then convert the image to a numpy array
    contrast = ImageEnhance.Contrast(resized_image)
    enhanced_image = contrast.enhance(1.3)

    image1_array = np.array(enhanced_image)

    # Convert the image from RGB to YUV colorspace
    # yuv_img = cv2.cvtColor(image1_array, cv2.COLOR_RGB2YUV)

    # Convert the image back to RGB
    # image1_array = cv2.cvtColor(yuv_img, cv2.COLOR_YUV2RGB)
  
    # Add an extra dimension to the array for batch processing
    image1_array = np.expand_dims(image1_array, axis=0)

    return image1_array
  
  def get_image_embedding(self, image):
    """
    Gets dense vector embedding for an image in the form of a
    (224, 224, 3) numpy array
    """
    image_embedding = self.vgg19.predict(image)
    return image_embedding
  
  def calculate_similarity(self, embedding1, embedding2):
    """
    Calculate cosine similarity for two vector embeddings
    """
    similarity_score = cosine_similarity(embedding1, embedding2)
    return similarity_score

  def convert_base64(self, image_path):
    """
    Convert image to base64 encoding
    """
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# *************************************************************************************

# Print similarities of all images in testimages folder
# img2vec = Img2Vec()

# print(os.getcwd())
# folder_path = "../img2vec/testimages" # "./img2vec/testimages"
# image_files = os.listdir(folder_path) # list of all files
# image_embeddings = []
# image_names = []
# similar_pairs = []

# for img_file in image_files:

#     Construct the full path to each image in the testimages file
#     then load the image and generate its embedding
#     img_path = os.path.join(folder_path, img_file)
#     image = img2vec.load_image(img_path)
#     image_embedding = img2vec.get_image_embedding(image)

#     add the embedding and file name to their respective lists
#     image_embeddings.append(image_embedding)
#     image_names.append(img_file)

# print("\nSimilarity Scores: \n")

# Calculate and print the similiarity scores for each pair of images
# for i in range(len(image_embeddings)):
#     for j in range(i+1, len(image_embeddings)):
#         similarity_score = img2vec.calculate_similarity(image_embeddings[i], image_embeddings[j])
#         print(f"{image_names[i]} vs {image_names[j]} - similarity is {similarity_score[0][0]* 100:.4f}%")

#         if (similarity_score[0][0]* 100) > 65:
#             similar_pairs.append((image_names[i], image_names[j]))

# print("\nSimilar Items: \n")
# Print the pairs of similar items
# for pair in similar_pairs:
#     print(f"{pair[0]} and {pair[1]} are similar!")
