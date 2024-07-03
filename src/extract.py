import os

def extract_content(root_dir, output_file, extensions):
    content = []
    for root, dirs, files in os.walk(root_dir):
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
    
    with open(output_file, 'w', encoding='utf-8') as out_file:
        out_file.write("\n".join(content))

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(current_dir, "extracted_content.txt")
    extensions = ['.tsx', '.js', '.ts', '.css']
    
    extract_content(current_dir, output_file, extensions)
    print(f"Extrakce dokončena. Obsah byl uložen do souboru: {output_file}")