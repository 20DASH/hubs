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
  
AFRAME.registerComponent("proxtrig-anim", {
    schema: {
        playDist: { default: 3 },
        pauseDist: { default: 3.5 },
        minDist: { default: 1 },
        // shouldReset: { default: true },
        shouldLoop: { default: true },
        onClips: { default: "" },
        offClips: { default : "" },
        animations: { default: [] }
    },

    multiple: true,

    async init() {
        this.time = 0;
        this.hasEntered = false;
        //Pause on Start
        //Parse clips into arrays
        this.data.onClips = await this.parseClips(this.data.onClips);
        this.data.offClips = await this.parseClips(this.data.offClips);

        let interval = setInterval(() => {
        if (this.el.components["loop-animation"]) {
            let animations = this.el.components["loop-animation"].mixerEl.components["animation-mixer"].animations;
            this.data.animations = animations.filter(x => this.data.onClips.includes(x.name) || this.data.offClips.includes(x.name));
            this.el.setAttribute("loop-animation", { paused: true });
            console.log(this.data.animations)
            clearInterval(interval);
        }
        }, 100);
    },

    parseClips(clips) {
        console.log(clips);
        if (typeof clips === "string" && clips.includes(",") && clips.includes(" ")) {
            let parsed = clips.split(', ');
            return parsed;
        } else if (typeof clips === "string" && clips.includes(",")) {
            let parsed = clips.split(',');
            return parsed;
        } else {
            let empty = [];
            empty.push(clips);
            return empty;
        }
    },

    tick(t, dt) {
        if (this.data.animations.length < 1) return;  
        this.time += dt;
        var dist = comparePosition(this.el.object3D.position);
        if (dist > this.data.pauseDist && this.hasEntered) {
            this.hasEntered = !this.hasEntered;
            console.log('exited');
            //PAUSE ANIMATION
            this.el.setAttribute("loop-animation", { paused: true });
            //this.el.components["loop-animation"].mixerEl.components["animation-mixer"].pause();
            this.restartAnim(this.data.offClips);
        } else if (dist < this.data.playDist && dist > this.data.minDist && !this.hasEntered) {
            this.hasEntered = !this.hasEntered;
            console.log('entered and playing');
            //RESTART OR RESUME ANIMATION
            this.restartAnim(this.data.onClips);
            // if (this.data.shouldReset) {
            //     this.restartAnim(this.data.onClips);
            // } else {
            //     this.el.setAttribute("loop-animation", { paused: false });
            //     this.el.components["loop-animation"].mixerEl.components["animation-mixer"].play();
            // }
        } else if (dist < this.data.minDist && this.hasEntered) {
            this.hasEntered = !this.hasEntered;
            console.log('too close and pausing');
            //PAUSE ANIMATION
            this.el.setAttribute("loop-animation", { paused: true });
            //this.el.components["loop-animation"].mixerEl.components["animation-mixer"].pause();
        }
    },

    restartAnim(clipNames) {
        if (this.data.animations.length < 1 || typeof clipNames === "string") return;
        console.log(this.data.animations)
        this.el.components["loop-animation"].destroy();
        //const clips = [...this.animations];
        const clips = this.data.animations.filter(x => clipNames.includes(x.name));
        console.log(clips);
        if (clips.length < 1) return;
        const mixer = this.el.components["loop-animation"].mixerEl.components["animation-mixer"].mixer;
        for (let i = 0; i < clips.length; i++) {
            let action = mixer.clipAction(clips[i], this.el.object3D);
            action.enabled = true;
            //console.log(action)
            if (!this.data.shouldLoop) {
                action.setLoop(2200, -1);
                action.clampWhenFinished = true;
                action.play();
            } else {
                action.setLoop(THREE.LoopRepeat, Infinity).play();
            }
            this.el.components["loop-animation"].currentActions.push(action);
        }
        this.el.components["loop-animation"].mixerEl.components["animation-mixer"].play();
        this.el.setAttribute("loop-animation", { paused: false });
    }
});
  