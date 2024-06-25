export default class Game extends Phaser.Scene {

    constructor() {
        super({key: "game"});
    }

    init(){

    }

    preload() {
        //Fondo
        this.load.image("background", "images/Background.png");
        //personaje corriendo
        this.load.spritesheet("personaje", "images/XL/Correr/correr.png", {frameWidth: 768 / 3, frameHeight: 768 / 3, startFrame: 1} );

        //personaje saltande 
        this.load.spritesheet("saltar", "images/XL/Saltar/salto.png", {
            frameWidth: 512 / Math.sqrt(4), // Divide el ancho por la raíz cuadrada de la cantidad de frames
            frameHeight: 512 / Math.sqrt(4) // Divide el alto por la raíz cuadrada de la cantidad de frames
        });
      

        //Tiles
        this.load.image("palo", "images/elementos/palo.png");
        this.load.image("piso", "images/elementos/plataforma.png");
        this.load.image("pisito", "images/elementos/pisito.png");


    }

    create() {
        //Fondo
       //let background = this.add.image(400, 200, "background");
       this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, "background");
       this.background.setOrigin(0, 0);
       
       
       //Crear grupo de plataformas
       this.plataformas = this.physics.add.staticGroup();

       // Configuración del mundo y cámara
       this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.game.config.height);
       this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.game.config.height);



       //Crear una pared
       this.plataformas.create(600, 485, "palo").setScale(0.3).refreshBody();

       // Crear piso inicial
       this.crearPisoInicial();

      
      
       //personaje
       
       this.player = this.physics.add.sprite(100, 300, "personaje");
       this.player.setScale(0.4);
       this.player.setCollideWorldBounds(true);
       this.player.setSize(100, 150); // Ajusta el ancho y alto del cuerpo de colisión según tus necesidades
       this.player.setOffset(80, 90); // Ajusta el desplazamiento (offset) del cuerpo de colisión para centrarlo correctamente
        // Configurar la cámara para que siga al personaje
       this.cameras.main.startFollow(this.player);
       this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.game.config.height);

       this.anims.create({
        key: "correr",
        frames: this.anims.generateFrameNumbers("personaje", { start: 1, end: 8 }),
        frameRate: 9,
        repeat: -1
    
        })

        this.anims.create({
            key: "salto",
            frames: this.anims.generateFrameNumbers("saltar", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.world.gravity.y = 650;


       // Configurar colisiones entre el personaje y los sprites de suelo
       this.physics.add.collider(this.player, this.plataformas);

       this.cursor = this.input.keyboard.createCursorKeys();

       // Variables para la generación de plataformas
       this.ultimoX = 800; // última posición X donde se creó una plataforma
       this.distanciaGenerar = 400; // distancia al borde de la pantalla para generar nuevas plataformas

       
      
       

   
    }
    update()
    {
        this.moverJugador();
        
        // Actualizar posición del fondo de pantalla con parallax
        this.background.tilePositionX = this.cameras.main.scrollX * 0.3; // Ajusta el factor de parallax según sea necesario

        if(this.player.x > this.ultimoX - this.distanciaGenerar) {
            this.crearPlataformas();
        }

           
    }

    moverJugador(){
       
        if (this.cursor.right.isDown) {
            this.player.setVelocityX(280);
            this.player.anims.play("correr", true);
            this.player.flipX = false; // Asegura de que el personaje no esté volteado
        } else if (this.cursor.left.isDown) {
            this.player.setVelocityX(-280);
            this.player.anims.play("correr", true);
            this.player.flipX = true; // Voltea el personaje hacia la izquierda
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.player.setFrame(0); // Establece el frame específico cuando el personaje está quieto
        }
             //salto del jugador
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
            this.player.anims.play("salto", true);

        } else if(this.player.body.velocity.y < 0 && !this.player.body.touching.down) { // Si el personaje está en el aire
            
            this.player.anims.play("salto", true);


        }
    }

    crearPisoInicial(){
        this.plataformas.create(80, 550, "piso").setScale(0.2).refreshBody();
        this.plataformas.create(200, 550, "pisito").setScale(0.2).refreshBody();
        this.plataformas.create(320, 550, "piso").setScale(0.2).refreshBody();
        this.plataformas.create(440, 550, "pisito").setScale(0.2).refreshBody();
        this.plataformas.create(560, 550, "piso").setScale(0.2).refreshBody();
        this.plataformas.create(680, 550, "pisito").setScale(0.2).refreshBody();
        this.plataformas.create(800, 550, "piso").setScale(0.2).refreshBody();
    }
    crearPlataformas(){
        // Crear nuevas plataformas más allá del último X
        this.plataformas.create(this.ultimoX + 80, 550, "piso").setScale(0.2).refreshBody();
        this.plataformas.create(this.ultimoX + 200, 550, "pisito").setScale(0.2).refreshBody();
        this.plataformas.create(this.ultimoX + 320, 550, "piso").setScale(0.2).refreshBody();
        this.plataformas.create(this.ultimoX + 440, 550, "pisito").setScale(0.2).refreshBody();
        this.plataformas.create(this.ultimoX + 560, 550, "piso").setScale(0.2).refreshBody();
        this.plataformas.create(this.ultimoX + 680, 550, "pisito").setScale(0.2).refreshBody();
        this.plataformas.create(this.ultimoX + 800, 550, "piso").setScale(0.2).refreshBody();

        // Actualizar la última posición X
        this.ultimoX += 800;
    }
}    

       

       


       
       
       






    

