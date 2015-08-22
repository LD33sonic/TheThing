var Main = {};

Main.Boot = function(game){};

Main.Boot.prototype = {
	preload: function () {
		//this.load.image('preloadBar', '');
		/*
		this.load.image('preloadBar', 'assets/loaderBar.png');
		this.load.image('titleImage', 'assets/titleIMG.png');
		this.load.image('background', 'assets/environment.png');
		this.load.image('Character', 'assets/plane.png');
		*/
		//this.load.image('player', 'assets/plane.png');
	},
	create: function () {
		// this.game.stage.enableOrientationCheck(true, false, 'orientation');
		this.input.maxPointers = 1;
		this.input.addPointer();
		this.input.keyboard.createCursorKeys();
		this.state.start('preloader', Main.Preloader);
	}
};
