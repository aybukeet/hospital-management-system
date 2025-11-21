#!/usr/bin/env python3
"""
Generate subtitles from demo script with proper timing
"""

def create_subtitles():
    """Create SRT subtitles from demo script"""
    
    # Read the demo script
    with open('demo_script.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]
    
    # Calculate timing (approximately 3 seconds per line)
    seconds_per_line = 3.0
    srt_content = []
    
    for i, line in enumerate(lines, 1):
        start_time = (i - 1) * seconds_per_line
        end_time = i * seconds_per_line
        
        # Format timestamps
        start = format_timestamp(start_time)
        end = format_timestamp(end_time)
        
        srt_content.append(f"{i}")
        srt_content.append(f"{start} --> {end}")
        srt_content.append(line)
        srt_content.append("")
    
    # Save SRT file
    with open('subtitles.srt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(srt_content))
    
    print(f"✓ Created subtitles.srt with {len(lines)} subtitle blocks")
    print(f"  Total duration: {len(lines) * seconds_per_line:.1f} seconds")

def format_timestamp(seconds):
    """Convert seconds to SRT timestamp format (HH:MM:SS,mmm)"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

if __name__ == "__main__":
    print("=" * 50)
    print("Creating Subtitles from Demo Script")
    print("=" * 50)
    create_subtitles()
    print("=" * 50)
    print("✓ Done! Use subtitles.srt with your video editor")
    print("=" * 50)
