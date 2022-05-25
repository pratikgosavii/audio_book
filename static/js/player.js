// Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");

const audio = new Audio();

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = 0.75;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

let prevId;
//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    console.log(prevId);
    if (prevId) {
      document.querySelectorAll(`i[data-id='${prevId}']`).forEach((element) => {
        element.classList.add("fa-circle-play");
      });
    }
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");

      document.querySelector(".footer").classList.remove("d-none");
      document.querySelector(".footer").classList.add("d-block");

      document
        .querySelectorAll(`i[data-id='${playBtn.dataset.id}']`)
        .forEach((element) => {
          element.classList.add("fa-circle-pause");
        });
      document
        .querySelectorAll(`i[data-id='${playBtn.dataset.id}']`)
        .forEach((element) => {
          element.classList.remove("fa-circle-play");
        });

      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");

      document
        .querySelectorAll(`i[data-id='${playBtn.dataset.id}']`)
        .forEach((element) => {
          element.classList.remove("fa-circle-pause");
        });
      document
        .querySelectorAll(`i[data-id='${playBtn.dataset.id}']`)
        .forEach((element) => {
          element.classList.add("fa-circle-play");
        });

      audio.pause();
    }
    prevId = `${playBtn.dataset.id}`;
  },
  false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function playMusic(url, id) {
  if (audio.src !== window.location.origin + url) audio.src = url;

  document.querySelector(".btn-toggler").dataset.id = id;
  document.querySelector(".toggle-play").dataset.id = id;

  playBtn.click();
}
