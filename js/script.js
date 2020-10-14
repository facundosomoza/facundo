const UI_INDEX = 0;
const UI_MIS_GIFOS =1;
const UI_CREAR_GIFOS =2;
const UI_CAPTURA_GIFO =3;
const UI_INDEX_CON_TRENDS_Y_SUG = 4;

let btnDay = document.getElementById ("flechaday");
btnDay.addEventListener("click", cambiarAEstiloSaylorDay);

let btnNight = document.getElementById ("flechanight");
btnNight.addEventListener("click", cambiarAEstiloSaylorNight);

let logo = document.getElementById ("img-logo");

let imgFlechita = document.getElementById ("img-flechita");

let cajaBusqueda = document.getElementById ("texto-buscador");

cajaBusqueda.addEventListener("keyup", actualizarBotonBusqueda);

let imgBtnBuscar = document.getElementById("img-btn-buscar");

let botonCamara = document.getElementById("btn-camara");
let botonSubir = document.getElementById("btn-subir");

let contenedorSubiendo = document.getElementById("contenedor-subiendo");



function actualizarBotonBusqueda(event){
	if (cajaBusqueda.value === ""){
		botonBuscar.classList.replace ("boton-habilitado","boton-deshabilitado");
		imgBtnBuscar.classList.replace ("img-btn-buscar-habilitado","img-btn-buscar-deshabilitado");
	}else{
		botonBuscar.classList.replace ("boton-deshabilitado","boton-habilitado");
		imgBtnBuscar.classList.replace("img-btn-buscar-deshabilitado","img-btn-buscar-habilitado");
	}
}

function cambiarAEstiloSaylorDay(){
	cambiarCSS("saylor_day");

	logo.src = "images/gifOF_logo.png";

	imgFlechita.src = "images/dropdown.svg";
}
function cambiarAEstiloSaylorNight(){
	cambiarCSS("saylor_night");
	
	logo.src = "images/gifOF_logo_dark.png";

	imgFlechita.src = "images/forward.svg";
}

function cambiarCSS(nombreEstilo){
	let estiloCSS = document.getElementById("estiloCss");

	estiloCSS.href = "css/" + nombreEstilo + ".css";
	cerrarTema();
}


let seccionActiva = UI_INDEX;

let imgLogo = document.getElementById ("img-logo");

imgLogo.addEventListener ("click", cambiarUIindexConTrendsYSug);

let btnCrearGifo = document.getElementById ("btn-crear-gifo");

btnCrearGifo.addEventListener ("click", cambiarUICrearGifos);

let btnMisGifos = document.getElementById ("btn-mis-gifos");

btnMisGifos.addEventListener("click", cambiarUImisGifos);

let btnCancelar = document.getElementById ("btn-cancelar");

btnCancelar.addEventListener ("click", cambiarUIindexConTrendsYSug);

let flechitaAtras = document.getElementById ("flechaatras");

flechitaAtras.addEventListener("click", function(){
	
													if (seccionActiva == UI_MIS_GIFOS){
														cambiarUIindex();

													}else if (seccionActiva==UI_CAPTURA_GIFO){
														cambiarUImisGifos();
													}

													
});



let btnComenzar = document.getElementById ("btn-comenzar");
btnComenzar.addEventListener("click", cambiarUICapturaGifos)



function cambiarUICapturaGifos(){
	cambiarUI(UI_CAPTURA_GIFO);
}

function cambiarUICrearGifos(){
	cambiarUI(UI_CREAR_GIFOS);
}

function cambiarUImisGifos(){
	
	if (seccionActiva != UI_MIS_GIFOS){
		cambiarUI (UI_MIS_GIFOS);
	}
}



function cargarMisGifos(){
	var divListadoGifos = document.getElementById ("contenido-listado-gifs");

	document.querySelector("#listado-gifs h2").innerHTML = "Mis Guifos";

	divListadoGifos.innerHTML = "";

	var gifSubidos = JSON.parse (localStorage.getItem("gifSubidos"));

	var apiKey = "oR6GC6Gs6xLU5zQllmTN5ypKLnHo9JQM"; 

	if (gifSubidos!=null){
		gifSubidos.forEach (async function (idGif){

		var urlGif = "https://api.giphy.com/v1/gifs/" + idGif + "?api_key=" + apiKey;

		var response = await fetch (urlGif);
		var gifJson  = await response.json();

		var contenedorGifs = document.getElementById ("contenido-listado-gifs");

		contenedorGifs.innerHTML += "<img src=\""+gifJson.data.images.fixed_height.url+"\">";
	
		}

		);
		}
	}
function cambiarUIindex(){
	cambiarUI(UI_INDEX);
}

function cambiarUIindexConTrendsYSug(){
	let cajaBusqueda = document.getElementById("texto-buscador");
	cajaBusqueda.value = "";
	
	cambiarUI(UI_INDEX_CON_TRENDS_Y_SUG);
}


function cambiarUI (modo){

	let divMensaje      = document.getElementById ("mensaje-crear-gifo");
	let barraBusqueda   = document.getElementById ("barra-busqueda");
	let listadoTrending = document.getElementById ("listado-trending");
	let listadoSugerencias = document.getElementById ("listado-sugerencias");
	let divListadoGifos = document.getElementById ("contenido-listado-gifs");
	let divContenedorCaptura = document.getElementById("contenedor-captura");
	let flechaatras = document.getElementById ("flechaatras");
	let flechita = document.getElementById ("flechita"); 
	let temas = document.getElementById ("temas");
	let contenedorResultado = document.getElementById("contenedor-resultado")
	
	let contenedorListadoGifos = document.getElementById("listado-gifs");

	seccionActiva = modo;


	if (modo == UI_INDEX){

		cambiarUI(UI_INDEX_CON_TRENDS_Y_SUG);

		videoHtml()
	}
	else if (modo == UI_INDEX_CON_TRENDS_Y_SUG){
		divMensaje.classList.add("hidden");
		barraBusqueda.classList.remove("hidden");
		listadoTrending.classList.remove("hidden");
		listadoSugerencias.classList.remove("hidden");
		flechaatras.classList.add ("hidden");
		btnCrearGifo.classList.remove("hidden");
		temas.classList.remove("hidden");
		btnMisGifos.classList.remove("hidden");
		divContenedorCaptura.classList.add("hidden");
		btnMisGifos.classList.replace("link-deshabilitado", "link-habilitado");
		flechita.classList.remove("hidden");
		contenedorResultado.classList.add("hidden");
		
		divListadoGifos.innerHTML="";

		contenedorListadoGifos.classList.add("hidden");


		
	}






	else if (modo == UI_MIS_GIFOS){
		divMensaje.classList.add("hidden");
		barraBusqueda.classList.add("hidden");
		listadoTrending.classList.add("hidden");
		listadoSugerencias.classList.add("hidden");
		divListadoGifos.classList.remove("hidden");
		divContenedorCaptura.classList.add("hidden");
		flechaatras.classList.remove ("hidden");
		btnCrearGifo.classList.remove("hidden");
		temas.classList.remove("hidden");
		btnMisGifos.classList.remove("hidden");
		btnMisGifos.classList.replace("link-habilitado", "link-deshabilitado");
		contenedorListadoGifos.classList.remove("hidden");
		contenedorResultado.classList.add("hidden");
		flechita.classList.remove("hidden");
		contenedorSubiendo.classList.add("hidden");
		
		cargarMisGifos();
	}
	else if (modo==UI_CREAR_GIFOS){
		
		cambiarUI(UI_MIS_GIFOS);
		btnCrearGifo.classList.add("hidden");
		temas.classList.add("hidden");
		btnMisGifos.classList.add("hidden");
		divMensaje.classList.remove("hidden");
		barraBusqueda.classList.add("hidden");
		listadoTrending.classList.add("hidden");
		listadoSugerencias.classList.add("hidden");
		flechaatras.classList.remove ("hidden");
		flechita.classList.add("hidden");
		contenedorListadoGifos.classList.remove("hidden");
	}
	else if (modo==UI_CAPTURA_GIFO){
		divMensaje.classList.add("hidden");
		flechaatras.classList.remove ("hidden");
		btnMisGifos.classList.remove("hidden");
		divListadoGifos.classList.add("hidden");
		temas.classList.add("hidden");
		btnCrearGifo.classList.add("hidden");
		btnMisGifos.classList.add ("hidden");

		
		flechita.classList.add("hidden");

		divContenedorCaptura.classList.remove("hidden");

		contenedorListadoGifos.classList.add("hidden");		

		botonCamara.innerHTML="Capturar";
		botonCamara.classList.replace("btn-grabar","btn-normal");
		botonSubir.classList.add("hidden");
		
		getStreamAndRecord();
	}
}
function videoHtml (){

	var cajaBusqueda = document.getElementById("texto-buscador");

	var searchTerm = cajaBusqueda.value;

	if (searchTerm != ""){
		buscarGifs(searchTerm);
		contenedorListadoGifos.classList.remove("hidden");
	}
	else{
		document.getElementById("listado-gifs").classList.add("hidden");
	}



	
}

function buscarGifs( terminoBuscado ){

	var gifUrl         = "https://api.giphy.com/v1/gifs/search";
	var apiKey         = "j58FtF7faNMlQAH2FS68ygzvuB27yCRX";
	var url = gifUrl + "?api_key=" + apiKey + "&q=" + terminoBuscado;

	fetch( url ).then(
					function( response ){
						return response.json();
					}
				).then(
					function( datosEnJson ){
						let listadoSugerencias = document.getElementById ("listado-sugerencias");
						let listadoTrending=document.getElementById ("listado-trending");
						listadoSugerencias.classList.add("hidden");
						listadoTrending.classList.add("hidden");
						
						document.getElementById("listado-gifs").classList.remove("hidden");

						document.querySelector("#listado-gifs h2").innerHTML = terminoBuscado+" (Resultados)";

						document.getElementById("contenido-listado-gifs").innerHTML = getHTML(datosEnJson);

						let gifosEnListado=document.getElementsByClassName("gifoListado");						
						
						for (let i=0; i< gifosEnListado.length; i++){
							gifosEnListado[i].addEventListener("mouseenter",onEnterGifoListado);
							gifosEnListado[i].addEventListener("mouseleave",onLeaveGifoListado);
						}
					}
				).catch(
					function (error){
						alert ("Error al obtener los datos");
					}

				)
}
function onEnterGifoListado(event){
	event.target.querySelector("div").classList.remove("hidden");

}
function onLeaveGifoListado(event){
	event.target.querySelector("div").classList.add("hidden");

}

async function buscarSugerencias (cantSugerencias){
	let gifUrl = "https://api.giphy.com/v1/gifs/random";
	let apiKey = "j58FtF7faNMlQAH2FS68ygzvuB27yCRX";
	let tags = ["messi", "batman", "bocajuniors", "lutherking"];
	let url = gifUrl + "?api_key=" + apiKey;

	let contenidoSugerencias = document.getElementById("contenido-listado-sugerencias");

	for(let i=0;i<4;i++){
		let response    = await fetch( url + "&tag="+ tags[i] );
		let datosEnJson = await response.json();

		let clasesRecuadroImg="recuadro-img";
		if (i==0){
			clasesRecuadroImg +=" ml-0";
		}
		else if (i==3){
			clasesRecuadroImg +=" mr-0";
		}
		
		contenidoSugerencias.innerHTML += `<div class="${clasesRecuadroImg}">
												<div class="encabezado-img">
													#${tags[i]}
													<img src="images/button3.svg">
												</div>
												<img src="${datosEnJson.data.images.fixed_height.url}">
										   		<button id="btn-${tags[i]}" data-tag="${tags[i]}" class="btn-ver-mas">Ver más...</button>
											</div>`;
		
	}
	for(let i=0;i<4;i++){
	document.getElementById(`btn-${tags[i]}`).addEventListener(`click`,verMas);
			
		
	
	}
}
function verMas(event){
	cajaBusqueda.value = event.target.getAttribute ("data-tag");

	videoHtml();

}

async function buscarTrending(cantTrending){

	var gifUrl         = "https://api.giphy.com/v1/gifs/trending";
	var apiKey         = "j58FtF7faNMlQAH2FS68ygzvuB27yCRX";
	var url = gifUrl + "?api_key=" + apiKey + "&limit="+cantTrending;

	var response    = await fetch( url );
	var datosEnJson = await response.json();
	console.log ( datosEnJson);
	
	document.getElementById("contenido-listado-trending").innerHTML = getHTML(datosEnJson);

}

function getHTML(datosEnJson){
		var html = "";

		for(k=0; k<datosEnJson.data.length; k++){
			html += `<div class="gifoListado">
			<img src ="${datosEnJson.data[k].images.fixed_height.url}"/>
			<div class="hidden">${datosEnJson.data[k].title}</div>
			</div>`;
		}
		return html;
	}

var botonBuscar = document.getElementById("btn-buscar");

botonBuscar.addEventListener("click", videoHtml);

/*var cajaTexto = document.getElementById("texto-buscado");

cajaTexto.addEventListener ("keyup", buscarGifs);*/

buscarTrending(10);

let flechis = document.getElementById ("flechita");
let flechasdos=document.getElementById ("flechasdos")    
flechis.addEventListener ("click", cambiarTema);
//flechis.addEventListener ("blur", cerrarTema);

function cambiarTema (){ 
    flechasdos.classList.toggle("hidden");
}
function cerrarTema(){
	flechasdos.classList.add("hidden");

}
buscarSugerencias();