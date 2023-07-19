import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(timeUpdate, 1500));

function timeUpdate(data) {
  console.log(Math.round(data.seconds));
  localStorage.setItem(KEY_CURRENT_TIME, data.seconds);
}

const currentTime = localStorage.getItem('KEY_CURRENT_TIME');

player.setCurrentTime(currentTime).catch(function (error) {
  switch (error.time) {
    case 'RangeError':
      time = 0;
      console.log('timeError');

      break;

    default:
      break;
  }
});
