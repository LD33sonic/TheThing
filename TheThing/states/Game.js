Main.Game = function(game){

};

Main.Game.prototype = {
	preload: function () {

	},
	create: function() {
		var player = this.add.sprite(200,200,'player')
	},
	update: function() {

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
	player : {},
	world : {}
}

var controller = {
	ui : {},
	creatures : {},
	player : {},
	world : {}
}
