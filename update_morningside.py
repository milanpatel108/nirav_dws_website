import os
import urllib.parse

# New image path and its encoded version for HTML/CSS
new_image_path = "assets/morning side cover/Gemini_Generated_Image_m2g25fm2g25fm2g2 (1).png"
encoded_path = "assets/morning%20side%20cover/Gemini_Generated_Image_m2g25fm2g25fm2g2%20(1).png"

files_to_update = [
    "index.html",
    "sandton-morningside.html",
    "locations.html",
    "village-jhb.html",
    "chadwick-wynberg.html"
]

target_image = "assets/kelvincover.jpg"

for filename in files_to_update:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace occurrences
        if target_image in content:
            new_content = content.replace(target_image, encoded_path)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No occurrences of {target_image} in {filename}")
    else:
        print(f"File {filename} not found")
