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
    minDist: { default: 1 },
    shouldReset: { default: false },
    // track: { default: "" },
    // position: { default: 0 },
    // sequential: { default: false }
  },

  init() {
    //console.log('init')
    this.time = 0;
    // if (window.APP['prox-aud'][this.data.track]) return;
    // window.APP['prox-aud'][this.data.track] = 0;
    // this.hasEntered = false;
  },

  tick(t, dt) {
    //console.log(this.el.components['media-video'].data.time)
    this.time += dt;
    //console.log('ticking')
    if (!this.el.components['media-video']) return;
    if (!this.el.components['media-video'].video) return;
    const paused = this.el.getAttribute("media-video").videoPaused;
    var dist = comparePosition(this.el.object3D.position);
    //need to check if the state has changed since last time
    //console.log(dist);
    if (dist > this.data.pauseDist && !paused) {
      console.log('outside play dist and pausing');
      //console.log(this.el.components['media-video'].data.time);
      this.el.components['media-video'].video.pause();
      //console.log(this.el.components['media-video'].data.time);
      // if (this.data.sequential && window.APP['prox-aud'][this.data.track] !== this.data.position - 1 && this.hasEntered) {
      //   //if position, move forward
      //   window.APP['prox-aud'][this.data.track]++;
      //   console.log('stepping forward in sequence ', window.APP['prox-aud'][this.data.track]);
      // }
    } else if (dist < this.data.playDist && dist > this.data.minDist && paused) {
      console.log('inside play dist and playing');
      // if (this.data.sequential && window.APP['prox-aud'][this.data.track] !== this.data.position - 1) {
      //   console.log('cannot play, out of sequence')
      //   return;
      // }
      // this.hasEntered = true;
      if (this.data.shouldReset) {
        console.log('resetting');
        //this.el.components['media-video'].data.time = 0;
        let time = Math.ceil(this.el.getAttribute("media-video").time);
        for (let i = 0; i < time / 10; i++) {
          this.el.components['media-video'].seekBack();
        }
        this.el.setAttribute("media-video", "time", 0);
        console.log(this.el.components['media-video']);
      }
      this.el.components['media-video'].video.play();
      //console.log(this.el.components['media-video'].data.time);
    } else if (dist < this.data.minDist && !paused) {
      console.log('too close and pausing');
      this.el.components['media-video'].video.pause();
    }
  }
});
