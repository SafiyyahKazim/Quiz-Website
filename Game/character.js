class Player {
    floor = 50;
    dead = 0;
    gravity = 0.2;
    isAttacking = false;
    frames = 0;
    idle = 0;
    currentxFrame = 0;
    currentyFrame = 5;
    totalFrames = 0;
    staggerFrame = 20;
    currentAnimation = this.idleAnimation;
    idleAnimation = 'idle';
    runAnimation = 'run';
    jumpAnimation = 'jump';
    attackAnimation = 'attack';
    dieAnimation = 'die';
    isDead = false;

    keys = {
        left: {
            pressed: false
        },
        right: {
            pressed: false
        },
        jump: {
            pressed: false
        }
    }

    constructor({
        position, size, velocity, movementKey, stats, hitbox, imageSrc, scale = 1, animationStates, frameSize}) { 

        this.position = position;
        this.size = size
        this.velocity = velocity;
        this.movementKey = movementKey;
        this.stats = stats;
        this.hitbox = hitbox;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.animationStates = animationStates;
        this.frameSize = frameSize;
    }

    PlayerGravity() {
        if(this.position.y + this.size.height + this.velocity.y >= canvas.height - this.floor) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += this.gravity;
        }
    }

    //movement
    userInput() {
        window.addEventListener('keydown', (event) => {
        if(!this.isDead) {
            switch (event.key) {
                case this.movementKey.right:
                    this.keys.right.pressed = true; //d is pressed
                break;

                case this.movementKey.left:
                    this.keys.left.pressed = true; //a is pressed
                break;

                case this.movementKey.jump:
                    if(Math.ceil(this.position.y) >= canvas.height - this.size.height - this.floor) { //jump if Player is on floor
                        this.keys.jump.pressed = true;
                        this.velocity.y = -this.stats.jump;
                        this.switchAnimation(this.jumpAnimation);
                    }
                
                break;

                case this.movementKey.attack: //attack key is pressed
                    this.attack();
                    this.switchAnimation(this.attackAnimation);
                break;
            }
        }   
    }) 

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case this.movementKey.right:
                    this.keys.right.pressed = false; //left is not pressed
                break;

                case this.movementKey.left:
                    this.keys.left.pressed = false; //right is not pressed
                break;
                
                case this.movementKey.attack:
                    this.isAttacking = false;
                break;
                case this.movementKey.jump:
    
                    this.keys.jump.pressed = false;
        
            }     
            //console.log(event.key);
        }) 

        //movement
        if(this.keys.left.pressed == true && this.keys.right.pressed == true) { //idle if both left and right is pressed together
            this.velocity.x = this.idle;
            this.switchAnimation(this.idleAnimation);
            
        }
        else if(this.keys.left.pressed == true) { //go left if pressed
            this.velocity.x = -this.stats.speed;
            this.switchAnimation(this.runAnimation);
           
        }
        else if(this.keys.right.pressed == true) { //go right if pressed
            this.velocity.x = this.stats.speed;
            this.switchAnimation(this.runAnimation);
        }
        else if(this.keys.right.pressed == false || 
            this.keys.left.pressed == false || 
            this.isAttacking == false || 
            this.keys.jump.pressed == false) { //idle if nothing is pressed
            this.velocity.x = this.idle;
            this.switchAnimation(this.idleAnimation);
        }
    }

    attack() {
        this.isAttacking= true;
       
        setTimeout(()=> { //.2 second cooldown on each attack
            this.isAttacking = false;
        }, 200) //ms
    }

    hit(Player) {
        if(this.position.x + this.hitbox.width >= Player.position.x &&
            this.position.x <= Player.position.x + Player.size.width &&
            this.position.y + this.hitbox.height >= Player.position.y &&
            this.position.y <= Player.position.y + Player.size.height &&
            this.isAttacking) {
                console.log(this.stats.name + " hit " + Player.stats.name);
                Player.stats.maxHp -= this.stats.attackDmg;
                if(Player.stats.maxHp <= this.dead) { //force 0 hp because width can't go lower than 0
                    Player.stats.maxHp = this.dead;
                    Player.isDead = true;
                    Player.switchAnimation(this.dieAnimation);
                }
                document.querySelector('#' + Player.stats.name).style.width = Player.stats.maxHp + '%';
                console.log(Player.stats.maxHp);
                this.isAttacking = false;
            }
    }

    //animation

    maxFrames(state) { //returns # of x frames in that state
        for(let i = 0; i < this.animationStates.length; i++) {
            if(this.animationStates[i].name === state) {
                return this.animationStates[i].xFrame;
            }
        }
    }

    getyFrame(state) { //get the animation state of sprite
        for(let i = 0; i < this.animationStates.length; i++) {
            if(this.animationStates[i].name === state) {
                return this.animationStates[i].yFrame;
            }
        }
    }

    animation(state) {
        this.totalFrames++;
        if(this.totalFrames % this.staggerFrame === 0) {
            if(this.currentxFrame < this.maxFrames(state) - 1) {
                this.currentxFrame++;
            }
            else {
                this.currentxFrame = 0;
            }
        }
    }

    //currentState
    currentState() {
        this.currentyFrame = this.getyFrame(this.currentAnimation)
        this.animation(this.currentAnimation);
    }

    switchAnimation (state) {
        if(this.currentAnimation === this.jumpAnimation &&
        this.currentxFrame < this.maxFrames(this.jumpAnimation) - 1) return this.currentState(); //animate once
        
        if(this.currentAnimation === this.attackAnimation && 
        this.currentxFrame < this.maxFrames(this.attackAnimation) - 1) return this.currentState(); //animate once
        
        if(this.currentAnimation === this.dieAnimation &&
        this.currentxFrame < this.maxFrames(this.dieAnimation) - 1) {
            if(this.currentxFrame === this.maxFrames(this.dieAnimation) - 1) {
                this.isDead = true;
            }
            return this.currentState(); //animate once
        }
    

        switch(state) {
        case this.idleAnimation:
            if(this.currentyFrame != this.getyFrame(this.idleAnimation)) {
                this.currentAnimation = this.idleAnimation;
                this.currentxFrame = 0;
            }
            this.currentState();
        break;
    
        case this.runAnimation:
            if(this.currentyFrame != this.getyFrame(this.runAnimation)) {
                this.currentAnimation = this.runAnimation;
                this.currentxFrame = 0;
            }
            this.currentState();
        break;
        case this.jumpAnimation:
            if(this.currentyFrame != this.getyFrame(this.jumpAnimation)) {
                this.currentAnimation = this.jumpAnimation;
                this.currentxFrame = 0;
            }
            this.currentState();
        break;
        case this.attackAnimation:
            if(this.currentyFrame != this.getyFrame(this.attackAnimation)) {
                this.currentAnimation = this.attackAnimation;
                this.currentxFrame = 0;
            }
            this.currentState();
        break;
        case this.dieAnimation:
            if(this.currentyFrame != this.getyFrame(this.dieAnimation)) {
                this.currentAnimation = this.dieAnimation;
                this.currentxFrame = 0;
            }
            this.currentState();
        break;
        }
    }

    flip() {
        c.translate(this.size.width, 0);
        c.scale(-1, 1);
        c.drawImage(this.image,
            this.currentxFrame * this.frameSize.width, //which part of the sheet to capture
            this.currentyFrame * this.frameSize.height,
            this.frameSize.width, //pixel size
            this.frameSize.height,
            -this.position.x, //location on screen
            this.position.y,
            this.size.width, //scaling size
            this.size.height);
    }

    draw() {
        //hitbox
        /*
        if(this.isAttacking) {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
        }
        */
        
        c.drawImage(
            this.image,
            this.currentxFrame * this.frameSize.width, //which part of the sheet to capture
            this.currentyFrame * this.frameSize.height,
            this.frameSize.width, //pixel size
            this.frameSize.height,
            this.position.x, //location on screen
            this.position.y,
            this.size.width, //scaling size
            this.size.height
        );
    
        console.log('current x: ' + this.currentxFrame);
        console.log('current y: ' + this.currentyFrame)
    }

    update() {
    
        console.log(this.currentAnimation)
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.PlayerGravity();
        this.userInput();
        console.log(this.isDead)
    }
}