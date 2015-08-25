Main.Game = function(game){

};

Main.Game.prototype = {
	preload: function () {

	},
	create: function() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.player = this.add.sprite(model.player.startPos.x,model.player.startPos.y(this.world.height),'player');
		this.physics.enable(this.player,Phaser.Physics.ARCADE);
		this.player.height = model.player.height;
		this.player.width = model.player.width;
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = model.player.bounce;
		this.player.body.gravity.y = model.player.gravity;
		this.player.body.drag.setTo(model.player.drag,0);
		this.player.body.maxVelocity.setTo(model.player.maxSpeed,model.player.maxSpeed); //x,y

		this.ground = this.add.sprite(0,model.world.ground.pos.y(this),'player');
		this.physics.arcade.enable(this.ground);
		this.ground.height = model.world.ground.height;
		this.ground.width = model.world.ground.width(this);
		this.ground.body.allowGravity = false;
		this.ground.static = true;
		this.ground.body.immovable = true;
	},
	update: function() {
		controller.player.collisions(this);
		controller.player.movement(this);
	},
	render: function(){

	}
};

var view = {
	ui : {},
	creatures : {},
	player : {},
	world : {}
}

var model = {
	ui : {},
	creatures : {},
	player : {
		height : 20,
		width : 20,
		startPos : {
			x : 100,
			y : (function(height){return height - 100})
		},
		gravity : 200,
		bounce : 0.35,
		jump : 100,
		stompForce : 500,
		airVelocityXBuffer : 4,
		drag : 800, //pixels/second
		acceleration : 1000, //pixels/second
		maxSpeed : 200, //pixels/second
		highJumpCounter : 0,
		highJumpCounterLimit : 50,
		ableToJump : false,
		bouncing : false,
		highJumpBaseBoost : 1.4
	},
	world : {
		ground : {
			height : 25,
			width : (function(game){return game.world.width}),
			pos : {
				x : 0,
				y : (function(game){return game.world.height - model.world.ground.height})
			}
		}
	}
}

var controller = {
	ui : {},
	creatures : {},
	player : {
		collisions : (function(game){
			game.physics.arcade.collide(game.player,game.ground);
		}),
		jump : (function(player){
			player.body.velocity.y = -(model.player.jump + model.player.highJumpCounter * model.player.highJumpBaseBoost);
			model.player.highJumpCounter = 0;
			model.player.ableToJump = false;
		}),
		movement : (function(game){
			if(game.player.body.touching.down){
				model.player.ableToJump = true;
				//Right
				if(game.cursors.right.isDown){
					game.player.body.acceleration.x = model.player.acceleration;
				} else if(game.cursors.left.isDown){
					game.player.body.acceleration.x = -model.player.acceleration;
				} else {
					game.player.body.acceleration.x = 0;
				}
				//Jump
				if(game.cursors.up.isDown){
				  game.player.body.velocity.y = -model.player.jump;
				}
				//Boost Jump
				if(game.cursors.down.isDown){
					model.player.highJumpCounter++;
					if(model.player.highJumpCounter >= model.player.highJumpCounterLimit){
						controller.player.jump(game.player);
					}
				}
			} else {
				//Stomp
				if(Math.floor(game.player.body.velocity.y / 100) >= 0 && game.cursors.down.isDown){
					game.player.body.velocity.y = game.player.body.velocity.y + (model.player.acceleration * model.player.stompForce);
				}
				//Buffered Velocity X
				if(game.cursors.right.isDown){
					game.player.body.acceleration.x = model.player.acceleration / model.player.airVelocityXBuffer;
				} else if(game.cursors.left.isDown){
					game.player.body.acceleration.x = -model.player.acceleration / model.player.airVelocityXBuffer;
				} else {
					game.player.body.acceleration.x = 0;
				}
			}
			/*NORMALIZE BOUNCING WITH BOOL*/
		})
	},
	world : {}
}
