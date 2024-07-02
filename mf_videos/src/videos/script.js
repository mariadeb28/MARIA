document.addEventListener("DOMContentLoaded", async() =>{
    await loadComponent("components/search-form.html", "search-form-container");

    document.getElementById("search-button").addEventListener("click", () =>{
        const query = document.getElementById("search_input").ariaValueMax.trim();
        if (query !== ""){
            fetchVideos(query);
        }else {
            fetchVideos();
        }
    })
});

async function loadComponent (url, containerId) {
    const response = await fetch(url);
    const template = await response.text();
    document.getElementById(containerId).innerHTML = template;
}

async function fetchVideos(query = ""){
    try{
        let url = "http://localhost:3004/api/youtube/videos";
        if (query) {
            url += `?query=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        const videos = await response.json();
        const videoItems = videos.item.map(video =>({
            id: video.id.videoId,
            title: video.snippet.title,
            thumbnailUrl: video.snippet.thumbnails.medium.url,
            favorito: false,
            favoritoState: "default"

        }));
        renderVideos(videoItems);
    }catch(error){
        console.error('Erro ao buscar vídeos:', error);
    }
}

let favoritos = [];
const localStorageKey = "youtube_favoritos";

const storedFavoritos = localStorage.getItem(localStorageKey);
if(storedFavoritos){
    favoritos = JSON.parse(storedFavoritos);
}

async function renderVideos(videoItems) {
    const videoContainer = document.getElementById("video_list");
    videoContainer.innerHTML = "";
    for (const video of videoItems){
        const videoElement  = document.createElement("div");
        videoElement.classList.add("video-item");

        videoElement.innerHTML = `
        <div class="video-content">
                    <div class="video-thumbnail">
                        <iframe width="300" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <h3 class="video-title">${video.title}</h3>
                    <div class="space"></div>
                    <button class="favorite-button ${video.favorite ? 'active' : 'default'}" data-video-id="${video.id}" data-title="${video.title}" data-thumbnail="${video.thumbnailUrl}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>

        `;

        const favoritoButton = videoElement.querySelector(".favorite-button");
        favoritoButton.addEventListener("click", async() =>{
            try{
                if(favoritoButton.classList.contains("active")){
                    favoritos = favoritos.filter(fav => fav.id !== video.id);
                    favoritoButton.classList.remove("active");
                }

                saveFavoritosLocally();
                await updateBackendFavoritos();
            }catch (error){
                console.error('Erro ao gerenciar favorito:', error);
            }
        });
        videoContainer.appendChild(videoElement);
    }
}

function saveFavoritosLocally(){
    localStorage.setItem(localStorageKey, JSON.stringify(favoritos));
}

async function updateBackendFavoritos(){
    try{
        const response = await fetch("http://localhost:3004/api/youtube/favoritos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                videos: favoritos
            }),
        });
        if (!response.ok){
            console.error('Erro ao atualizar favoritos no backend:', response.status);
        }
    } catch (error){
        console.error('Erro ao atualizar favoritos no backend:', error);
    }
}

fetchVideos();