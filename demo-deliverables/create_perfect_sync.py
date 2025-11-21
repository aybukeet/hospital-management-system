#!/usr/bin/env python3
"""
Create perfectly synced video by stretching audio to match video duration
"""

import subprocess
from imageio_ffmpeg import get_ffmpeg_exe
import os

def get_duration(file_path, is_audio=False):
    """Get media file duration"""
    ffmpeg_exe = get_ffmpeg_exe()
    
    cmd = [ffmpeg_exe, '-i', file_path, '-f', 'null', '-']
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    for line in result.stderr.split('\n'):
        if 'Duration:' in line:
            time_str = line.split('Duration:')[1].split(',')[0].strip()
            h, m, s = time_str.split(':')
            return int(h) * 3600 + int(m) * 60 + float(s)
    return None

def stretch_audio_to_video():
    """Stretch audio to match video duration exactly"""
    
    ffmpeg_exe = get_ffmpeg_exe()
    
    video_file = 'cypress_video.mp4'
    audio_file = 'synced_audio.wav'
    stretched_audio = 'stretched_audio.wav'
    
    print("Analyzing files...")
    video_duration = get_duration(video_file)
    audio_duration = get_duration(audio_file, is_audio=True)
    
    print(f"  Video duration: {video_duration:.2f}s")
    print(f"  Audio duration: {audio_duration:.2f}s")
    
    # Calculate speed factor
    speed_factor = audio_duration / video_duration
    
    print(f"  Speed adjustment: {speed_factor:.3f}x")
    print()
    
    # Stretch audio using atempo filter
    print("Stretching audio to match video...")
    cmd = [
        ffmpeg_exe,
        '-i', audio_file,
        '-filter:a', f'atempo={speed_factor}',
        '-y',
        stretched_audio
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✓ Stretched audio created: {stretched_audio}")
        return stretched_audio
    else:
        print(f"✗ Error stretching audio")
        print(result.stderr)
        return None

def create_final_synced_video(stretched_audio):
    """Create final video with stretched audio and subtitles"""
    
    ffmpeg_exe = get_ffmpeg_exe()
    
    video_file = 'cypress_video.mp4'
    subtitle_file = 'synced_subtitles.srt'
    output_file = 'hospital_demo_final.mp4'
    
    print("\nCreating final synced video...")
    
    cmd = [
        ffmpeg_exe,
        '-i', video_file,
        '-i', stretched_audio,
        '-vf', f"subtitles={subtitle_file}:force_style='FontName=Arial,FontSize=22,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,BorderStyle=3,Outline=2,Shadow=2,MarginV=30,Alignment=2'",
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-shortest',
        '-y',
        output_file
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"\n✓ Final video created!")
        print(f"  Output: {output_file}")
        print(f"  Size: {size_mb:.2f} MB")
        return True
    else:
        print(f"\n✗ Error: {result.stderr}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Creating Perfectly Synced Demo Video")
    print("=" * 60)
    print()
    
    stretched_audio = stretch_audio_to_video()
    
    if stretched_audio:
        success = create_final_synced_video(stretched_audio)
        
        print()
        print("=" * 60)
        if success:
            print("✓ Perfect sync achieved!")
            print("  hospital_demo_final.mp4")
            print("\nAudio is now stretched to match video duration exactly!")
            print("Subtitles are synced throughout the entire video!")
        print("=" * 60)
