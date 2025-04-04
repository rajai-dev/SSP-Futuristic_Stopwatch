// Tab handling
const tabs = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${target}-tab`) {
                content.classList.add('active');
            }
        });
    });
});

// Stopwatch functionality
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let laps = [];

// DOM Elements
const stopwatchDisplay = {
    hours: document.getElementById('stopwatch-hours'),
    minutes: document.getElementById('stopwatch-minutes'),
    seconds: document.getElementById('stopwatch-seconds')
};

const stopwatchControls = {
    startBtn: document.getElementById('stopwatch-start'),
    pauseBtn: document.getElementById('stopwatch-pause'),
    resetBtn: document.getElementById('stopwatch-reset'),
    lapBtn: document.getElementById('lap')
};

const lapsContainer = document.querySelector('.laps-list');

// Event Listeners
stopwatchControls.startBtn.addEventListener('click', startStopwatch);
stopwatchControls.pauseBtn.addEventListener('click', pauseStopwatch);
stopwatchControls.resetBtn.addEventListener('click', resetStopwatch);
stopwatchControls.lapBtn.addEventListener('click', recordLap);

// Stopwatch Functions
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        document.querySelector('.timer.stopwatch').classList.add('running');
        stopwatchInterval = setInterval(updateStopwatch, 1000);
    }
}

function pauseStopwatch() {
    stopwatchRunning = false;
    document.querySelector('.timer.stopwatch').classList.remove('running');
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
    laps = [];
    lapsContainer.innerHTML = '';
}

function updateStopwatch() {
    stopwatchTime++;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;

    stopwatchDisplay.hours.textContent = hours.toString().padStart(2, '0');
    stopwatchDisplay.minutes.textContent = minutes.toString().padStart(2, '0');
    stopwatchDisplay.seconds.textContent = seconds.toString().padStart(2, '0');
}

function recordLap() {
    if (stopwatchRunning) {
        const lapTime = stopwatchTime;
        const hours = Math.floor(lapTime / 3600);
        const minutes = Math.floor((lapTime % 3600) / 60);
        const seconds = lapTime % 60;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        laps.push(formattedTime);
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${laps.length}</span>
            <span class="lap-time">${formattedTime}</span>
        `;
        
        lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
    }
}

// Request notification permission
if (Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize timers
const stopwatch = new Stopwatch();
const countdown = new CountdownTimer(); 