#!/usr/bin/env python3
"""
Speed up audio to match video duration
"""

import subprocess
from imageio_ffmpeg import get_ffmpeg_exe
import os

def get_duration(file_path):
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

def speed_up_audio():
    """Speed up audio to match video duration"""
    
    ffmpeg_exe = get_ffmpeg_exe()
    
    video_file = 'cypress_video.mp4'
    audio_file = 'synced_audio.wav'
    fast_audio = 'fast_audio.wav'
    
    print("Analyzing durations...")
    video_duration = get_duration(video_file)
    audio_duration = get_duration(audio_file)
    
    print(f"  Video: {video_duration:.2f}s")
    print(f"  Audio: {audio_duration:.2f}s")
    
    # Calculate speed factor (how much faster audio needs to be)
    speed_factor = audio_duration / video_duration
    
    print(f"\nSpeeding up audio by {speed_factor:.2f}x")
    print()
    
    # Speed up audio using atempo filter
    # atempo can only go 0.5-2.0, so we may need to chain
    if speed_factor <= 2.0:
        atempo_filter = f'atempo={speed_factor}'
    else:
        # Chain multiple atempo filters
        atempo_filter = f'atempo=2.0,atempo={speed_factor/2.0}'
    
    cmd = [
        ffmpeg_exe,
        '-i', audio_file,
        '-filter:a', atempo_filter,
        '-y',
        fast_audio
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        new_duration = get_duration(fast_audio)
        print(f"✓ Fast audio created: {fast_audio}")
        print(f"  New duration: {new_duration:.2f}s")
        return fast_audio
    else:
        print(f"✗ Error: {result.stderr}")
        return None

def create_final_video(fast_audio):
    """Create final video with sped-up audio and subtitles"""
    
    ffmpeg_exe = get_ffmpeg_exe()
    
    video_file = 'cypress_video.mp4'
    subtitle_file = 'synced_subtitles.srt'
    output_file = 'hospital_demo_final.mp4'
    
    print("\nCreating final video...")
    
    cmd = [
        ffmpeg_exe,
        '-i', video_file,
        '-i', fast_audio,
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
    print("Creating Video with Sped-Up Audio")
    print("=" * 60)
    print()
    
    fast_audio = speed_up_audio()
    
    if fast_audio:
        success = create_final_video(fast_audio)
        
        print()
        print("=" * 60)
        if success:
            print("✓ Done!")
            print("  hospital_demo_final.mp4")
            print("\nAudio is now sped up to match video!")
        print("=" * 60)
