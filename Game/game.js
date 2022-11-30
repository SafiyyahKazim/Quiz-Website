window.addEventListener('load', function() { //load faster
const canvas = document.getElementById('canvas1'); //game screen
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1024;
const CANVAS_HEIGHT = canvas.height = 576;


class Sprite {
    floor = 0;
    gravity = 0.2;
    idle = 0;
    isAttacking = false;

    keys = {
        left: {
            pressed: false
        },
        right: {
            pressed: false
        },
    }

    constructor({info, position, size, velocity, movementKey, stats, hitbox}) {
        this.info = info;
        this.position = position;
        this.size = size
        this.velocity = velocity;
        this.movementKey = movementKey;
        this.stats = stats;
        this.hitbox = hitbox;
        
    }

    spriteGravity() {
        if(this.position.y + this.size.height + this.velocity.y >= CANVAS_HEIGHT) {
            this.velocity.y = this.floor;
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
                    if(this.position.y >= CANVAS_HEIGHT - this.size.height) { //jump if sprite is on floor
                        this.velocity.y = -this.stats.jump;
                    }
                break;

                case this.movementKey.attack:
                    this.attack(); //attack is pressed
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
            }      
        }) 

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

    collision(Sprite) {
        if(this.position.x + this.hitbox.width >= Sprite.position.x &&
            this.position.x <= Sprite.position.x + Sprite.size.width &&
            this.position.y + this.hitbox.height >= Sprite.position.y &&
            this.position.y <= Sprite.position.y + Sprite.size.height &&
            this.isAttacking) {
                console.log(this.info.name + ' hit ' + Sprite.info.name);
                this.isAttacking = false;
            }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(()=> { //1 second cooldown on each attack
            this.isAttacking = false;
        }, 1000) //ms
    }

    draw() {
        ctx.fillStyle = this.stats.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

        //hitbox
        if(this.isAttacking) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
        }
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.spriteGravity();
        this.userInput();
    }
}

//gameplay
class Game {
    constructor(width, height) {
        //size of game
        this.width = width;
        this.height = height;

        //creates player
        this.player1 = new Sprite({
            info: {
                name: 'Player1'
            },
            position: {
                x: 100,
                y: 0
            },
            size: {
                width: 80,
                height: 150
            }, 
            velocity: {
                x: 0,
                y: 0
            },
            movementKey: {
                right: 'd',
                left: 'a',
                jump: 'w',
                attack: 'g'
            },
            stats: {
                color: 'green',
                hp: 100,
                attackDmg: 5,
                jump: 7,
                speed: 5
            },
            hitbox: {
                width: 150,
                height: 25
            }
        });

        //creates enemy
        this.player2 = new Sprite({
            info: {
                name: 'Player2'
            },
            position: {
                x: 700,
                y: 0
            },
            size: {
                width: 80,
                height: 150
            }, 
            velocity: {
                x: 0,
                y: 0
            },
            movementKey: {
                right: 'ArrowRight',
                left: 'ArrowLeft',
                jump: 'ArrowUp',
                attack: '.'
            },
            stats: {
                color: 'black',
                hp: 100,
                attack: 7,
                jump: 7,
                speed: 5
            },
            hitbox: {
                width: 150,
                height: 25
            }
        });
    }

    draw() {
        
    }

    update() {
        this.player1.update();
        this.player2.update();
        this.player1.collision(this.player2);
        this.player2.collision(this.player1);
    }
}

const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);


function animate() {
    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //clear previous frame
    game.update();
    game.draw();
}

animate();
});