import os
import pyperclip

def extract_content(root_dir, extensions):
    content = []
    for root, dirs, files in os.walk(root_dir):
        # Přidáno filtrování složek a podložek
        if not any(root.startswith(os.path.join(root_dir, d)) for d in ['src']):
            continue
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                content.append(f"Obsah souboru: {file_path}")
                content.append("=" * 50)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as content_file:
                        content.append(content_file.read())
                except UnicodeDecodeError:
                    content.append("Nelze přečíst obsah souboru - možná binární nebo nekompatibilní kódování.")
                
                content.append("\n" + "=" * 50 + "\n")
    
    return "\n".join(content)

if __name__ == "__main__": 
    current_dir = os.path.dirname(os.path.abspath(__file__))
    extensions = ['.tsx', '.js', '.ts', '.css']
    output_file = "extracted_content.txt"
    
    extracted_content = extract_content(current_dir, extensions)
    
    # Uložení do souboru
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(extracted_content)
    
    # Kopírování do schránky
    pyperclip.copy(extracted_content)
    
    print(f"Extrakce dokončena. Obsah byl uložen do souboru {output_file} a zkopírován do schránky.")