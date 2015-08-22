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

<<<<<<< HEAD
var menu = {
	Set : function(game){
		var template = "<div class='user-form'>"
			+  "<input class='form-control ign-input' type='text' maxlength='15' placeholder='Nickname'/>"
		+  "<br />"
			+  "<input class='form-control ip-input' type='text' maxlength='15'  placeholder='IP address'/>"
		+  "<br />"
		+  "<div class='form-group row margin-none'>"
			+  "<div class='col-xs-8'>"
				+  "<input type='submit' class='btn btn-primary btn-play width-full' value='Play'/>"
			+  "</div>"
			+  "<div class='col-xs-4'>"
				+  "<button class='btn btn-info btn-settings'><i class='glyphicon glyphicon-cog'></i></button>"
			+  "</div>";
		+  "</div>";

	/*	$('.form-container').html(template);

	Form Inputs
		$(document).ready(function(){
			$(document).on('click','.btn-play',function(){
				//game.state.states['game'].player.IGN = $('.ign-input').val();;
				var ign = '';
				if($('.ign-input').val() === ''){
					ign = 'no name avenger';
				} else {
					ign = $('.ign-input').val();
				}
				game.game.global.playerIGN = ign;
				game.state.start('game', Main.Game);
			});
		});
	},
	nameGenerator : function(){
		 Default name gen for the lulz */
=======
var action = {
	play : function(item){
		this.state.start('game', Main.Game);
>>>>>>> origin/master
	}
};
