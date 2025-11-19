import os
import re

def refactor_tools(lang_code):
    base_dir = f"lib/locales/{lang_code}/tools"
    
    # Map comments to (platform, filename)
    # Note: The keys must match the comments in the files exactly (or be a substring unique enough)
    section_map = {
        "TikTok Script Writer": ("tiktok", "script-writer.ts"),
        "TikTok Video Ideas": ("tiktok", "video-ideas.ts"),
        "TikTok Hook Generator": ("tiktok", "hook-generator.ts"),
        "TikTok Hashtag Generator": ("tiktok", "hashtag-generator.ts"),
        "TikTok Username Generator": ("tiktok", "username-generator.ts"),
        "TikTok Username Checker": ("tiktok", "username-checker.ts"),
        "TikTok Shop Name Generator": ("tiktok", "shop-name-generator.ts"),
        "TikTok Coins Calculator": ("tiktok", "coins-calculator.ts"),
        "TikTok Money Calculator": ("tiktok", "money-calculator.ts"),
        "TikTok Transcript Generator": ("tiktok", "transcript-generator.ts"),
        "TikTok Voice Generator": ("tiktok", "voice-generator.ts"),
        "TikTok Engagement Calculator": ("tiktok", "engagement-calculator.ts"),
        "TikTok Video Downloader": ("tiktok", "video-downloader.ts"),
        "TikTok Profile Viewer": ("tiktok", "profile-viewer.ts"),
        "TikTok Profile Analytics": ("tiktok", "profile-analytics.ts"),
        "TikTok MP3 Downloader": ("tiktok", "mp3-downloader.ts"),
        "TikTok Thumbnail Downloader": ("tiktok", "thumbnail-downloader.ts"),
        
        "Instagram Caption Generator": ("instagram", "caption-generator.ts"),
        "Instagram Bio Generator": ("instagram", "bio-generator.ts"),
        "Instagram Reel Script": ("instagram", "reel-script.ts"),
        
        "Twitter Thread Maker": ("twitter", "thread-maker.ts"),
        "Twitter Bio Generator": ("twitter", "bio-generator.ts"),
        "Tweet Generator": ("twitter", "tweet-generator.ts"),
        
        "Snapchat Caption Generator": ("snapchat", "caption-generator.ts"),
        "Snapchat Story Ideas": ("snapchat", "story-ideas.ts"),
        "Snapchat Lens Ideas": ("snapchat", "lens-ideas.ts"),
        
        "YouTube Video Script Generator": ("youtube", "script-generator.ts"),
        "YouTube Title Generator": ("youtube", "title-generator.ts"),
        "YouTube Description Generator": ("youtube", "description-generator.ts"),
        
        "Reddit Post Generator": ("reddit", "post-generator.ts"),
        "Reddit Comment Generator": ("reddit", "comment-generator.ts"),
        "Reddit AMA Question Generator": ("reddit", "ama-generator.ts"),
        
        # ElevenLabs
        "ElevenLabs Voice Script Writer": ("elevenlabs", "voice-script-writer.ts"),
        "ElevenLabs Video Voiceover Script": ("elevenlabs", "video-voiceover-script.ts"),
        "ElevenLabs Voice Text Formatter": ("elevenlabs", "voice-text-formatter.ts"),
        "ElevenLabs Podcast Script Generator": ("elevenlabs", "podcast-script-generator.ts"),
        "ElevenLabs Ad/Commercial Script Generator": ("elevenlabs", "ad-script-generator.ts"),
        "ElevenLabs Audiobook Chapter Optimizer": ("elevenlabs", "audiobook-optimizer.ts"),

        # Forocoches
        "Forocoches Tools": ("forocoches", "thread-generator.ts"),
        "Forocoches Thread Generator": ("forocoches", "thread-generator.ts"),
        "Forocoches Pole Generator": ("forocoches", "pole-generator.ts"),
        "Forocoches Troll Response": ("forocoches", "troll-response.ts"),

        # LinkedIn
        "LinkedIn Tools": ("linkedin", "post-generator.ts"),
        "LinkedIn Post Generator": ("linkedin", "post-generator.ts"),
        "LinkedIn Headline Generator": ("linkedin", "headline-generator.ts"),
        "LinkedIn About Generator": ("linkedin", "about-generator.ts"),

        # Suno
        "Suno Tools": ("suno", "lyrics-generator.ts"),
        "Suno Lyrics Generator": ("suno", "lyrics-generator.ts"),
        "Suno Style Generator": ("suno", "style-generator.ts"),
        "Suno Prompt Generator": ("suno", "prompt-generator.ts"),
    }

    # Files to process
    source_files = ["tiktok.ts", "elevenlabs.ts", "forocoches.ts", "linkedin.ts", "suno.ts"]
    
    # Store content for each new file
    new_files_content = {} # (platform, filename) -> list of lines

    for source_file in source_files:
        source_path = os.path.join(base_dir, source_file)
        if not os.path.exists(source_path):
            continue
            
        with open(source_path, 'r') as f:
            lines = f.readlines()
            
        current_key = None
        
        for line in lines:
            stripped = line.strip()
            if stripped.startswith("//"):
                comment = stripped[2:].strip()
                # Find matching section
                found = False
                for key, (platform, filename) in section_map.items():
                    if key in comment:
                        current_key = (platform, filename)
                        found = True
                        break
                
                if found:
                    if current_key not in new_files_content:
                        new_files_content[current_key] = []
                    # Don't add the comment line itself if we want clean files, 
                    # OR keep it for context. Let's keep it but maybe cleaned up?
                    # The user wants "each tool has its translation".
                    # Let's keep the comment.
                    new_files_content[current_key].append(line)
                    continue
            
            if current_key:
                # Check if line is end of object "};" or "},"
                # The source files are "export const tiktok = { ... };"
                # We need to handle the closing brace of the main object
                if line.strip() == "};" or line.strip() == "},":
                    continue
                # Also skip the "export const name = {" line
                if "export const" in line:
                    continue
                    
                new_files_content[current_key].append(line)

    # Write new files
    created_platforms = set()
    
    for (platform, filename), content_lines in new_files_content.items():
        platform_dir = os.path.join(base_dir, platform)
        os.makedirs(platform_dir, exist_ok=True)
        created_platforms.add(platform)
        
        # Determine variable name from filename (e.g. script-writer -> scriptWriter)
        # But wait, the keys in the object are like "scriptWriter.title".
        # If we export a default object, we can just wrap the content.
        # However, the original structure was flat keys "scriptWriter.title": "..."
        # If we want to maintain that, we just export an object with those keys.
        
        # Variable name for the export
        var_name = filename.replace('.ts', '').replace('-', '_') # simple var name
        
        with open(os.path.join(platform_dir, filename), 'w') as f:
            f.write(f"export const {var_name} = {{\n")
            f.write("".join(content_lines))
            f.write("};\n")

    # Create index.ts for each platform
    for platform in created_platforms:
        platform_dir = os.path.join(base_dir, platform)
        files = [f for f in os.listdir(platform_dir) if f.endswith('.ts') and f != 'index.ts']
        
        index_lines = []
        exports = []
        
        for f in files:
            var_name = f.replace('.ts', '').replace('-', '_')
            index_lines.append(f'import {{ {var_name} }} from "./{f.replace(".ts", "")}";')
            exports.append(f'...{var_name}')
            
        index_lines.append('')
        index_lines.append(f'export const {platform} = {{')
        for exp in exports:
            index_lines.append(f'  {exp},')
        index_lines.append('};')
        
        with open(os.path.join(platform_dir, 'index.ts'), 'w') as f:
            f.write('\n'.join(index_lines))

refactor_tools('es')
refactor_tools('en')
