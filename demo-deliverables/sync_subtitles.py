#!/usr/bin/env python3
"""
Get video duration and create properly timed narration
"""

import subprocess
from imageio_ffmpeg import get_ffmpeg_exe
import json

def get_video_duration(video_file):
    """Get video duration in seconds"""
    ffmpeg_exe = get_ffmpeg_exe()
    
    cmd = [
        ffmpeg_exe,
        '-i', video_file,
        '-f', 'null',
        '-'
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    # Parse duration from stderr
    for line in result.stderr.split('\n'):
        if 'Duration:' in line:
            time_str = line.split('Duration:')[1].split(',')[0].strip()
            h, m, s = time_str.split(':')
            duration = int(h) * 3600 + int(m) * 60 + float(s)
            return duration
    
    return None

def create_timed_subtitles(video_duration, num_actions):
    """Create subtitles evenly distributed across video duration"""
    
    actions = [
        "Viewing the dashboard",
        "Navigating to Departments",
        "Viewing existing departments",
        "Going to Doctors section",
        "Clicking Add Doctor",
        "Entering doctor name",
        "Selecting department",
        "Entering phone number",
        "Creating doctor record",
        "Doctor added successfully",
        "Navigating to Patients",
        "Clicking Add Patient",
        "Entering patient name",
        "Setting patient age",
        "Entering phone number",
        "Creating patient record",
        "Patient registered successfully",
        "Going to Appointments",
        "Clicking Book Appointment",
        "Selecting doctor",
        "Selecting patient",
        "Setting appointment date",
        "Entering visit reason",
        "Booking appointment",
        "Appointment created successfully",
        "Returning to Dashboard",
        "Viewing updated statistics",
        "Demo complete"
    ]
    
    # Calculate time per action
    time_per_action = video_duration / len(actions)
    
    srt_content = []
    for i, action in enumerate(actions, 1):
        start_time = (i - 1) * time_per_action
        end_time = i * time_per_action
        
        start = format_timestamp(start_time)
        end = format_timestamp(end_time)
        
        srt_content.append(f"{i}")
        srt_content.append(f"{start} --> {end}")
        srt_content.append(action)
        srt_content.append("")
    
    with open('synced_subtitles.srt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(srt_content))
    
    print(f"✓ Created synced_subtitles.srt")
    print(f"  Video duration: {video_duration:.2f} seconds")
    print(f"  Actions: {len(actions)}")
    print(f"  Time per action: {time_per_action:.2f} seconds")
    
    # Also create narration script
    with open('synced_narration.txt', 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(actions))
    
    print(f"✓ Created synced_narration.txt")

def format_timestamp(seconds):
    """Convert seconds to SRT timestamp format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

if __name__ == "__main__":
    print("=" * 60)
    print("Analyzing Video and Creating Synced Subtitles")
    print("=" * 60)
    print()
    
    video_file = 'cypress_video.mp4'
    
    print(f"Analyzing {video_file}...")
    duration = get_video_duration(video_file)
    
    if duration:
        print(f"Video duration: {duration:.2f} seconds ({duration/60:.2f} minutes)")
        print()
        create_timed_subtitles(duration, 28)
    else:
        print("Could not determine video duration")
    
    print()
    print("=" * 60)
    print("✓ Done!")
    print("=" * 60)
