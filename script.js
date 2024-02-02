
const Pause = './Images/pause.png'
const Play = './Images/Play_fill.svg'

var songImage = document.getElementById("SongImage");
var songName = document.getElementById("SongName");
var songArtist = document.getElementById("SongArtist");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var seekBar = document.getElementById("seekBar");
const audio = document.getElementById('audio');
var playPauseBtn = document.getElementById("playPauseBtn");

const songs = [
    { title: 'Forest Lullaby', artist: 'Lesfm', src: './Audios/forest-lullaby-110624.mp3',image:'./Images/cover-2.png' },
    { title: 'Lost in City Lights', artist: 'Cosmo Sheldrake', src: './Audios/lost-in-city-lights-145038.mp3',image:'./Images/cover-1.png' },
];
var isPlaying = false;

let currentSongIndex = 0;
updateSongInfo();

function PlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = `<img src="${Play}" alt="play">`
    } else {
        audio.play();
        playPauseBtn.innerHTML = `<img src="${Pause}" alt="pause">`
    }
    isPlaying = !isPlaying;
}
function updateSongInfo() {
    const currentSong = songs[currentSongIndex];
    audio.src = currentSong.src;
    songImage.src = currentSong.image;
    songName.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
    totalTime.textContent = '00:00';  
}
function prevPlay() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
}
function nextPlay() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
}
playPauseBtn.addEventListener('click', PlayPause);
document.getElementById('prevPlay').addEventListener('click', prevPlay);
document.getElementById('nextPlay').addEventListener('click', nextPlay);

audio.addEventListener('loadedmetadata', function(){
    totalTime.textContent = formatTime(audio.duration);
    seekBar.max = audio.duration
})
audio.addEventListener('timeupdate',function(){
    currentTime.textContent = formatTime(audio.currentTime);
    seekBar.value = audio.currentTime
})
seekBar.addEventListener('input', function() {
    audio.currentTime = seekBar.value;
    currentTime.textContent = formatTime(audio.currentTime);
});
function formatTime(seconds){
    let minutes = Math.floor(seconds/60);
    let remainingSeconds = Math.floor(seconds%60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}