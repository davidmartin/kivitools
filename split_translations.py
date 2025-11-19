import os
import re

def split_locale_file(lang_code):
    input_file = f"lib/locales/{lang_code}.ts"
    output_dir = f"lib/locales/{lang_code}"
    tools_dir = f"{output_dir}/tools"
    
    os.makedirs(tools_dir, exist_ok=True)
    
    with open(input_file, 'r') as f:
        lines = f.readlines()
        
    # Remove start and end of object
    content_lines = lines[1:-1]
    
    sections = {
        "common": [],
        "home": [],
        "legal": [],
        "blog": [],
        "contact": [],
        "platforms": [],
        "tools/elevenlabs": [],
        "tools/tiktok": [],
        "tools/linkedin": [],
        "tools/forocoches": [],
        "tools/suno": [],
    }
    
    current_section = "common"
    
    # Mapping of comments to sections
    comment_map = {
        "Navigation": "common",
        "Platform Pages": "platforms",
        "ElevenLabs": "tools/elevenlabs", 
        "Voice Styles": "common",
        "Video Types": "common",
        "Voice Durations": "common",
        "Footer": "common",
        "Privacy Policy": "legal",
        "Terms and Conditions": "legal",
        "Contact Us": "contact",
        "Suggest Tool": "contact",
        "Homepage": "home",
        "Blog Section": "blog",
        "Share buttons": "common",
        "Testimonials": "home",
        "Stats Section": "home",
        "Tones": "common",
        "Languages": "common",
        "Forocoches": "tools/forocoches",
        "LinkedIn": "tools/linkedin",
        "Durations": "common",
        "TikTok": "tools/tiktok",
        "Suno": "tools/suno",
        "Common": "common",
        "Cloudflare Turnstile": "common"
    }
    
    for line in content_lines:
        stripped = line.strip()
        if stripped.startswith("//"):
            comment = stripped[2:].strip()
            # Find matching section
            found = False
            for key, section in comment_map.items():
                if key in comment:
                    current_section = section
                    found = True
                    break
            # Special case for "Durations" which matches "Voice Durations" but we want "Voice Durations" to be common.
            # Actually "Durations" is also mapped to common in my map, so it's fine.
            
        sections[current_section].append(line)

    # Write files
    for section_name, section_lines in sections.items():
        # Clean up lines (remove trailing commas if needed, but TS allows them)
        # We need to wrap in export const name = { ... }
        
        # Determine variable name from filename
        var_name = section_name.split('/')[-1]
        
        file_path = f"{output_dir}/{section_name}.ts"
        
        with open(file_path, 'w') as f:
            f.write(f"export const {var_name} = {{\n")
            f.write("".join(section_lines))
            f.write("};\n")
            
    # Create index.ts
    index_content = ""
    imports = []
    exports = []
    
    for section_name in sections.keys():
        var_name = section_name.split('/')[-1]
        if '/' in section_name:
             # Handle tools import
             # We need to import them. 
             # Actually, let's just import everything flatly for now to reconstruct the big object
             pass
        
    # We need to reconstruct the exact object structure.
    # The original object was flat.
    # So we just spread all exported objects.
    
    index_lines = []
    
    # Imports
    index_lines.append('import { common } from "./common";')
    index_lines.append('import { home } from "./home";')
    index_lines.append('import { legal } from "./legal";')
    index_lines.append('import { blog } from "./blog";')
    index_lines.append('import { contact } from "./contact";')
    index_lines.append('import { platforms } from "./platforms";')
    index_lines.append('import { elevenlabs } from "./tools/elevenlabs";')
    index_lines.append('import { tiktok } from "./tools/tiktok";')
    index_lines.append('import { linkedin } from "./tools/linkedin";')
    index_lines.append('import { forocoches } from "./tools/forocoches";')
    index_lines.append('import { suno } from "./tools/suno";')
    
    index_lines.append('')
    index_lines.append(f'export const {lang_code} = {{')
    index_lines.append('  ...common,')
    index_lines.append('  ...home,')
    index_lines.append('  ...legal,')
    index_lines.append('  ...blog,')
    index_lines.append('  ...contact,')
    index_lines.append('  ...platforms,')
    index_lines.append('  ...elevenlabs,')
    index_lines.append('  ...tiktok,')
    index_lines.append('  ...linkedin,')
    index_lines.append('  ...forocoches,')
    index_lines.append('  ...suno,')
    index_lines.append('};')
    
    with open(f"{output_dir}/index.ts", 'w') as f:
        f.write('\n'.join(index_lines))

split_locale_file('es')
split_locale_file('en')
