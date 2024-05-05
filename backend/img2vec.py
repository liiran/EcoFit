from PIL import Image, ImageEnhance
from keras.api.applications.vgg19 import VGG19
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import io
import base64

class Img2Vec:

  def __init__(self):

    # Initialize vgg19 model with pre-computed weights from imagenet 
    # fine-tune the model? - resnet50 vs vgg19
    self.vgg19 = VGG19(weights='imagenet', include_top=False, pooling='max', input_shape=(224, 224, 3))

    # Freeze all layers in the model to prevent them from being updated during training - so gradients are not calculated (no additional learning is done)
    for model_layer in self.vgg19.layers:
        model_layer.trainable = False
  
  def load_local_image(self, image_path):
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

    # Add an extra dimension to the array for batch processing
    image1_array = np.expand_dims(image1_array, axis=0)

    return image1_array

  def load_base64_image(self, image_base64):
    """
    Takes in a base64 image string and returns a (224, 224, 3) 
    numpy array of the image
    """
    # Decode base64 string into bytes
    image_bytes = base64.b64decode(image_base64)
    image_stream = io.BytesIO(image_bytes)

    # Open the image file and resize the image to 224x224
    input_image = Image.open(image_stream)
    input_image = input_image.convert("RGB")
    resized_image = input_image.resize((224, 224))

    # Enhance the contrast of the image and then convert the image to a numpy array
    contrast = ImageEnhance.Contrast(resized_image)
    enhanced_image = contrast.enhance(1.3)

    image1_array = np.array(enhanced_image)

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
