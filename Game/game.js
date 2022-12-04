window.addEventListener('load', function() { //load faster
const canvas = document.querySelector('canvas'); //game screen
const c = canvas.getContext('2d');
canvas.width = 1100;
canvas.height = 600;

class Sprite{
    floor = 0;
    dead = 0;
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
        attack: {
            pressed: false
        }
    }

    constructor({position, size, velocity, movementKey, stats, hitbox}) {
        this.position = position;
        this.size = size
        this.velocity = velocity;
        this.movementKey = movementKey;
        this.stats = stats;
        this.hitbox = hitbox;
        
    }

    spriteGravity() {
        if(this.position.y + this.size.height + this.velocity.y >= canvas.height) {
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
                    if(this.position.y >= canvas.height - this.size.height) { //jump if sprite is on floor
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

    hit(Sprite) {
        if(this.position.x + this.hitbox.width >= Sprite.position.x &&
            this.position.x <= Sprite.position.x + Sprite.size.width &&
            this.position.y + this.hitbox.height >= Sprite.position.y &&
            this.position.y <= Sprite.position.y + Sprite.size.height &&
            this.isAttacking) {
                console.log(this.stats.name + " hit " + Sprite.stats.name);
                Sprite.stats.maxHp -= this.stats.attackDmg;
                if(Sprite.stats.maxHp <= this.dead) { //force 0 hp because width can't go lower than 0
                    Sprite.stats.maxHp = this.dead;
                }
                document.querySelector('#' + Sprite.stats.name).style.width = Sprite.stats.maxHp + '%';
                console.log(Sprite.stats.maxHp);
                this.isAttacking = false;
            }
    }

    draw() {
        c.fillStyle = this.stats.color;
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

        //hitbox
        if(this.isAttacking) {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
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

class Game {
    timer = 10;

    constructor(width, height, player1, player2) {
        this.width = width;
        this.height = height;
        this.player1 = player1;
        this.player2 = player2;
    }

    playerAlive() {
        if(player1.stats.maxHp <= 0 && player2.stats.maxHp <=0) {
            console.log(player1.stats.name + " and " + player2.stats.name + " loses.")
        }
        else if(player1.stats.maxHp <= 0) {
            console.log(player1.stats.name + " loses");
        }
        else if(player2.stats.maxHp <=0) {
            console.log(player2.stats.name + " loses");
        }
    }

    successfulAttack() {
        this.player1.hit(this.player2);
        this.player2.hit(this.player1);
    }

    countdownTimer() {
        setTimeout(this.countdownTimer, 1000)
        if(this.timer > 0) {
            this.timer--;
            document.querySelector('#timer').innerHTML = this.timer;
        }
        console.log(this.timer);
    }

    gameplay() {
        this.playerAlive();
        this.successfulAttack();

    
    }

    update() {
        this.player1.update();
        this.player2.update();
        this.gameplay();

    }

}

const player1 = new Sprite({
    stats: {
        name: 'player1',
        color: 'green',
        maxHp: 100,
        attackDmg: 15,
        jump: 7,
        speed: 5
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
    hitbox: {
        width: 150,
        height: 25
    }
});

const player2 = new Sprite({
    stats: {
        name: 'player2',
        color: 'blue',
        maxHp: 100,
        attackDmg: 15,
        jump: 7,
        speed: 5
    },
    position: {
        x: 900,
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
    hitbox: {
        width: 150,
        height: 25
    }
});

const game = new Game(canvas.width, canvas.height, player1, player2);

game.countdownTimer();
game.gameplay();

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height); //clear previous frame
    game.update();
}

animate();
});