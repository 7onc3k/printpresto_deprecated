import os
import re
import pyperclip

def extract_file_info(root_dir, extensions):
    file_info = []
    
    import_pattern = re.compile(r'^import\s+.*?from\s+["\'](.+?)["\']', re.MULTILINE)
    
    for root, dirs, files in os.walk(root_dir):
        # Filtrování složek a podsložek
        if not any(root.startswith(os.path.join(root_dir, d)) for d in ['src']):
            continue
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                file_info.append(f"Soubor: {file_path}")
                file_info.append("=" * 50)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as content_file:
                        content = content_file.read()
                        
                        # Extrahování importů
                        imports = import_pattern.findall(content)
                        if imports:
                            file_info.append("Importy:")
                            file_info.extend(imports)
                        
                except UnicodeDecodeError:
                    file_info.append("Nelze přečíst obsah souboru - možná binární nebo nekompatibilní kódování.")
                
                file_info.append("\n" + "=" * 50 + "\n")
    
    return "\n".join(file_info)

if __name__ == "__main__": 
    current_dir = os.path.dirname(os.path.abspath(__file__))
    extensions = ['.tsx', '.js', '.ts', '.css']
    output_file = "extracted_file_info.txt"
    
    extracted_info = extract_file_info(current_dir, extensions)
    
    # Uložení do souboru
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(extracted_info)
    
    # Kopírování do schránky
    pyperclip.copy(extracted_info)
    
    print(f"Extrakce dokončena. Informace byly uloženy do souboru {output_file} a zkopírovány do schránky.")