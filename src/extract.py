import os

def extract_tsx_content(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for root, dirs, files in os.walk(root_dir):
            for file in files:
                if file.endswith('.tsx'):
                    file_path = os.path.join(root, file)
                    out_file.write(f"Obsah souboru: {file_path}\n")
                    out_file.write("=" * 50 + "\n")
                    
                    with open(file_path, 'r', encoding='utf-8') as tsx_file:
                        out_file.write(tsx_file.read())
                    
                    out_file.write("\n\n" + "=" * 50 + "\n\n")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(current_dir, "extracted_tsx_content.txt")
    
    extract_tsx_content(current_dir, output_file)
    print(f"Extrakce dokončena. Obsah byl uložen do souboru: {output_file}")
