class Sprite {
    constructor(sprite_json, x, y, start_state) {
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "TenderBud";
        this.cur_frame = 0;
        this.x_v = 20;
        this.y_v = 20;
        this.inBounds;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.idleTimer; 
        this.time = 500; //after 0.5 secs then goes idle
    }

    draw() {
        const ctx = canvas.getContext('2d');
    
        if (this.cur_frame < 0 || this.cur_frame >= this.sprite_json[this.root_e][this.state].length) {
            this.cur_frame = 0;
        }
    
        var currentFrameData = this.sprite_json[this.root_e][this.state][this.cur_frame];
    
        if (!currentFrameData['img']) { 
            const imagePath = `Penguins/${this.root_e}/${this.state}/${this.cur_frame}.png`;
            currentFrameData['img'] = new Image();
            currentFrameData['img'].src = imagePath;
        }

        ctx.drawImage(currentFrameData['img'], this.x, this.y);

        this.cur_frame = (this.cur_frame + 1) % this.sprite_json[this.root_e][this.state].length;

        if (!this.inBounds) { //if it a hit a boundary
            if (this.x >= (this.canvasWidth - currentFrameData['w'])) { //if it hit the right
                this.bound_hit('E');
            } else if (this.x <= 0) { //if it hit the left
                this.bound_hit('W');
            } else if (this.y >= (this.canvasHeight - currentFrameData['h'])) { //if it hit the bottom
                this.bound_hit('S');
            } else if (this.y <= 0) { //if it hit the top
                this.bound_hit('N');
            }
        }
    }

    set_idle_state() {
        const idle_state = ["idle", "idleBackAndForth", "idleBreathing", "idleFall", "idleLayDown", "idleLookAround", "idleLookDown", "idleLookLeft", "idleLookRight", "idleLookUp", "idleSit", "idleSpin", "idleWave"];
        const random = Math.floor(Math.random() * idle_state.length);
        this.state = idle_state[random];
        console.log(this.state);
        this.stopTimer(); //stops timer til user presses something
    }

    bound_hit(side) {
        if (side === 'E') { 
            this.x -= 60;
            console.log("hit the right bounds");
        } else if (side === 'W') {
            this.x += 40;
            console.log("hit the left bounds");
        } else if (side === 'S') {
            this.y -= 20;
            console.log("hit the down bounds");
        } else if (side === 'N') {
            this.y += 20;
            console.log("hit the up bounds");
        }
        this.set_idle_state();
    }

startTimer() {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }

        this.idleTimer = setTimeout(() => {
            this.set_idle_state();
        }, this.time);
}

stopTimer() {
    if (this.idleTimer) {
        clearTimeout(this.idleTimer);
        this.idleTimer = null;
    }
}

 //mover functions, starts timer when called
 moveLeft() {
    this.x -= this.x_v;
    this.state = "walk_W";
    console.log(this.state);
    this.startTimer();
}

moveRight() {
    this.x += this.x_v;
    this.state = "walk_E";
    console.log(this.state);
    this.startTimer();
}

moveUp() {
    this.y -= this.y_v;
    this.state = "walk_N";
    console.log(this.state);
    this.startTimer();
}

moveDown() {
    this.y += this.y_v;
    this.state = "walk_S";
    console.log(this.state);
    this.startTimer();
}


}