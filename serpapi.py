# WARNING: ONLY 100 CREDITS - DONT SPAM IT

from serpapi import GoogleSearch

params = {
  "engine": "google_reverse_image",
  "image_url": "https://www.trueclassictees.com/cdn/shop/files/4000_BLACK_2.jpg?v=1710264591",
  "api_key": "cf01ec98d740e7fd5460163594dfc90f3994df99f1e9bf09bcc7b896cd0e1b1d"
}

search = GoogleSearch(params)
results = search.get_dict()
inline_images = results["inline_images"]
print(inline_images)