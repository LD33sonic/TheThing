Main.Game = function(game){

};

Main.Game.prototype = {
	preload: function () {

	},
	create: function() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.player = this.add.sprite(model.player.startPos.x,model.player.startPos.y(this.world.height),'player');
		this.physics.enable(this.player,Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = model.player.bounce;
		this.player.body.gravity.y = model.player.gravity;

		this.ground = this.add.sprite(0,model.world.ground.pos.y(this),'player');
		this.physics.arcade.enable(this.ground);
		this.ground.height = model.world.ground.height;
		this.ground.width = model.world.ground.width(this);
		this.ground.body.allowGravity = false;
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
		startPos : {
			x : 100,
			y : (function(height){return height - 100})
		},
		gravity : 200,
		bounce : 0.35,
		speed : 20
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
		movement : (function(game){
			if(game.cursors.right.isDown){game.player.body.velocity.x += model.player.speed}
			if(game.cursors.left.isDown){game.player.body.velocity.x -= model.player.speed}
			if(game.cursors.up.isDown){game.player.body.velocity.y -= model.player.speed}
			if(game.cursors.down.isDown){game.player.body.velocity.y += model.player.speed}
		})
	},
	world : {}
}
