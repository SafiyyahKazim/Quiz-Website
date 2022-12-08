const canvas = document.querySelector('canvas'); //game screen
const c = canvas.getContext('2d');
canvas.width = 1100;
canvas.height = 600;


class Game {
    timer = 60; //1 min of gameplay
    timerID;
    
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

    countdownTimer = () => {
        if(this.timer > 0) {
            this.timerID = setTimeout(this.countdownTimer, 1000); //count down by one second
            this.timer--;
            document.querySelector('#timer').innerHTML = this.timer;
        }

        if(this.timer === 0) {
            this.determineWinner(player1, player2);
        }
        console.log(this.timer);
    }

    determineWinner(player1, player2) {
        clearTimeout(this.timerID); //pause time
        document.querySelector('#gameOver').style.display = 'flex';
        if(player1.stats.maxHp === player2.stats.maxHp) {
            document.querySelector('#gameOver').innerHTML = 'Tie';
        }
        else if(player1.stats.maxHp > player2.stats.maxHp) {
            document.querySelector('#gameOver').innerHTML = player1.stats.name + ' wins';
        }
        else if(player1.stats.maxHp < player2.stats.maxHp) {
            document.querySelector('#gameOver').innerHTML = player2.stats.name + ' wins';
        }
    }

    gameOver() {
        if(this.player1.stats.maxHp <= 0 || this.player2.stats.maxHp <=0) {
            this.determineWinner(this.player1, this.player2);
        }
    }

    update() {
        this.player1.update();
        this.player2.update();
        this.playerAlive();
        this.successfulAttack();
        this.gameOver();   
    }

}

const player1 = new Player({
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
    },
    imageSrc: '/Game/AnimationSheet_Character.png', 
    sprite: {
        width: 32,
        height: 32,
        frameX: 0,
        frameY: 0,
        staggerFrames: 15
    },
    animationStates: [
        {
            name: 'idle',
            frames: 2,
            row: 0
        },
        {
            name: 'jump',
            frames: 8,
            row: 5
        },
        {
            name:'run',
            frames: 8,
            row: 3
        },
        {
            name: 'attack',
            frames: 8,
            row: 8
        },
        {
            name: 'die',
            frames: 8,
            row: 7
        }
    ]
});

const player2 = new Player({
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
        height: 15
    },
    imageSrc: '/Game/AnimationSheet_Character.png',
    sprite: {
        width: 32,
        height: 32,
        frameX: 0,
        frameY: 0,
        staggerFrames: 20
    },
    animationStates: [
        {
            name: 'idle',
            frames: 2,
            row: 0
        },
        {
            name: 'jump',
            frames: 8,
            row: 5
        },
        {
            name:'run',
            frames: 8,
            row: 3
        },
        {
            name: 'attack',
            frames: 8,
            row: 8
        },
        {
            name: 'die',
            frames: 8,
            row: 7
        }
    ]
});

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    imageSrc: '/Game/Background/Background.png'
})

const game = new Game(canvas.width, canvas.height, player1, player2);

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height); //clear previous frame
    background.update();
    game.update();

}

animate();
game.countdownTimer();
