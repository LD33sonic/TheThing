var spawn_location = {};
spawn_location.x = 0;
spawn_location.y = 0;



Main.Game = function(game){
	//this.game = game;
	var player = {};
	//gameGlobal.world.centerX
};

Main.Game.prototype = {
	preload: function () {
		cleanUp.preload(this);
		world.load.preload(world.region.home,this);
		Player.preload(this);
		UI.preload(this);
	},
	create: function() {
		world.load.create(world.region.home,this);
		Player.create(this);
		UI.create(this);
	},
	update: function() {
		Player.update(this);
		UI.update(this);
	},
	render: function(){
		//this.game.debug.body(player);
		//Generating Camera Deadzone
		/*
		var offset = 50,
				rect = {
					width  : $('.landing-container').width() - offset * 2,
					height : $('.landing-container').height() - offset * 2
				}
		var rect = new Phaser.Rectangle(offset,offset, rect.width,rect.height);
		this.game.debug.geom(rect, 'rgba(255,0,0,1)' ) ;
		*/
	}
};

var cleanUp = {
	preload : function(game){
		$('.form-container').html('');
	}
};

var Player = {
		IGN : '',
		Level : 0,
		Speed : 500,
		initPos : [,],
		SpriteScale : 1.5,
		Sprite  : '',
		preload : function (game){
			game.load.image('player',this.Sprite);
		},
		create : function(game){
			this.initPos = new Array(game.world.centerX,game.world.centerY);
			player = game.add.sprite(this.initPos[0],this.initPos[1], 'player');
			player.anchor.setTo(0.5);
			player.scale.set(this.SpriteScale,this.SpriteScale);
			// Physics
			game.physics.arcade.enable(player);
			player.body.collideWorldBounds = true;
			// Input
			game.cursors = game.input.keyboard.createCursorKeys();
			// Camera
			game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
			/*
			var offset = 125,
					rect = {
						width  : $('.landing-container').width() - offset * 2,
						height : $('.landing-container').height() - offset * 2
					}
			game.camera.deadzone = new Phaser.Rectangle(offset,offset, rect.width,rect.height);
			*/
		},
		update : function(game){
			this.Movement(game);
		},
		Movement : function(game){
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;

			if(game.cursors.up.isDown){
				player.body.velocity.y -= this.Speed;
			} else if(game.cursors.down.isDown){
				player.body.velocity.y += this.Speed;
			}
			if(game.cursors.left.isDown){
				player.body.velocity.x -= this.Speed;
			} else if(game.cursors.right.isDown){
				player.body.velocity.x += this.Speed;
			}
    },
		Combat : function(){

    },
		Health : function(){

    },
		Reset : function(){

    }
	};

var UI = {
	preload : function(game){
	},
	create : function (game){
		this.Interface.create(game);
	},
	update : function (game){
		this.Interface.update(game);
	},
	Interface : {
		create : function (game){
			UI.Modules.player.create(game);
			UI.Modules.chat.create();
		},
		update : function(game){
			UI.Modules.player.update(game);
		}
	},
	Modules : {
		companion : {
			create : function (game) {

			},
			update : function (game){

			},
			IGN : '',
			inventory : function (game) {

			},
			level : '',
			health : '',
			stamina : '',
			image : ''
		},
		player : {
			create : function (game) {
				this.IGN.create(game);
			},
			update : function (game){
				this.IGN.update(game);
			},
			IGN : {
				create : function (game) {
					var IGNpos = {
							x : player.x + 0,
							y : player.y - 25
						},
						style = { font: "12px Arial", fill: "#ff0044", align: "center" },
						text = game.game.global.playerIGN;
					Player.IGN = game.add.text(IGNpos.x,IGNpos.y, text, style);
					Player.IGN.anchor.set(0.5);
				},
				update : function (game){
					var IGNpos = {
						x : player.x + 0,
						y : player.y - 40
					};
					Player.IGN.position.x = IGNpos.x;
					Player.IGN.position.y = IGNpos.y;
				}
			},
			inventory : '',
			level : '',
			health : '',
			stamina : '',
			image : ''
		},
		map : {
			preload : function (game) {

			},
			create : function (game) {

			},
			update : function (game){

			},
			minimap : ''
		},
		chat : {
			create : function () {
				this.textbox.create();
			},
			update : function (game){

			},
			textbox : {
				create : function(){
					var template = "<input class='form-control chat-box' type='text'/>";
					$('.chat-container').html(template);
				}
			}
		}
	}
};

var monsters = {
	pickachu : {
		//sprite : 'assets/monster/pickachu.jpg',
		sprite : '',
		name : 'pickachu',
		rarity : 0.2,
		respawnRate : '60',
		region : 'home'
	},
	agumon : {
		//sprite : 'assets/monster/agumon.jpg',
		sprite : '',
		name : 'agumon',
		rarity : 0.2,
		respawnRate : '60',
		region : 'home'
	}
};

var world = {
	region : {
		home : {
			map : {
				assets : {
					sprite : 'assets/map/mapTEST.jpg'
				}
			},
			mob : {
				group_1 : {
					enemy_1 : {
						count : 8,
						respawnRate : 10,
						//game.rnd.integerInRange(100, 200)
						spawn : [location.x,location.y],
						//location : [0,0],
						monster : monsters.pickachu
					}
				}
			},
			NPC : {
				location : {

				},
				sprite : {

				}
			}
		}
	},
	load : {
		preload : function (region,game){
			world.monsterSpawn.preload(region,game);
			game.load.image('background', region.map.assets.sprite);
		},
		create : function(region,game){
			//game.world.setBounds(0, 0, 4096, 4096);
			game.stage.smoothed = false;
			game.world.setBounds(0, 0, 256, 256);
			game.add.sprite(0, 0, 'background');

			world.monsterSpawn.create(region,game);
		},
		update : function(){

		}
	},
	monsterSpawn : {
		preload : function (region,game){
			$.each(region.mob, function(key, value) {
				$.each(value, function(key, value) {
					for(var i = 0, len = value.count;i < len; i++){
						game.load.image(value.monster.name +'_'+ i, value.monster.sprite);
					}
				});
			});
		},
		create : function (region,game){
			$.each(region.mob, function(key, value) {
				$.each(value, function(key, value) {
					for(var i = 0, len = value.count;i < len; i++){
						//game.add.sprite(value.spawn[0],value.spawn[1], value.monster.name +'_'+ i);
						//game.add.sprite(value.location[0],value.location[1], value.monster.name +'_'+ i);
						//game.add.sprite(0,0, value.monster.name +'_'+ i);
					}
				});
			});
		}
	}
};
