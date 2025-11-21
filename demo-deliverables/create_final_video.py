#!/usr/bin/env python3
"""
Merge video, audio, and subtitles into final demo video
"""

import subprocess
import os
import sys

def check_ffmpeg():
    """Check if ffmpeg is installed"""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def install_ffmpeg():
    """Install ffmpeg using pip"""
    print("Installing ffmpeg-python...")
    subprocess.run([sys.executable, '-m', 'pip', 'install', 'ffmpeg-python'], check=True)
    
    print("\nNote: You need ffmpeg binary installed on your system.")
    print("Download from: https://ffmpeg.org/download.html")
    print("Or install via: winget install ffmpeg")

def merge_video_audio_subtitles():
    """Merge video, audio and burn subtitles using ffmpeg"""
    
    video_file = 'cypress_video.mp4'
    audio_file = 'audio_rst.wav'
    subtitle_file = 'subtitles.srt'
    output_file = 'final_demo_video.mp4'
    
    print("Merging video, audio, and subtitles...")
    print(f"  Video: {video_file}")
    print(f"  Audio: {audio_file}")
    print(f"  Subtitles: {subtitle_file}")
    print(f"  Output: {output_file}")
    print()
    
    # FFmpeg command to merge video, audio, and burn subtitles
    cmd = [
        'ffmpeg',
        '-i', video_file,           # Input video
        '-i', audio_file,           # Input audio
        '-vf', f"subtitles={subtitle_file}",  # Burn subtitles into video
        '-c:v', 'libx264',          # Video codec
        '-c:a', 'aac',              # Audio codec
        '-shortest',                # Match shortest stream duration
        '-y',                       # Overwrite output file
        output_file
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print("✓ Video created successfully!")
        print(f"  Output: {output_file}")
        
        # Get file size
        size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"  Size: {size_mb:.2f} MB")
        
    except subprocess.CalledProcessError as e:
        print("Error during video creation:")
        print(e.stderr)
        raise

if __name__ == "__main__":
    print("=" * 60)
    print("Hospital Management System - Final Video Creator")
    print("=" * 60)
    print()
    
    if not check_ffmpeg():
        print("⚠ ffmpeg not found!")
        print()
        print("Please install ffmpeg:")
        print("  Option 1: winget install ffmpeg")
        print("  Option 2: Download from https://ffmpeg.org/download.html")
        print()
        sys.exit(1)
    
    merge_video_audio_subtitles()
    
    print()
    print("=" * 60)
    print("✓ All done! Your final video is ready:")
    print("  final_demo_video.mp4")
    print("=" * 60)
