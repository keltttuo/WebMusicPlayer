// ── Audio elements ────────────────────────────────────────────
const audios = {
    main: {
        study:  document.getElementById('audio-study'),
        focus:  document.getElementById('audio-focus'),
        relax:  document.getElementById('audio-relax')
    },
    ambient: {
        nature:    document.getElementById('audio-nature'),
        waterflow: document.getElementById('audio-waterflow'),
        rain:      document.getElementById('audio-rain')
    }
};

// ── Button references ─────────────────────────────────────────
const mainPlayButton    = document.getElementById('main-play');
const ambientPlayButton = document.getElementById('ambient-play');

// ── Enable looping for all tracks ────────────────────────────
Object.values(audios.main).concat(Object.values(audios.ambient))
    .forEach(audio => audio.loop = true);

// ── Audio error handling ──────────────────────────────────────
function showAudioError(message) {
    const existing = document.getElementById('audio-error');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.id = 'audio-error';
    banner.textContent = message;
    banner.style.cssText = [
        'position:fixed', 'bottom:1.5rem', 'left:50%',
        'transform:translateX(-50%)',
        'background:#e53935', 'color:#fff',
        'padding:0.6rem 1.25rem', 'border-radius:8px',
        'font-size:0.85rem', 'z-index:999',
        'box-shadow:0 4px 12px rgba(0,0,0,0.3)'
    ].join(';');

    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 4000);
}

Object.entries(audios.main).concat(Object.entries(audios.ambient))
    .forEach(([name, audio]) => {
        audio.addEventListener('error', () => {
            showAudioError(`Could not load track "${name}". Check that the audio file exists.`);
        });
    });

// ── Video setup ───────────────────────────────────────────────
const relaxingVideo = document.getElementById('bg-video');
relaxingVideo.pause();

const videoToggleBtn = document.getElementById('video-toggle');
let videoManuallyPaused = false;

videoToggleBtn.addEventListener('click', () => {
    if (relaxingVideo.paused) {
        relaxingVideo.play();
        videoManuallyPaused = false;
        videoToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        relaxingVideo.pause();
        videoManuallyPaused = true;
        videoToggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// ── Default to first track in each playlist ───────────────────
let lastMain    = Object.keys(audios.main)[0];
let lastAmbient = Object.keys(audios.ambient)[0];

// Highlight default track cards
document.querySelector('.main-playlist .track-card').classList.add('playing');
document.querySelector('.ambient-playlist .track-card').classList.add('playing');

// Init play button states (nothing is playing yet)
togglePlayState(mainPlayButton, false);
togglePlayState(ambientPlayButton, false);


// ── Track card clicks ─────────────────────────────────────────
document.querySelectorAll('.main-playlist .track-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.track;
        if (!audios.main[id]) return;

        Object.values(audios.main).forEach(a => a.pause());
        audios.main[id].play();
        lastMain = id;

        document.querySelectorAll('.main-playlist .track-card')
            .forEach(c => c.classList.remove('playing'));
        card.classList.add('playing');

        togglePlayState(mainPlayButton, true);
        updateVideoPlayback();
    });
});

document.querySelectorAll('.ambient-playlist .track-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.track;
        if (!audios.ambient[id]) return;

        Object.values(audios.ambient).forEach(a => a.pause());
        audios.ambient[id].play();
        lastAmbient = id;

        document.querySelectorAll('.ambient-playlist .track-card')
            .forEach(c => c.classList.remove('playing'));
        card.classList.add('playing');

        togglePlayState(ambientPlayButton, true);
        updateVideoPlayback();
    });
});


// ── Volume controls ───────────────────────────────────────────
document.getElementById('main-volume').addEventListener('input', (e) => {
    if (lastMain && audios.main[lastMain]) {
        audios.main[lastMain].volume = parseFloat(e.target.value);
    }
});

document.getElementById('ambient-volume').addEventListener('input', (e) => {
    if (lastAmbient && audios.ambient[lastAmbient]) {
        audios.ambient[lastAmbient].volume = parseFloat(e.target.value);
    }
});


// ── Global Play / Pause ───────────────────────────────────────
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


// ── Section Play / Pause ──────────────────────────────────────
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


// ── Utilities ─────────────────────────────────────────────────
function updateVideoPlayback() {
    if (videoManuallyPaused) return;

    const isMainPlaying    = lastMain    && !audios.main[lastMain].paused;
    const isAmbientPlaying = lastAmbient && !audios.ambient[lastAmbient].paused;

    if (isMainPlaying || isAmbientPlaying) {
        relaxingVideo.play();
        videoToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        relaxingVideo.pause();
        videoToggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function togglePlayState(button, isPlaying) {
    button.classList.toggle('playing', isPlaying);
}
