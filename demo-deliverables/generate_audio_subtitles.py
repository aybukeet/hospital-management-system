#!/usr/bin/env python3
"""
Generate audio from demo script using TTS and create subtitles using Whisper
"""

import os
import sys

def generate_audio():
    """Generate audio using gTTS (Google Text-to-Speech)"""
    try:
        from gtts import gTTS
    except ImportError:
        print("Installing gTTS...")
        os.system(f"{sys.executable} -m pip install gtts")
        from gtts import gTTS
    
    # Read the demo script
    with open('demo_script.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    
    print("Generating audio with TTS...")
    # Create TTS object with English language
    tts = gTTS(text=text, lang='en', slow=False)
    
    # Save audio file
    tts.save('audio_rst.wav')
    print("✓ Audio saved as audio_rst.wav")
    
    return 'audio_rst.wav'

def generate_subtitles(audio_file):
    """Generate subtitles using Whisper"""
    try:
        import whisper
    except ImportError:
        print("Installing Whisper...")
        os.system(f"{sys.executable} -m pip install openai-whisper")
        import whisper
    
    print("Loading Whisper model (this may take a moment)...")
    model = whisper.load_model("base")
    
    print("Transcribing audio to generate subtitles...")
    result = model.transcribe(audio_file, task="transcribe", language="en")
    
    # Generate SRT format
    srt_content = []
    for i, segment in enumerate(result['segments'], 1):
        start = format_timestamp(segment['start'])
        end = format_timestamp(segment['end'])
        text = segment['text'].strip()
        
        srt_content.append(f"{i}")
        srt_content.append(f"{start} --> {end}")
        srt_content.append(text)
        srt_content.append("")
    
    # Save SRT file
    with open('subtitles.srt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(srt_content))
    
    print("✓ Subtitles saved as subtitles.srt")

def format_timestamp(seconds):
    """Convert seconds to SRT timestamp format (HH:MM:SS,mmm)"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

if __name__ == "__main__":
    print("=" * 50)
    print("Hospital Management System - Audio & Subtitles Generator")
    print("=" * 50)
    print()
    
    # Generate audio
    audio_file = generate_audio()
    print()
    
    # Generate subtitles
    generate_subtitles(audio_file)
    print()
    
    print("=" * 50)
    print("✓ All done!")
    print("Files created:")
    print("  - audio_rst.wav (TTS audio)")
    print("  - subtitles.srt (Whisper-generated subtitles)")
    print("=" * 50)
