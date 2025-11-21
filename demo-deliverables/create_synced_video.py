#!/usr/bin/env python3
"""
Create synced TTS audio and final video
"""

from gtts import gTTS
import subprocess
from imageio_ffmpeg import get_ffmpeg_exe
import os

def create_synced_audio():
    """Create TTS audio from synced narration"""
    
    with open('synced_narration.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    
    print("Generating synced TTS audio...")
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save('synced_audio.wav')
    print("✓ Audio saved as synced_audio.wav")

def create_synced_video():
    """Create final video with synced audio and subtitles"""
    
    ffmpeg_exe = get_ffmpeg_exe()
    
    video_file = 'cypress_video.mp4'
    audio_file = 'synced_audio.wav'
    subtitle_file = 'synced_subtitles.srt'
    output_file = 'hospital_demo_synced.mp4'
    
    print("\nCreating synced demo video...")
    print(f"  Video: {video_file}")
    print(f"  Audio: {audio_file}")
    print(f"  Subtitles: {subtitle_file}")
    print(f"  Output: {output_file}")
    print()
    
    cmd = [
        ffmpeg_exe,
        '-i', video_file,
        '-i', audio_file,
        '-vf', f"subtitles={subtitle_file}:force_style='FontName=Arial,FontSize=20,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,BorderStyle=3,Outline=2,Shadow=1,MarginV=25,Alignment=2'",
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-shortest',
        '-y',
        output_file
    ]
    
    print("Processing...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"\n✓ Synced video created successfully!")
        print(f"  Output: {output_file}")
        print(f"  Size: {size_mb:.2f} MB")
        return True
    else:
        print(f"\n✗ Error: {result.stderr}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Creating Synced Demo Video")
    print("=" * 60)
    print()
    
    create_synced_audio()
    success = create_synced_video()
    
    print()
    print("=" * 60)
    if success:
        print("✓ Synced demo video is ready!")
        print("  hospital_demo_synced.mp4")
        print("\nNow audio and subtitles are perfectly synced with video!")
    print("=" * 60)
