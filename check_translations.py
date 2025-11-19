import os
import re

def get_keys_from_dir(directory):
    keys = set()
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") and file != "index.ts":
                path = os.path.join(root, file)
                with open(path, "r") as f:
                    for line in f:
                        match = re.search(r'^\s*"(.*?)":', line)
                        if match:
                            keys.add(match.group(1))
    return keys

def check_translations():
    es_dir = "lib/locales/es"
    en_dir = "lib/locales/en"
    
    es_keys = get_keys_from_dir(es_dir)
    en_keys = get_keys_from_dir(en_dir)
    
    missing_in_en = es_keys - en_keys
    missing_in_es = en_keys - es_keys
    
    print(f"Total keys in ES: {len(es_keys)}")
    print(f"Total keys in EN: {len(en_keys)}")
    
    if missing_in_en:
        print("\n❌ Missing in EN (present in ES):")
        for key in sorted(missing_in_en):
            print(f"  - {key}")
    else:
        print("\n✅ All ES keys are present in EN")
        
    if missing_in_es:
        print("\n❌ Missing in ES (present in EN):")
        for key in sorted(missing_in_es):
            print(f"  - {key}")
    else:
        print("\n✅ All EN keys are present in ES")

if __name__ == "__main__":
    check_translations()
