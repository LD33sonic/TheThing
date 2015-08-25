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
				text = this.add.text(this.world.centerX,this.world.centerY, menu.play, style);
		text.anchor.set(0.5);
		text.inputEnabled = true;
	  text.events.onInputDown.add((function(){this.state.start('game', Main.Game)}), this);
	}
};
