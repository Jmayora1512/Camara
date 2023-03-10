var app={
	inicio: function(){
		this.iniciaFastClick();
		this.iniciaBotones();
	},
	
	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},

	iniciaBotones: function() {
		var buttonAction = document.querySelector('#buttonaction');
		buttonAction.addEventListener('click', this.tomarFoto);

		var filterButtons = document.querySelectorAll('.button-filter');
		filterButtons[0].addEventListener('click', function() {
			app.aplicaFiltro('gray');
		});
		filterButtons[1].addEventListener('click', function() {
			app.aplicaFiltro('negative');
		});		
		filterButtons[2].addEventListener('click', function() {
			app.aplicaFiltro('sepia');
		});
	},

	tomarFoto: function(){
		var opciones = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight: 300,
			correctOrientation: true
		};
		navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
	},

	fotoTomada: function(imageURI){
		var image = document.querySelector('#foto');
		image.src = imageURI
	},

	errorAlTomarFoto: function(message)	{
		console.log('Fallo al tomar la foto o toma cancelada: ' + message);
	},

	aplicaFiltro: function(filterName) {
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		imageData = context.getImageData(0, 0, canvas.width, canvas.height);

		effects[filterName] (imageData.data);

		context.putImageData(imageData, 0, 0);
	}

};

var imageData;
if ('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	},false);
}



