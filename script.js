
// Get references to audio elements
const audios = {
    main: {
        study: document.getElementById('audio-study'),
        focus: document.getElementById('audio-focus'),
        relax: document.getElementById('audio-relax')
    },
    ambient: {
        nature: document.getElementById('audio-nature'),
        waterflow: document.getElementById('audio-waterflow'),
        rain: document.getElementById('audio-rain')
    }
};

// Enable looping for all audio tracks
document.getElementById('audio-study').loop = true;
document.getElementById('audio-focus').loop = true;
document.getElementById('audio-relax').loop = true;
document.getElementById('audio-nature').loop = true;
document.getElementById('audio-waterflow').loop = true;
document.getElementById('audio-rain').loop = true;

// Get reference to video element
const relaxingVideo = document.querySelector('.video-section video');

// Track last played
let lastMain = null;
let lastAmbient = null;



// Add event listeners to main playlist buttons
document.querySelectorAll('.main-playlist .playlist-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        clearPlayingClass('.main-playlist');
        button.classList.add('playing');
    });
});

// Add event listeners to ambient playlist buttons
document.querySelectorAll('.ambient-playlist .playlist-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        clearPlayingClass('.ambient-playlist');
        button.classList.add('playing');
    });
});




// Main playlist button click
document.querySelector('.main-playlist .playlist-buttons').addEventListener('click', (e) => {
    const id = e.target.textContent.toLowerCase();
    if (audios.main[id]) {
        Object.values(audios.main).forEach(audio => audio.pause());
        audios.main[id].play();
        lastMain = id;
        updateVideoPlayback();
    }
});

// Ambient playlist button click
document.querySelector('.ambient-playlist .playlist-buttons').addEventListener('click', (e) => {
    const id = e.target.textContent.toLowerCase().replace(' ', '');
    if (audios.ambient[id]) {
        Object.values(audios.ambient).forEach(audio => audio.pause());
        audios.ambient[id].play();
        lastAmbient = id;
        updateVideoPlayback();
    }
});




// Volume control for main playlist
document.getElementById('main-volume').addEventListener('input', () => {
    if (lastMain && audios.main[lastMain]) {
        audios.main[lastMain].volume = parseFloat(document.getElementById('main-volume').value);
    }
});

// Volume control for ambient playlist
document.getElementById('ambient-volume').addEventListener('input', () => {
    if (lastAmbient && audios.ambient[lastAmbient]) {
        audios.ambient[lastAmbient].volume = parseFloat(document.getElementById('ambient-volume').value);
    }
});




// Global Play
document.getElementById('global-play').addEventListener('click', () => {
    if (lastMain) audios.main[lastMain].play();
    if (lastAmbient) audios.ambient[lastAmbient].play();
    updateVideoPlayback();
});

// Global Pause
document.getElementById('global-pause').addEventListener('click', () => {
    if (lastMain) audios.main[lastMain].pause();
    if (lastAmbient) audios.ambient[lastAmbient].pause();
    updateVideoPlayback();
});

// Main controls
document.getElementById('main-play').addEventListener('click', () => {
    if (lastMain) audios.main[lastMain].play();
    updateVideoPlayback();
});
document.getElementById('main-pause').addEventListener('click', () => {
    if (lastMain) audios.main[lastMain].pause();
    updateVideoPlayback();
});

// Ambient controls
document.getElementById('ambient-play').addEventListener('click', () => {
    if (lastAmbient) audios.ambient[lastAmbient].play();
    updateVideoPlayback();
});
document.getElementById('ambient-pause').addEventListener('click', () => {
    if (lastAmbient) audios.ambient[lastAmbient].pause();
    updateVideoPlayback();
});




// Utility to clear 'playing' class from all buttons in a section
function clearPlayingClass(sectionSelector) {
    document.querySelectorAll(sectionSelector + ' .playlist-buttons button').forEach(btn => {
        btn.classList.remove('playing');
    });
}

// Function to update video playback based on audio state
function updateVideoPlayback() {
    const isMainPlaying = lastMain && !audios.main[lastMain].paused;
    const isAmbientPlaying = lastAmbient && !audios.ambient[lastAmbient].paused;

    if (isMainPlaying || isAmbientPlaying) {
        relaxingVideo.play();
    } else {
        relaxingVideo.pause();
    }
}

