Main.Preloader = function(game){};
Main.Preloader.prototype = {
	preload: function() {
		var style = { font: "12px Arial", fill: "#ff0044", align: "center" },
				text = 'Loading...',
		textContainer = this.add.text(this.world.centerX,this.world.centerY, text, style);
		textContainer.anchor.set(0.5);
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5,2);
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
