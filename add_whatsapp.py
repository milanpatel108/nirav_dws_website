import os

files = [f for f in os.listdir('.') if f.endswith('.html')]
whatsapp_html = '<a href="https://wa.me/27792105562?text=Hi,%20I%20am%20interested%20in%20your%20workspaces." class="whatsapp-float-btn" target="_blank" title="Chat with us"><i class="fab fa-whatsapp"></i></a>\n</body>'

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'whatsapp-float-btn' not in content:
        new_content = content.replace('</body>', whatsapp_html)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"Skipped {file_path} (already has button)")
