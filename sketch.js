var recyclable_materials,recyclable_materials_group,recyclable_material_1,recyclable_material_2,recyclable_material_3,recyclable_material_4,recyclable_material_5,recyclable_material_6;
var obstacles,obstacles_group,obstacle_1,obstacle_2,obstacle_3,obstacle_4,obstacle_5,obstacle_6,obstacle_7,obstacle_8;

var player_running_animation,player_death_image,player;
var background_image,background_screen;

var restart_button_image,restart_button;
var ground;

var neon_ambience;
var obstacles_sfx;
var material_sfx;
var loser_sfx;
var jump_sfx;

var recyclable_materials_collected=0;
var game_state="alive";
var game_score=0;

function preload() {

    background_image=loadImage("./assets/Background.png");

    player_running_animation=loadAnimation("./assets/R_1.png","./assets/R_2.png","./assets/R_3.png","./assets/R_4.png","./assets/R_5.png","./assets/R_7.png","./assets/R_7.png","./assets/R_8.png");
    player_death_image=loadAnimation("./assets/Death.png");

    recyclable_material_1=loadImage("./assets/C_1.png");
    recyclable_material_2=loadImage("./assets/C_2.png");
    recyclable_material_3=loadImage("./assets/C_3.png");
    recyclable_material_4=loadImage("./assets/C_4.png");
    recyclable_material_5=loadImage("./assets/C_5.png");
    recyclable_material_6=loadImage("./assets/C_6.png");

    obstacle_1=loadImage("./assets/O_1.png");
    obstacle_2=loadImage("./assets/O_2.png");
    obstacle_3=loadImage("./assets/O_3.png");
    obstacle_4=loadImage("./assets/O_4.png");
    obstacle_5=loadImage("./assets/O_5.png");
    obstacle_6=loadImage("./assets/O_6.png");
    obstacle_7=loadImage("./assets/O_7.png");
    obstacle_8=loadImage("./assets/O_8.png");

    restart_button_image=loadImage("./assets/Restart.png");

    neon_ambience = loadSound('Neon_Ambience.mp3');
    obstacles_sfx = loadSound('Obstacles_Sfx.mp3');
    material_sfx = loadSound('Material_Sfx.mp3');
    loser_sfx = loadSound('Loser_Sfx.mp3')
    jump_sfx = loadSound('Jump_Sfx.mp3');

    neon_ambience.playing=true;
    neon_ambience.looping=true;

    obstacles_sfx.playing=true;
    obstacles_sfx.looping=false;

    material_sfx.playing=true;
    material_sfx.looping=false;

    loser_sfx.playing=true;
    loser_sfx.looping=false;

    jump_sfx.playing=true;
    jump_sfx.looping=false;

}

function setup() {

    createCanvas(1530,740);

    neon_ambience.play();
    neon_ambience.loop();
    neon_ambience.setVolume(0.3);

    obstacles_sfx.setVolume(0.2);
    material_sfx.setVolume(0.1);

    loser_sfx.setVolume(0.3);
    jump_sfx.setVolume(0.1);

    background_screen = createSprite(0,369,1550,750);
    background_screen.addImage(background_image);             

    restart_button = createSprite(765,370);
    restart_button.addImage(restart_button_image);
    restart_button.visible=false;
    restart_button.scale = 0.5;

    player = createSprite(150,610,50,35);
    player.addAnimation("running",player_running_animation);
    player.addAnimation("dead",player_death_image);

    player.scale = 0.8;
    player.setCollider("rectangle",0,0,150,210);

    ground = createSprite(200,680,1800,30)
    ground.visible=false;

    obstacles_group = new Group();
    recyclable_materials_group = new Group();


}

function draw() {

    background(background_image);

    if(game_state=="alive") {

        background_screen.velocityX= -(15+game_score/5000);
        restart_button.visible=false;
    
    if(background_screen.x<0) {

        background_screen.x=background_screen.width/2;

    }

    if(keyDown("space") && player.y>=580) {

        player.velocityY=-20;
        jump_sfx.play();

    }

    player.velocityY=player.velocityY+1;

    spawn_obstacles();
    spawn_recyclable_materials();
    game_score=game_score+Math.round(frameCount/150);


    if(player.isTouching(obstacles_group)) {


        loser_sfx.play()
        game_state="dead";

    }

    if(player.isTouching(recyclable_materials_group)) {

        recyclable_materials_group.destroyEach();
        recyclable_materials_collected=recyclable_materials_collected+1;

    }

    }

    if(game_state=="dead") {

        player.changeAnimation("dead",player_death_image);

        player.velocityY=0;
        background_screen.velocityX=0;

        obstacles_group.setVelocityXEach(0);
        recyclable_materials_group.setVelocityXEach(0);

        obstacles_group.destroyEach();
        recyclable_materials_group.destroyEach();

        restart_button.visible=true ;

        neon_ambience.stop();
        obstacles_sfx.stop();
        material_sfx.stop();
        jump_sfx.stop();

        if(mousePressedOver(restart_button)) {

            restart();

        }

    }

    player.collide(ground);

    drawSprites();

    if (recyclable_materials_collected<3) {

        textSize(25);
        fill("black");

        text("Zooming through neon Tokyo, Kai swiped, dodging dog walkers and rogue sushi boxes",10,100);
        text("Cans and bottles pulsed, points shimmering",10,140);
        text("Each recycled treasure added weight, his avatar straining, the cityscape twisting, morphing from glittering Seoul to bustling Rio",10,180);
        text("The more he collected, the faster the pace, a dizzying dance between trash and triumph",10,220);

    }

        textSize(25);
        fill("red");
        text("Recycable Materials Collected : "+recyclable_materials_collected,10,50);

        text(25)
        fill("red")
        text("Score : "+game_score,1300,50);

}

function spawn_obstacles() {

    if(frameCount%50===0) {

        var obstacles = createSprite(1500,610,50,35);
        obstacles.velocityX=-(15+game_score/5000);
        obstacles.scale=0.8;
        obstacles.setCollider("rectangle",0,0,110,110)

    var rand = Math.round(random(1,8));
    switch (rand) {

        case 1: obstacles.addImage(obstacle_1);
                break;
        case 2: obstacles.addImage(obstacle_2);
                break;
        case 3: obstacles.addImage(obstacle_3);
                break;
        case 4: obstacles.addImage(obstacle_4);
                break;
        case 5: obstacles.addImage(obstacle_5);
                break;
        case 6: obstacles.addImage(obstacle_6);
                break;
        case 7: obstacles.addImage(obstacle_7);
                break;
        case 8: obstacles.addImage(obstacle_8);
                break;                
        default: break;

    }

        obstacles_group.add(obstacles);
        obstacles.lifetime=140;
        obstacles_sfx.play();

    }

}

function spawn_recyclable_materials() {

    if(frameCount%150===0) {

        recyclable_materials = createSprite(1500,400,40,40);
        recyclable_materials.velocityX=-(15+game_score/5000);
        recyclable_materials.scale=1;
        material_sfx.play();
    
        var rand_2 = Math.round(random(1,6));
        switch (rand_2) {
    
            case 1: recyclable_materials.addImage(recyclable_material_1);
                    break;
            case 2: recyclable_materials.addImage(recyclable_material_2);
                    break;
            case 3: recyclable_materials.addImage(recyclable_material_3);
                    break;
            case 4: recyclable_materials.addImage(recyclable_material_4);
                    break;
            case 5: recyclable_materials.addImage(recyclable_material_5);
                    break;
            case 6: recyclable_materials.addImage(recyclable_material_6);
                    break;                
            default: break;
    }

        recyclable_materials_group.add(recyclable_materials);
        recyclable_materials.lifetime=140;

        if(recyclable_materials_collected>=1) {
    
            material_sfx.setVolume(0.1);
            material_sfx.play();
    
        }

    }   

}

function restart() {
    
    recyclable_materials_collected=0;
    neon_ambience.play();
    game_state="alive";
    game_score=0;

    player.changeAnimation("running",player_running_animation);

}