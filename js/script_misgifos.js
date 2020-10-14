var gifSubidos = JSON.parse (localStorage.getItem("gifSubidos"));
var apiKey = "j58FtF7faNMlQAH2FS68ygzvuB27yCRX";

gifSubidos.forEach (async function (idGif){

                    var urlGif = "https://api.giphy.com/v1/gifs/" + idGif + "?api_key=" + apiKey;

                    var response = await fetch (urlGif);
                    var gifJson  = await response.json();

                    var contenedorGifs = document.getElementById ("listado-gifs");

                    contenedorGifs.innerHTML += "<img src=\""+gifJson.data.images.fixed_height.url+"\">";
}
);

