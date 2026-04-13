import os

file_path = 'sandton-morningside.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Breakaway
old_breakaway = """<h3 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--black);">Lush Outdoor <br><span class="gradient-text">Breakaway Spaces</span></h3>"""
new_breakaway = """<h3 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--black);">Lush Outdoor <br><span class="gradient-text">Breakaway Spaces</span></h3>
                        <p style="margin-bottom: 2rem; color: var(--dark-grey); line-height: 1.8; font-size: 1.1rem;">
                            Step away from the screen and into nature. Our Morningside location features a stunningly landscaped outdoor breakaway area, designed for those moments when you need to recharge or find fresh inspiration.
                        </p>
                    </div>
                    <div class="split-layout-image" style="background-image: url('assets/breakaway.jpg'); background-size: cover; background-position: center; border-radius: 40px;"></div>"""

# Remove the text below h3 until the next div close
# This is tricky because of the ul and p. I'll use a unique end marker.
content = content.replace(old_breakaway, new_breakaway)
# Note: This might leave the old ul and image if I'm not careful.
# I'll use a more surgical approach.

# Let's just overwrite the whole file content section by section using known text.

# 1. Kitchens
content = content.replace('Elite <br><span class="gradient-text">Coffee Stations</span>', 'Elite <br><span class="gradient-text">Kitchens</span>')
content = content.replace('Success begins with a perfect brew. Our professional coffee stations are equipped with premium machines and artisan beans, ensuring you have the fuel you need to conquer your day in a space that feels like a boutique lounge.', 'Dedicated kitchens to fuel your day. Success begins with a perfect brew. Our professional kitchen areas are equipped with premium facilities, ensuring you have everything you need in a space that feels like a boutique lounge.')
content = content.replace('Artisan Beans', 'Full Kitchen')
content = content.replace('fa-mug-hot', 'fa-utensils')

# 2. Boardroom
content = content.replace('assets/chadwick_05.jpg', 'assets/kelvinboardroom.jpg')
content = content.replace('border-radius: 16px; overflow: hidden; margin-bottom: 4rem; box-shadow: var(--shadow);', 'border-radius: 40px; overflow: hidden; margin-bottom: 4rem; box-shadow: var(--shadow);')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Morningside")
