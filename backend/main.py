from flask import Flask, request, jsonify
from databaseClient import DatabaseClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dbClient = DatabaseClient()

@app.route("/get_sustainable_alternatives", methods=["POST"])
def get_sustainable_alternatives():
  data = request.get_json()
  base64_image = data["base64image"]
  base64_image_clean = base64_image.split(',', 1)[1]
  results = dbClient.query_image(base64_image_clean)

  result_arr = []
  for r in results:
    result_dict = {}
    result_dict["image_link"] = r["image_name"]
    result_dict["company_name"] = r["company_name"]
    result_dict["image_data"] = r["imageBase64"]
    result_arr.append(result_dict)
    
  return jsonify(result_arr)


if __name__ == "__main__":
  app.run(debug=True)