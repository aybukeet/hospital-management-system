#!/usr/bin/env python3
"""
Generate TTS audio and subtitles based on action narration
"""

from gtts import gTTS

def create_narration_audio():
    """Create TTS audio from narration script"""
    
    with open('narration_script.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    
    print("Generating narration audio with TTS...")
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save('narration_audio.wav')
    print("✓ Audio saved as narration_audio.wav")

def create_narration_subtitles():
    """Create subtitles with 2-second intervals per action"""
    
    with open('narration_script.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]
    
    # 2 seconds per action for better pacing
    seconds_per_line = 2.0
    srt_content = []
    
    for i, line in enumerate(lines, 1):
        start_time = (i - 1) * seconds_per_line
        end_time = i * seconds_per_line
        
        start = format_timestamp(start_time)
        end = format_timestamp(end_time)
        
        srt_content.append(f"{i}")
        srt_content.append(f"{start} --> {end}")
        srt_content.append(line)
        srt_content.append("")
    
    with open('narration_subtitles.srt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(srt_content))
    
    print(f"✓ Created narration_subtitles.srt with {len(lines)} entries")
    print(f"  Total duration: {len(lines) * seconds_per_line:.1f} seconds")

def format_timestamp(seconds):
    """Convert seconds to SRT timestamp format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

if __name__ == "__main__":
    print("=" * 60)
    print("Creating Action-Based Narration")
    print("=" * 60)
    print()
    
    create_narration_audio()
    print()
    create_narration_subtitles()
    
    print()
    print("=" * 60)
    print("✓ Done!")
    print("Files created:")
    print("  - narration_audio.wav")
    print("  - narration_subtitles.srt")
    print("=" * 60)
