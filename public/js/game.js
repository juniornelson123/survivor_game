var game
var dirX
var diry
var walk
window.onload = () => {
    var gameConfig = {
        width: 800,
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

class initGame extends Phaser.Scene {
    constructor(){
        super("InitGame")
    }

    preload(){
        for (let i = 0; i < 13; i++) {
            this.load.image('idle_'+i, '/public/assets/player/handgun/idle/survivor-idle_handgun_'+i+".png");
        }

        for (let i = 0; i < 13; i++) {
            this.load.image('move_'+i, '/public/assets/player/handgun/move/survivor-move_handgun_'+i+".png");
        }
        // this.load.atlas("player_idle", "/public/assets/player/parado.png", "/public/assets/player/parado.json")
        // this.load.atlas("player_idle", "/public/assets/player/parado.png", "/public/assets/player/parado.json")
        
    }

    create(){

        var player_idle = []
        var player_move = []
        
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

        player = this.physics.add.sprite(500, 500, 'idle_0')
        // player.anims.play("player_idle", true)
        // .play('player_idle');
        // player.anims.create({
        //     key: "idle",
        //     frames: this.anims.generateFrameNumbers("player_idle"),
        //     framerate: 6,
        //     yoyo: true,
        //     repeat: -1
        // })
        // player.anims.add('player_idle');

        // player.animations.play('player_idle', 30, true);
        this.input.mouse.capture = true;
    }

    update(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        
        if(cursors.left.isDown){
            player.play("player_move", true)
            player.setVelocityX(-120);
            player.setAngle(180)
        }else if(cursors.right.isDown){
            player.play("player_move", true)
            player.setVelocityX(120);
            player.setAngle(360)
        }else if(cursors.up.isDown){
            player.play("player_move", true)
            player.setVelocityY(-120);
            player.setAngle(-90)
        }else if(cursors.down.isDown){
            player.play("player_move", true)
            player.setAngle(90)
            player.setVelocityY(120);
        }else {
            player.play("player_idle", true)
            
            player.body.velocity.setTo(0, 0)
        }

        // console.log(this.input.activePointer);
        if (this.input.activePointer.isDown) {
            
            dirX = this.input.x 
            diry = this.input.y 
            // this.physics.moveTo(player, dirX, diry, 400)   
            walk = true 
        // player walks
        }
        // console.log(this.input)
        if(dirX == player.x){
            // console.log("Player:"+player.x)
            console.log("entrou!!!")
            console.log("igual")
            player.body.velocity.setTo(0, 0)
            walk = false

        }
        // if (this.input.mousePointer.isDown)
        // {
        //     console.log(cursors)
        //     //  400 is the speed it will move towards the mouse
        //     this.physics.arcade.moveToPointer(player, 400);
            
        //     //  if it's overlapping the mouse, don't move any more
        //     if (Phaser.Rectangle.contains(player.body, this.input.x, this.input.y))
        //     {
        //         console.log(player.body)
        //         console.log(player)
        //         player.body.velocity.setTo(0, 0);
        //     }
        // }
        // else
        // {
        //     player.body.velocity.setTo(0, 0);
        // }
    
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
