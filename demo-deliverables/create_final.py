#!/usr/bin/env python3
"""
Merge video and audio using imageio-ffmpeg directly
"""

import subprocess
import os
from imageio_ffmpeg import get_ffmpeg_exe

def merge_video_audio_subtitles():
    """Merge video, audio, and burn subtitles using ffmpeg"""
    
    # Get ffmpeg executable from imageio-ffmpeg
    ffmpeg_exe = get_ffmpeg_exe()
    print(f"Using ffmpeg from: {ffmpeg_exe}")
    
    video_file = 'cypress_video.mp4'
    audio_file = 'audio_rst.wav'
    subtitle_file = 'subtitles.srt'
    output_file = 'final_demo_video.mp4'
    
    print("\nMerging video, audio, and subtitles...")
    print(f"  Video: {video_file}")
    print(f"  Audio: {audio_file}")
    print(f"  Subtitles: {subtitle_file}")
    print(f"  Output: {output_file}")
    print()
    
    # FFmpeg command to merge video, audio, and burn subtitles
    cmd = [
        ffmpeg_exe,
        '-i', video_file,           # Input video
        '-i', audio_file,           # Input audio
        '-vf', f"subtitles={subtitle_file}:force_style='FontSize=20,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,BorderStyle=3'",  # Burn subtitles
        '-c:v', 'libx264',          # Video codec
        '-c:a', 'aac',              # Audio codec
        '-shortest',                # Match shortest stream duration
        '-y',                       # Overwrite output file
        output_file
    ]
    
    print("Processing (this may take a minute)...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        print("\n✓ Video created successfully!")
        print(f"  Output: {output_file}")
        
        # Get file size
        size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"  Size: {size_mb:.2f} MB")
    else:
        print("\n✗ Error during video creation:")
        print(result.stderr)
        return False
    
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("Hospital Management System - Final Video Creator")
    print("=" * 60)
    print()
    
    success = merge_video_audio_subtitles()
    
    print()
    print("=" * 60)
    if success:
        print("✓ All done! Your final video is ready:")
        print("  final_demo_video.mp4")
        print("\nThe video includes:")
        print("  ✓ Original Cypress test recording")
        print("  ✓ TTS voiceover audio")
        print("  ✓ Burned-in subtitles")
    else:
        print("✗ Video creation failed. Check errors above.")
    print("=" * 60)
