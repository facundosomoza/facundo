let apiKey = "oR6GC6Gs6xLU5zQllmTN5ypKLnHo9JQM";

var recorder;


let contenedorResultado = document.getElementById('contenedor-resultado');

let mensajeSubiendo   = document.getElementById('contenedor-subiendo');

botonCamara.addEventListener ("click", iniciarCaptura);

botonSubir.addEventListener ("click", subirGuifo);

let btnCerrarResultado = document.getElementById("btn-cerrar-resultado");

btnCerrarResultado.addEventListener("click", cerrarRecuadroResultado);

let imgCerrarResultadoExito=document.getElementById("img-cerrar-exito");
imgCerrarResultadoExito.addEventListener("click",cerrarRecuadroResultado);

let cancelUpload = false;

let btnCancelUpload = document.getElementById("btn-inferior");

let btnCancelarSubida = document.getElementById("btn-cancelar-subida");

btnCancelUpload.addEventListener("click", cancelarSubida);

btnCancelarSubida.addEventListener("click", cancelarSubida);

function cancelarSubida(){
    cancelUpload = true;
    cambiarUImisGifos();

}
function cerrarRecuadroResultado(){
    contenedorResultado.classList.add("hidden");
    cambiarUImisGifos();
}

function getStreamAndRecord(){

    navigator.mediaDevices.getUserMedia
    (   {
        audio: false,
        video:  {
            height:{min:480}
                }
        }
    )
    .then(
        function(stream){
            var video = document.getElementById("video-gifos");
            video.srcObject = stream;
            video.play();

            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log('started')
                },
                });
        }
    )
    .catch(
        function(error)
                {
            console.log (error);
                }
            )
}
function iniciarCaptura (){
    if (recorder.state != "recording")
    {
        recorder.startRecording();
        botonCamara.innerHTML = "Listo";
        botonCamara.classList.replace ("btn-normal", "btn-grabar");
        botonSubir.classList.add("hidden");

        document.getElementById("titulo-ch").innerHTML="Capturando tu Guifo";
    }
    else{
        recorder.stopRecording(terminarLaGrabacion);
        botonCamara.innerHTML = "Repetir Captura";
        botonCamara.classList.replace ("btn-grabar", "btn-normal");
        botonSubir.classList.remove ("hidden");
    }
   
}

function terminarLaGrabacion(){
    console.log ("Termino la grabacion");
};
function subirGuifo (){

    let contenedorCaptura = document.getElementById('contenedor-captura');

    mensajeSubiendo.classList.remove('hidden');
    contenedorCaptura.classList.add('hidden');
   
    let form = new FormData();
   
    form.append("file", recorder.getBlob(), "myGif2.gif");
    form.append("api_key", apiKey);
    form.append("tags", "batman, comics, chistes, memes");
   
    var urlSubida = "https://upload.giphy.com/v1/gifs";

    var params = {
            method: "POST",
            body: form,

                };

    fetch (urlSubida, params).then(
        function (response){
            return response.json();
        }
    ).then(
        function (dataJson){
            console.log(dataJson);

            if(!cancelUpload && dataJson.meta.msg == "OK"){
               
                mostrarResultadoSubida( "Guifo creado con éxito" );

                var gifosSubidos;

                if (localStorage.getItem("gifSubidos")){
                    gifosSubidos = JSON.parse(localStorage.getItem("gifSubidos"));
                }else{
                    gifosSubidos = new Array();
                }
               
                gifosSubidos.push(dataJson.data.id);

                localStorage.setItem("gifSubidos",JSON.stringify(gifosSubidos));

                mostrarPreview( dataJson.data.id );
               
            }

            else{

                if (!cancelUpload){
                alert("Error al subir el GIF");
                contenedorResultado.classList.add("hidden");
                cambiarUImisGifos();
                }
            }
        }
    ).catch(
        function (error){
            alert("Error al subir el GIF");
            contenedorResultado.classList.add("hidden");
            cambiarUImisGifos();
        }
    )
}

function mostrarResultadoSubida( mensaje ){
    let mensajeResultado = document.getElementById('mensaje-resultado');


    mensajeResultado.innerHTML = mensaje;

    mensajeSubiendo.classList.add('hidden');
    contenedorResultado.classList.remove('hidden');
}

function mostrarPreview( idGuifo ){

    let url = "https://api.giphy.com/v1/gifs/" + idGuifo + "?api_key=" + apiKey;

    fetch (url).then(
        function (response){
            return response.json();
        }
    ).then(
        function (dataJson){
            let imgPreview = document.getElementById("img-preview");

            imgPreview.src = dataJson.data.images.fixed_height.url;
        
            let btnDescargarGuifo = document.getElementById ("btn-descargar-guifo");

            btnDescargarGuifo.setAttribute("href", dataJson.data.images.fixed_height.url);
        }
    );

}