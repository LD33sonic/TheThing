Main.Preloader = function(game){};
Main.Preloader.prototype = {
	preload: function() {
		var style = { font: "12px Arial", fill: "#ffffff", align: "center" },
				text = 'Loading...';
				textContainer = this.add.text(this.world.centerX * 0.5,this.world.centerY * 0.5, text, style);
		this.load.image('player', 'assets/sprites/player/player.png');
		this.onLoadComplete();
	},
	create: function() {
	},
	update: function() {

  },
  onLoadComplete: function() {
		this.state.start('startMenu', Main.StartMenu);
  }
};
