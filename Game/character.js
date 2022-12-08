class Sprite{
    
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        console.log(this.image.src);
        c.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height);
    }

    update() {
        this.draw();
    }
}

class Player{
    floor = 50;
    dead = 0;
    gravity = 0.2;
    isAttacking = false;
    frames = 0;
    idle = 0;

    keys = {
        left: {
            pressed: false
        },
        right: {
            pressed: false
        },
        attack: {
            pressed: false
        }
    }

    constructor({position, size, velocity, movementKey, stats, hitbox, imageSrc, sprite, animationStates}) { 
        this.position = position;
        this.size = size
        this.velocity = velocity;
        this.movementKey = movementKey;
        this.stats = stats;
        this.hitbox = hitbox;
        this.image = new Image();
        this.image.src = imageSrc;
        this.sprite = sprite;
        this.animationStates = animationStates;

    
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
            switch (event.key) {
                case this.movementKey.right:
                    this.keys.right.pressed = true; //d is pressed
                break;

                case this.movementKey.left:
                    this.keys.left.pressed = true; //a is pressed
                break;

                case this.movementKey.jump:
                    if(Math.ceil(this.position.y) >= canvas.height - this.size.height - this.floor) { //jump if Player is on floor
                        this.velocity.y = -this.stats.jump;
                    }
                break;

                case this.movementKey.attack: //attack key is pressed
                    this.attack();
                break;
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
            }      
            console.log(event.key);
        }) 


        //movement
        if(this.keys.left.pressed == true && this.keys.right.pressed == true) { //idle if both left and right is pressed together
            this.velocity.x = this.idle;
        }
        else if(this.keys.left.pressed == true) { //go left if pressed
            this.velocity.x = -this.stats.speed;
        }
        else if(this.keys.right.pressed == true) { //go right if pressed
            this.velocity.x = this.stats.speed; 
        }
        else { //idle if nothing is pressed
            this.velocity.x = this.idle;
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
                }
                document.querySelector('#' + Player.stats.name).style.width = Player.stats.maxHp + '%';
                console.log(Player.stats.maxHp);
                this.isAttacking = false;
            }
    }

    idleState() {
        c.drawImage(this.image, this.sprite.frameX * this.sprite.width , this.sprite.frameY * this.sprite.height, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.size.width, this.size.height);
        for(let i = 0; i < this.animationStates.length; i++) {
            console.log(this.animationStates[i].name);
            if(this.animationStates[i].name === 'idle') {
                if(this.frames % this.sprite.staggerFrames == 0) {
                    if(this.sprite.frameX < this.animationStates[i].frames - 1) {
                        this.sprite.frameX++;
                    }
                    else {
                        this.sprite.frameX = 0;
                    }
                }
            }
        }   
        this.frames++;
    }

    draw() {
        c.fillStyle = this.stats.color;
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

        //hitbox
        if(this.isAttacking) {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
        }

        //character     
        this.idleState();
        console.log(this.animationStates.length);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.PlayerGravity();
        this.userInput();
    }
}