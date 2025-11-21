#!/usr/bin/env python3
"""
Merge video and audio using moviepy
"""

from moviepy.editor import VideoFileClip, AudioFileClip, TextClip, CompositeVideoClip
import re

def parse_srt(srt_file):
    """Parse SRT file and return list of subtitle entries"""
    with open(srt_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by double newline
    blocks = content.strip().split('\n\n')
    subtitles = []
    
    for block in blocks:
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            # Parse timestamp
            timestamp_line = lines[1]
            match = re.match(r'(\d+):(\d+):(\d+),(\d+) --> (\d+):(\d+):(\d+),(\d+)', timestamp_line)
            if match:
                start_h, start_m, start_s, start_ms, end_h, end_m, end_s, end_ms = map(int, match.groups())
                start_time = start_h * 3600 + start_m * 60 + start_s + start_ms / 1000
                end_time = end_h * 3600 + end_m * 60 + end_s + end_ms / 1000
                
                # Get text (all lines after timestamp)
                text = '\n'.join(lines[2:])
                
                subtitles.append({
                    'start': start_time,
                    'end': end_time,
                    'text': text
                })
    
    return subtitles

def create_final_video():
    """Create final video with audio and subtitles"""
    
    print("Loading video...")
    video = VideoFileClip('cypress_video.mp4')
    
    print("Loading audio...")
    audio = AudioFileClip('audio_rst.wav')
    
    print("Parsing subtitles...")
    subtitles = parse_srt('subtitles.srt')
    
    print(f"Found {len(subtitles)} subtitle entries")
    
    # Set audio to video
    print("Adding audio to video...")
    video_with_audio = video.set_audio(audio)
    
    # Create subtitle clips
    print("Creating subtitle clips...")
    subtitle_clips = []
    for sub in subtitles:
        txt_clip = TextClip(
            sub['text'],
            fontsize=24,
            color='white',
            bg_color='black',
            size=(video.w - 40, None),
            method='caption'
        ).set_position(('center', 'bottom')).set_start(sub['start']).set_duration(sub['end'] - sub['start'])
        
        subtitle_clips.append(txt_clip)
    
    # Composite video with subtitles
    print("Compositing video with subtitles...")
    final_video = CompositeVideoClip([video_with_audio] + subtitle_clips)
    
    # Write output
    print("Writing final video...")
    final_video.write_videofile(
        'final_demo_video.mp4',
        codec='libx264',
        audio_codec='aac',
        fps=video.fps
    )
    
    print("\n✓ Final video created successfully!")
    print("  Output: final_demo_video.mp4")
    
    # Cleanup
    video.close()
    audio.close()

if __name__ == "__main__":
    print("=" * 60)
    print("Creating Final Demo Video")
    print("=" * 60)
    print()
    
    create_final_video()
    
    print()
    print("=" * 60)
    print("✓ Done!")
    print("=" * 60)
