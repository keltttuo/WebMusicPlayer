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

const mainPlayButton = document.getElementById('main-play');
const ambientPlayButton = document.getElementById('ambient-play');
togglePlayState(mainPlayButton, false);
togglePlayState(ambientPlayButton, false);

// Enable looping for all audio tracks
Object.values(audios.main).concat(Object.values(audios.ambient))
    .forEach(audio => audio.loop = true);

// Get reference to video element
const relaxingVideo = document.querySelector('.video-section video');
relaxingVideo.pause();

// Default to first track in each playlist so Play All works from the start
let lastMain = Object.keys(audios.main)[0];
let lastAmbient = Object.keys(audios.ambient)[0];

// Highlight the default selected buttons
document.querySelector('.main-playlist .playlist-buttons button').classList.add('playing');
document.querySelector('.ambient-playlist .playlist-buttons button').classList.add('playing');


// Add event listeners to main playlist buttons (highlight selected)
document.querySelectorAll('.main-playlist .playlist-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        clearPlayingClass('.main-playlist');
        button.classList.add('playing');
    });
});

// Add event listeners to ambient playlist buttons (highlight selected)
document.querySelectorAll('.ambient-playlist .playlist-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        clearPlayingClass('.ambient-playlist');
        button.classList.add('playing');
    });
});


// Main playlist button click
document.querySelector('.main-playlist .playlist-buttons').addEventListener('click', (e) => {
    const id = e.target.textContent.toLowerCase().replaceAll(' ', '');
    if (audios.main[id]) {
        Object.values(audios.main).forEach(audio => audio.pause());
        audios.main[id].play();
        lastMain = id;
        updateVideoPlayback();
        togglePlayState(mainPlayButton, true);
    }
});

// Ambient playlist button click
document.querySelector('.ambient-playlist .playlist-buttons').addEventListener('click', (e) => {
    const id = e.target.textContent.toLowerCase().replaceAll(' ', '');
    if (audios.ambient[id]) {
        Object.values(audios.ambient).forEach(audio => audio.pause());
        audios.ambient[id].play();
        lastAmbient = id;
        updateVideoPlayback();
        togglePlayState(ambientPlayButton, true);
    }
});


// Volume control for main playlist
document.getElementById('main-volume').addEventListener('input', (e) => {
    if (lastMain && audios.main[lastMain]) {
        audios.main[lastMain].volume = parseFloat(e.target.value);
    }
});

// Volume control for ambient playlist
document.getElementById('ambient-volume').addEventListener('input', (e) => {
    if (lastAmbient && audios.ambient[lastAmbient]) {
        audios.ambient[lastAmbient].volume = parseFloat(e.target.value);
    }
});


// Global Play
document.getElementById('global-play').addEventListener('click', () => {
    if (lastMain) {
        audios.main[lastMain].play();
        togglePlayState(mainPlayButton, true);
    }
    if (lastAmbient) {
        audios.ambient[lastAmbient].play();
        togglePlayState(ambientPlayButton, true);
    }
    updateVideoPlayback();
});

// Global Pause
document.getElementById('global-pause').addEventListener('click', () => {
    if (lastMain) {
        audios.main[lastMain].pause();
        togglePlayState(mainPlayButton, false);
    }
    if (lastAmbient) {
        audios.ambient[lastAmbient].pause();
        togglePlayState(ambientPlayButton, false);
    }
    updateVideoPlayback();
});

// Main controls
document.getElementById('main-play').addEventListener('click', () => {
    if (lastMain) {
        audios.main[lastMain].play();
        updateVideoPlayback();
        togglePlayState(mainPlayButton, true);
    }
});

document.getElementById('main-pause').addEventListener('click', () => {
    if (lastMain) {
        audios.main[lastMain].pause();
        updateVideoPlayback();
        togglePlayState(mainPlayButton, false);
    }
});

// Ambient controls
document.getElementById('ambient-play').addEventListener('click', () => {
    if (lastAmbient) {
        audios.ambient[lastAmbient].play();
        updateVideoPlayback();
        togglePlayState(ambientPlayButton, true);
    }
});

document.getElementById('ambient-pause').addEventListener('click', () => {
    if (lastAmbient) {
        audios.ambient[lastAmbient].pause();
        updateVideoPlayback();
        togglePlayState(ambientPlayButton, false);
    }
});


// Utility to clear 'playing' class from all buttons in a section
function clearPlayingClass(sectionSelector) {
    document.querySelectorAll(sectionSelector + ' .playlist-buttons button').forEach(btn => {
        btn.classList.remove('playing');
    });
}

// Update video playback based on whether any audio is playing
function updateVideoPlayback() {
    const isMainPlaying = lastMain && !audios.main[lastMain].paused;
    const isAmbientPlaying = lastAmbient && !audios.ambient[lastAmbient].paused;

    if (isMainPlaying || isAmbientPlaying) {
        relaxingVideo.play();
    } else {
        relaxingVideo.pause();
    }
}

function togglePlayState(button, isPlaying) {
    button.classList.toggle('playing', isPlaying);
}
