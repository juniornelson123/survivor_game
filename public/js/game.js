var game
var dirX
var diry
var walk
window.onload = () => {
    var gameConfig = {
        width: 1400,
        height: 700,
        backgroundColor: 0xecf0f1,
        physics: {
            default: 'arcade',
            arcade: {
                // gravity: { y: 300 },
                debug: false
            }
        },
        scene: [initGame]
    }
    game = new Phaser.Game(gameConfig)
    window.focus()
    resizeGame();
    window.addEventListener("resize", resizeGame);
  
}

var player
var enemy

class initGame extends Phaser.Scene {
    constructor(){
        super("InitGame")
    }

    preload(){

        this.load.image("bullet", "/public/assets/bullet.png")

        for (let i = 0; i <= 16; i++) {
            this.load.image('enemy_move_' + i, '/public/assets/zombie/skeleton-move_' + i + ".png");
        }

        for (let i = 0; i <= 8; i++) {
            this.load.image('enemy_attack_' + i, '/public/assets/zombie/skeleton-attack_' + i + ".png");
        }

        for (let i = 0; i < 13; i++) {
            this.load.image('idle_'+i, '/public/assets/player/handgun/idle/survivor-idle_handgun_'+i+".png");
        }

        for (let i = 0; i < 13; i++) {
            this.load.image('move_'+i, '/public/assets/player/handgun/move/survivor-move_handgun_'+i+".png");
        }
        
    }

    create(){

        var player_idle = []
        var player_move = []

        var enemy_move = []
        var enemy_attack = []
        
        for (let i = 0; i < 12; i++) {
            player_idle.push({ key: "idle_"+i })
            player_move.push({ key: "move_"+i })
        }
        
        for (let i = 11; i > 0; i--) {
            if(i != 10){
                player_idle.push({ key: "idle_"+i })
                player_move.push({ key: "move_"+i })
            }
        }

        for (let i = 0; i <= 16; i++) {
            enemy_move.push({ key: "enemy_move_" + i })
        }

        for (let i = 0; i <= 8; i++) {
            enemy_attack.push({ key: "enemy_attack_" + i })
        }

        // for (let i = 0; i <= 8; i++) {
        //     enemy_attack.push({ key: "enemy_attack_" + i })
        // }


        this.anims.create({
            key: 'player_idle',
            frames: player_idle,
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'player_move',
            frames: player_move,
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_move',
            frames: enemy_move,
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_attack',
            frames: enemy_attack,
            frameRate: 20,
            repeat: -1
        });

        player = this.physics.add.sprite(700, 350, 'idle_0')

        enemy = this.physics.add.sprite(200, 350, 'enemy_move_0')
        enemy.play("enemy_move")

        this.cameras.main.setSize(1400, 700);
        
        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            let angle = Phaser.Math.Angle.BetweenPoints(player, cursor)
            player.setAngle((360 / (2 * Math.PI)) * angle)
        }, this);

        this.input.on('pointerdown', function (pointer) {
            // let cursor = pointer;
            // let angle = Phaser.Math.Angle.BetweenPoints(player, cursor)
            // var bullet = this.physics.add.sprite(player.x, player.y, "bullet")
            // bullet.setVelocityX((360 / (2 * Math.PI)) * angle);
        }, this);
    }

    update(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        if(cursors.left.isDown){
            player.play("player_move", true)
            player.setVelocityX(-150);
            player.setAngle(180)
        }else if(cursors.right.isDown){
            player.play("player_move", true)
            player.setVelocityX(150);
            player.setAngle(360)
        }else if(cursors.up.isDown){
            player.play("player_move", true)
            player.setVelocityY(-150);
            player.setAngle(-90)
        }else if(cursors.down.isDown){
            player.play("player_move", true)
            player.setAngle(90)
            player.setVelocityY(150);
        }else {
            player.play("player_idle", true)
            player.body.velocity.setTo(0, 0)
        }

        if (this.input.activePointer.isDown) {
            

        }
        // this.physics.moveTo(enemy, player.x, player.y, 100)   
    
    }
}

function resizeGame() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
