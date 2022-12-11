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
        //console.log(this.timer);
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
        this.player1.draw();
        this.player2.flip();
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
        width: 90,
        height: 25
    },
    imageSrc: '/Game/AnimationSheet_Character.png',
    frameSize: {
        width: 32, 
        height: 32,
        rows: 9
    },
    animationStates: [
        {
            name: 'idle',
            xFrame: 2, //total frames for row x
            yFrame: 0 //row
        },
        {
            name: 'blink',
            xFrame: 2,
            yFrame: 1
        },
        {
            name: 'walk',
            xFrame: 4,
            yFrame: 2
        },
        {
            name:'run',
            xFrame: 8,
            yFrame: 3
        },
        {
            name:'duck',
            xFrame: 6,
            yFrame: 4
        },
        {
            name: 'jump',
            xFrame: 8,
            yFrame: 5
        },
        {
            name:'telport',
            xFrame: 4,
            yFrame: 6
        },
        {
            name:'teleport',
            xFrame: 4,
            yFrame: 7
        },
        {
            name: 'die',
            xFrame: 8,
            yFrame: 7
        },
        {
            name:'attack',
            xFrame: 8,
            yFrame: 8
        },
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
        width: -30,
        height: 15
    },
    imageSrc: '/Game/AnimationSheet_Character.png',
    frameSize: {
        width: 32, 
        height: 32,
        rows: 9
    },
    animationStates: [
        {
            name: 'idle',
            xFrame: 2, //total frames for row x
            yFrame: 0 //row
        },
        {
            name: 'blink',
            xFrame: 2,
            yFrame: 1
        },
        {
            name: 'walk',
            xFrame: 4,
            yFrame: 2
        },
        {
            name:'run',
            xFrame: 8,
            yFrame: 3
        },
        {
            name:'duck',
            xFrame: 6,
            yFrame: 4
        },
        {
            name: 'jump',
            xFrame: 8,
            yFrame: 5
        },
        {
            name:'telport',
            xFrame: 4,
            yFrame: 6
        },
        {
            name:'teleport',
            xFrame: 4,
            yFrame: 7
        },
        {
            name: 'die',
            xFrame: 8,
            yFrame: 7
        },
        {
            name:'attack',
            xFrame: 8,
            yFrame: 8
        },
    ]
})

const player3 = new Player({
    stats: {
        name: 'player3',
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
        width: -30,
        height: 15
    },
    imageSrc: '/Game/AnimationSheet_Character.png',
    frameSize: {
        width: 32, 
        height: 32,
    },
    animationStates: [
        {
            name: 'idle',
            xFrame: 1, //total frames for row x
            img: 'Game/Characters/Idle.png',
            frameWidth: 80,
            frameHeight: 48
        },
        {
            name: 'attack',
            xFrame: 14,
            img: 'Game/Characters/LungingStab.png',
            frameWidth: 86,
            frameHeight: 48
        },
        {
            name:'run',
            xFrame: 8,
            img: 'Game/Characters/Run.png',
            frameWidth: 80,
            frameHeight: 48
        },
        {
            name: 'jump',
            xFrame: 2,
            img: 'Game/Characters/JumpAndFall.png',
            frameWidth: 80,
            frameHeight: 48
        },
        {
            name: 'die',
            xFrame: 4,
            img: 'Game/Characters/Die.png',
            frameWidth: 80,
            frameHeight: 48
        }
    ]
})

class Background{
    
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height);
    }

    update() {
        this.draw();
    }
}

const background = new Background({
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
