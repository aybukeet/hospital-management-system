#!/usr/bin/env python3
"""
Simple video + audio merger using moviepy
"""

try:
    from moviepy import VideoFileClip, AudioFileClip
except ImportError:
    from moviepy.video.io.VideoFileClip import VideoFileClip
    from moviepy.audio.io.AudioFileClip import AudioFileClip

def merge_video_audio():
    """Merge video and audio"""
    
    print("Loading video...")
    video = VideoFileClip('cypress_video.mp4')
    
    print("Loading audio...")
    audio = AudioFileClip('audio_rst.wav')
    
    print("Adding audio to video...")
    final_video = video.with_audio(audio)
    
    print("Writing final video (this may take a few minutes)...")
    final_video.write_videofile(
        'final_demo_video.mp4',
        codec='libx264',
        audio_codec='aac'
    )
    
    print("\n✓ Video with audio created successfully!")
    print("  Output: final_demo_video.mp4")
    print("\nNote: Subtitles are in 'subtitles.srt'")
    print("You can add them in a video editor like CapCut or Premiere Pro")
    
    # Cleanup
    video.close()
    audio.close()

if __name__ == "__main__":
    print("=" * 60)
    print("Merging Video and Audio")
    print("=" * 60)
    print()
    
    merge_video_audio()
    
    print()
    print("=" * 60)
    print("✓ Done!")
    print("=" * 60)
