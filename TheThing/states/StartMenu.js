Main.StartMenu = function(game){
	/* Global Variables for Data Persistence */
	/*
	game.global = {};
	game.global.playerIGN = '';
	*/
};
Main.StartMenu.prototype = {
	preload: function () {},
	create: function () {
		var style = { font: "12px Arial", fill: "#ffffff", align: "center" },
				menu = {
					play : 'Evolve',
					score : '',
				},
				text = this.add.text(this.world.centerX * 0.5,this.world.centerY * 0.5, menu.play, style);
		text.anchor.set(0.5);
		text.inputEnabled = true;
		text.events.onInputDown.add(action.play, this);
	},
	update: function() {

	},
	startGame: function (game) {
	}
};

var action = {
	play : function(item){
		this.state.start('game', Main.Game);
	}
};
