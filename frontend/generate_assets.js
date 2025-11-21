const fs = require('fs');
const path = require('path');

// Read log files
const mouseLogPath = path.join(__dirname, 'mouse_log.json');
const clickLogPath = path.join(__dirname, 'click_log.json');

let mouseLogs = [];
let clickLogs = [];

if (fs.existsSync(mouseLogPath)) {
    mouseLogs = JSON.parse(fs.readFileSync(mouseLogPath, 'utf8'));
}

if (fs.existsSync(clickLogPath)) {
    clickLogs = JSON.parse(fs.readFileSync(clickLogPath, 'utf8'));
}

// Combine and sort by timestamp
const allEvents = [
    ...mouseLogs.map(e => ({ ...e, type: 'mouse' })),
    ...clickLogs.map(e => ({ ...e, type: 'click' }))
].sort((a, b) => a.timestamp - b.timestamp);

// Generate natural language script
const scriptLines = [];
scriptLines.push('Welcome to the Hospital Management System demonstration.');
scriptLines.push('');

let lastClickTime = 0;
clickLogs.forEach((click, index) => {
    const timeDiff = index > 0 ? (click.timestamp - clickLogs[index - 1].timestamp) / 1000 : 0;

    if (timeDiff > 2) {
        scriptLines.push('');
    }

    // Infer action based on target and position
    if (click.target === 'BUTTON') {
        scriptLines.push('Clicking a button to proceed.');
    } else if (click.target === 'A') {
        scriptLines.push('Navigating to a new page.');
    } else if (click.target === 'INPUT' || click.target === 'TEXTAREA') {
        scriptLines.push('Entering information into the form.');
    } else {
        scriptLines.push('Interacting with the interface.');
    }
});

scriptLines.push('');
scriptLines.push('The demonstration is now complete.');
scriptLines.push('Thank you for watching.');

// Write demo script
const demoScriptPath = path.join(__dirname, 'demo_script.txt');
fs.writeFileSync(demoScriptPath, scriptLines.join('\n'));

console.log('✓ Generated demo_script.txt');

// Generate SRT subtitles
const srtLines = [];
let subtitleIndex = 1;
const startTime = clickLogs[0]?.timestamp || Date.now();

scriptLines.forEach((line, index) => {
    if (line.trim() === '') return;

    const timeOffset = index * 3; // 3 seconds per subtitle
    const startSec = timeOffset;
    const endSec = timeOffset + 3;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
    };

    srtLines.push(subtitleIndex);
    srtLines.push(`${formatTime(startSec)} --> ${formatTime(endSec)}`);
    srtLines.push(line);
    srtLines.push('');

    subtitleIndex++;
});

const srtPath = path.join(__dirname, 'demo_subtitles.srt');
fs.writeFileSync(srtPath, srtLines.join('\n'));

console.log('✓ Generated demo_subtitles.srt');
console.log('');
console.log('Summary:');
console.log(`- Mouse movements logged: ${mouseLogs.length}`);
console.log(`- Clicks logged: ${clickLogs.length}`);
console.log(`- Script lines: ${scriptLines.filter(l => l.trim()).length}`);
console.log(`- Subtitle blocks: ${subtitleIndex - 1}`);
