#!/usr/bin/env python3
"""
Script to convert nested translation objects to flat key format.
Converts:
  { title: "value", form: { field: "text" } }
To:
  { "prefix.title": "value", "prefix.form.field": "text" }
"""

import re
import os

def extract_prefix(content):
    """Extract the export const name to use as prefix."""
    match = re.search(r'export const (\w+)', content)
    if match:
        return match.group(1)
    return None

def nested_to_flat(content, prefix):
    """Convert nested object to flat key format."""
    # Remove export statement to get raw object
    object_match = re.search(r'=\s*\{([\s\S]*)\};?\s*$', content)
    if not object_match:
        return None
    
    object_content = object_match.group(1)
    
    # Parse the nested structure
    flat_entries = []
    parse_nested(object_content, prefix, flat_entries)
    
    # Generate new file content
    lines = [f'export const {prefix} = {{']
    for key, value in flat_entries:
        # Escape quotes in value
        escaped_value = value.replace('"', '\\"')
        lines.append(f'    "{key}": "{escaped_value}",')
    lines.append('};')
    lines.append('')
    
    return '\n'.join(lines)

def parse_nested(content, current_path, entries, depth=0):
    """Recursively parse nested object structure."""
    # Pattern to match key: "value" or key: {
    pattern = r'(\w+)\s*:\s*(?:"([^"]*)"|\{)'
    
    pos = 0
    while pos < len(content):
        match = re.search(pattern, content[pos:])
        if not match:
            break
        
        key = match.group(1)
        full_key = f"{current_path}.{key}"
        
        if match.group(2) is not None:
            # Simple string value
            value = match.group(2)
            entries.append((full_key, value))
            pos += match.end()
        else:
            # Nested object - find matching brace
            start_pos = pos + match.end() - 1
            brace_count = 1
            end_pos = start_pos + 1
            
            while end_pos < len(content) and brace_count > 0:
                if content[end_pos] == '{':
                    brace_count += 1
                elif content[end_pos] == '}':
                    brace_count -= 1
                end_pos += 1
            
            nested_content = content[start_pos+1:end_pos-1]
            parse_nested(nested_content, full_key, entries, depth+1)
            pos = end_pos
        
        # Skip to next key
        pos += 1

def convert_file(filepath):
    """Convert a single file from nested to flat format."""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already flat (contains quoted keys with dots)
    if re.search(r'"\w+\.\w+"\s*:', content):
        print(f"  Skipping (already flat format)")
        return False
    
    prefix = extract_prefix(content)
    if not prefix:
        print(f"  Error: Could not extract prefix")
        return False
    
    new_content = nested_to_flat(content, prefix)
    if not new_content:
        print(f"  Error: Could not convert")
        return False
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  Converted successfully!")
    return True

def main():
    files_to_convert = [
        # English
        "lib/locales/en/tools/instagram/ad-copy-generator.ts",
        "lib/locales/en/tools/instagram/carousel-generator.ts",
        "lib/locales/en/tools/instagram/content-calendar.ts",
        "lib/locales/en/tools/instagram/hashtag-generator.ts",
        "lib/locales/en/tools/instagram/story-ideas.ts",
        "lib/locales/en/tools/tiktok/ad-copy-generator.ts",
        "lib/locales/en/tools/tiktok/bio-generator.ts",
        "lib/locales/en/tools/tiktok/content-calendar-generator.ts",
        "lib/locales/en/tools/tiktok/song-recommendations.ts",
        "lib/locales/en/tools/tiktok/thumbnail-text-generator.ts",
        # Spanish
        "lib/locales/es/tools/instagram/ad-copy-generator.ts",
        "lib/locales/es/tools/instagram/carousel-generator.ts",
        "lib/locales/es/tools/instagram/content-calendar.ts",
        "lib/locales/es/tools/instagram/hashtag-generator.ts",
        "lib/locales/es/tools/instagram/story-ideas.ts",
        "lib/locales/es/tools/tiktok/ad-copy-generator.ts",
        "lib/locales/es/tools/tiktok/bio-generator.ts",
        "lib/locales/es/tools/tiktok/content-calendar-generator.ts",
        "lib/locales/es/tools/tiktok/song-recommendations.ts",
        "lib/locales/es/tools/tiktok/thumbnail-text-generator.ts",
    ]
    
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    converted = 0
    for filepath in files_to_convert:
        full_path = os.path.join(base_dir, filepath)
        if os.path.exists(full_path):
            if convert_file(full_path):
                converted += 1
        else:
            print(f"File not found: {full_path}")
    
    print(f"\nConverted {converted} files")

if __name__ == "__main__":
    main()
