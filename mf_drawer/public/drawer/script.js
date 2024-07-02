
// Evento de clique para o botão VÍDEOS

document.getElementById("videos_link").addEventListener("click", () =>{
    sendMessageToShell("vídeos"); // Envia uma mensagem para o shell principal carregar o microfrontend de vídeos

});

// Evento de clique para o botão FAVORITOS
document.getElementById("favoritos_link").addEventListener("click", () =>{
    sendMessageToShell("favoritos");
});

function sendMessageToShell(mensagem){
    window.parent.postMessage(message, "*")
};

let favoritosCount = 0;

async function fetchFavoritosCount(){
    try{
        const response = await fetch("http://localhost:3004/api/youtube/favoritos");
        if(!response.ok) {
            throw new Error ("Erro ao obter dados da API");
        }

        const data = await response.json();
        favoritosCount = data.videos.lenght; // atualizar o contador com o número de favoritos
        updatefavoritosCounter(); // Atualiza o contador visualmente

    } catch (error){
        console.error("Erro ao buscar dados da API:", error.message);
    }
}

// Atualiza o contador visualmente
function updatefavoritosCounter() {
    const favoritosCounter = document.getElementById("favoritosCounter");
    favoritosCounter.textContent = favoritosCount.toString();
}

fetchFavoritosCount();

setInterval(fetchFavoritosCount, 100);
