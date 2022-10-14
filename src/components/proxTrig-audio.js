import { THREE } from "aframe";

const getPlayerPosV = function() {
  let playerPosV;
  var playerPos = document.querySelector("#avatar-rig").object3D.position;
  playerPosV = new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z);
  return playerPosV;
};

const comparePosition = function(elementPos) {
  var playerPosV = getPlayerPosV();
  if (!playerPosV) return;
  var elementV = new THREE.Vector3(elementPos.x, elementPos.y, elementPos.z);
  if (!elementV) return;
  return elementV.distanceTo(playerPosV);
};

AFRAME.registerComponent("proxtrig-audio", {
  schema: {
    playDist: { default: 3 },
    pauseDist: { default: 4 },
    shouldReset: { default: false }
  },

  init() {
    //console.log('init')
    this.time = 0;
  },

  tick(t, dt) {
    this.time += dt;
    //console.log('ticking')
    if (!this.el.getAttribute("media-video")) {
      return;
    }
    const paused = this.el.getAttribute("media-video").videoPaused;
    var dist = comparePosition(this.el.object3D.position);
    //need to check if the state has changed since last time
    //console.log(dist);
    if (dist > this.data.pauseDist && !paused) {
      console.log('outside play dist and pausing');
      console.log(this.el.components['media-video'].data.time)
      this.el.components['media-video'].video.pause();
      console.log(this.el.components['media-video'].data.time)
    } else if (dist < this.data.playDist && paused) {
      console.log('inside play dist and playing');
      if (this.data.shouldReset) {
        console.log('resetting');
        this.el.components['media-video'].data.time = 0;
      }
      this.el.components['media-video'].video.play();
      console.log(this.el.components['media-video'].data.time)
    }
  }
});
