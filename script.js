const player = document.getElementById('player');
const scene = document.getElementById('scene');
const statusText = document.getElementById('status');
let audioURL = null;

// A temporary local file lets us try the audio controls before making the soundscape.
document.getElementById('audioFile').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;
  player.pause();
  if (audioURL) URL.revokeObjectURL(audioURL);
  audioURL = URL.createObjectURL(file);
  player.src = audioURL;
  player.load();
  statusText.textContent = 'Sound selected. Press Play to try the moving water.';
});

// The animation responds to playback events, not the sound's volume or frequency.
player.addEventListener('playing', function () {
  scene.classList.add('playing');
  statusText.textContent = 'Playing — the water is moving.';
});

function stopMotion() {
  scene.classList.remove('playing');
  statusText.textContent = 'Playback stopped — the water is still.';
}
player.addEventListener('pause', stopMotion);
player.addEventListener('ended', stopMotion);
player.addEventListener('waiting', stopMotion);
player.addEventListener('error', function () {
  scene.classList.remove('playing');
  statusText.textContent = 'This audio could not be played. Try another audio file.';
});

// TODO: create and include the 60–90 second Oakville soundscape.
