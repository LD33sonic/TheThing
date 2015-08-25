//Vars init
    var worldW = 5000;
    var worldG = 250;
//Main Game State
    //object literal with functions being defined as properties.
    var play = {
        preload : function(){
        },
        create : function (){
                game.stage.smoothed = false;
            //Init phys system
                game.physics.startSystem(Phaser.Physics.ARCADE);
            //Arrow key Hander
                cursors = game.input.keyboard.createCursorKeys();
            //Camera
                game.world.setBounds(0, 0, worldW, 2048);
                game.physics.arcade.enable(plane);
                game.physics.arcade.enable(this.ground);
                this.ground.body.allowGravity = false;
                this.ground.body.immovable = true;
                /*
                plane.inputEnabled = true;
                plane.input.start(0, true);
                plane.events.onInputDown.add(planeMTHDS.set);
                plane.events.onInputUp.add(planeMTHDS.launcher);
                */
        },
        update : function (){
            game.stage.backgroundColor = '#0069be';
            //Input Management
            /*
            planeMTHDS.launcherUpdate();
            planeMTHDS.influence();
            */
            game.physics.arcade.gravity.y = worldG;
            worldG = game.physics.arcade.gravity.y;
        }, render : function (){
            game.debug.bodyInfo(plane, 12 ,24);
            game.debug.cameraInfo(game.camera, 12 , 200);
        }
    };
//Plane Methods init
    var planeMTHDS = {
        set : function (plane, pointer){
            if(!launched){
                catchFlag = true;
                plane.body.moves = false;
                plane.body.gravity.set(0);
                plane.body.velocity.set(0);
                arrow.reset(plane.x, plane.y);
                analog.reset(plane.x, plane.y);
                arrow.alpha = 1;
                analog.alpha = 1;
            }
        },
        launcher : function (){
            var launchForce = 8;
            if (catchFlag)
            {
                catchFlag = false;
                launched = true;
                arrow.alpha = 0;
                analog.alpha = 0;
                var Xvector = (arrow.x - plane.x) * launchForce;
                var Yvector = (arrow.y - plane.y) * launchForce;
                plane.body.moves = true;
                plane.body.velocity.setTo(Xvector, Yvector);
                plane.body.collideWorldBounds = true;
                plane.body.allowGravity = true;
                //plane.body.drag.set(100, 50);
                plane.body.moves = true;
            }
        },
        influence : function () {
            var angle = plane.angle;
            var deg;
            if(launched){
                var crntV_Y = plane.body.velocity.x;
                var crntV_X = plane.body.velocity.y;
                if(cursors.right.isDown){
                    plane.body.velocity.x += 8;
                    plane.body.velocity.y += 5;
                } else if(cursors.left.isDown){
                    plane.body.velocity.y -= 8;
                    plane.body.velocity.x -= 5;
                } else {
                    plane.body.velocity.x = plane.body.velocity.x;
                    plane.body.velocity.y = plane.body.velocity.y;
                }
            }
        },
        collisionHandler : function(){
            if(!catchFlag){
                /*
                plane.anchor.setTo(0.5, 0.5);
                catchFlag = false;
                launched = true;
                var a = plane;
                plane.reset(OGpos_PlaneX, OGpos_PlaneY);
                a.body.allowGravity = false;
                a.body.moves = true;
                a.body.velocity.setTo(0, 0);
                a.angle = 0;
                */
                plane.anchor.setTo(0.5, 0.5);
                catchFlag = false;
                launched = true;
                var a = plane;
                a.body.moves = true;
                a.body.velocity.setTo(0, 0);
                a.angle = 0;
                flag.reset(plane.x,plane.y-250);
                flag.alpha = 1;
            }
        }, launcherUpdate : function(){
            arrow.rotation = game.physics.arcade.angleBetween(plane,arrow);
            degTheta = (arrow.rotation * 180)/Math.PI;
            plane.anchor.setTo(1, 1);
            //  Track the player sprite to the mouse
            if (catchFlag) {
                theta = game.physics.arcade.angleToPointer(arrow);
                distance = game.physics.arcade.distanceToPointer(arrow);
                analog.rotation = arrow.rotation + Math.PI/2;
                //if(degTheta > 91 || degTheta < -91){
                    // Govern the distance the sprite is dragged away from launch post
                    if (distance > 50) {
                        distance = 50;
                        adjacentX = Math.cos(theta) * distance;
                        oppositeY = Math.sin(theta) * distance;
                        plane.x = OGpos_PlaneX + adjacentX;
                        plane.y = OGpos_PlaneY + oppositeY;
                        analog.height = distance;
                    } else {
                        plane.x = game.input.activePointer.worldX;
                        plane.y = game.input.activePointer.worldY;
                        analog.height = distance;
                    }
                //}
                plane.angle = degTheta;
                arrow.alpha = 1;
                analog.alpha = 1;
                launchVelocity = analog.height;
                /*
                theta = game.physics.arcade.angleToPointer(arrow);
                distance = game.physics.arcade.distanceToPointer(arrow);
                analog.rotation = arrow.rotation + Math.PI/2;
                //if(degTheta > 91 || degTheta < -91){
                    // Govern the distance the sprite is dragged away from launch post
                    if (distance > 50) {
                        distance = 50;
                        adjacentX = Math.cos(theta) * distance;
                        oppositeY = Math.sin(theta) * distance;
                        plane.x = OGpos_PlaneX + adjacentX;
                        plane.y = OGpos_PlaneY + oppositeY;
                        analog.height = distance;
                    } else {
                        plane.x = game.input.activePointer.worldX;
                        plane.y = game.input.activePointer.worldY;
                        analog.height = distance;
                    }
                //}
                plane.angle = degTheta;
                arrow.alpha = 1;
                analog.alpha = 1;
                launchVelocity = analog.height;
                */
            }
            if (launched) {
                plane.anchor.setTo(0.5, 0.5);
            }
        }
    };
