#!/usr/bin/env python3
"""
Create final demo video with action-based narration
"""

import subprocess
import os
from imageio_ffmpeg import get_ffmpeg_exe

def create_demo_video():
    """Merge Cypress video with narration audio and subtitles"""
    
    ffmpeg_exe = get_ffmpeg_exe()
    
    video_file = 'cypress_video.mp4'
    audio_file = 'narration_audio.wav'
    subtitle_file = 'narration_subtitles.srt'
    output_file = 'hospital_demo.mp4'
    
    print("Creating demo video...")
    print(f"  Video: {video_file}")
    print(f"  Narration: {audio_file}")
    print(f"  Subtitles: {subtitle_file}")
    print(f"  Output: {output_file}")
    print()
    
    # FFmpeg command
    cmd = [
        ffmpeg_exe,
        '-i', video_file,
        '-i', audio_file,
        '-vf', f"subtitles={subtitle_file}:force_style='FontName=Arial,FontSize=18,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,BorderStyle=3,Outline=2,Shadow=1,MarginV=20'",
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
        print(f"\n✓ Demo video created successfully!")
        print(f"  Output: {output_file}")
        print(f"  Size: {size_mb:.2f} MB")
        return True
    else:
        print(f"\n✗ Error: {result.stderr}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Hospital Management System - Demo Video Creator")
    print("=" * 60)
    print()
    
    success = create_demo_video()
    
    print()
    print("=" * 60)
    if success:
        print("✓ Your demo video is ready!")
        print("  hospital_demo.mp4")
        print("\nIncludes:")
        print("  ✓ Cypress test recording")
        print("  ✓ Action-based narration")
        print("  ✓ Synchronized subtitles")
    print("=" * 60)
