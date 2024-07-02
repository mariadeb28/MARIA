document.addEventListener("DOMContentLoaded", async() =>{
    async function fetchFavoritosVideos(){
        try {
            const response = await fetch("http://localhost:3004/api/youtube/favoritos");
            if (!response.ok){
                throw new Error('Erro ao buscar favoritos:', response.status);
            }
            const data = await response.json();
            renderFavoritosVideos(data.videos);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
        }
    }

    function renderFavoritosVideos(videos){
        const videoContainer = document.getElementById("video_list");
        videoContainer.innerHTML = "";

        videos.forEach(video =>{
            const videoElement = document.createElement("div");
            videoElement.classList.add("video-item");

            videoElement.innerHTML = `
             <div class="video-content">
                    <div class="video-thumbnail">
                        <iframe width="300" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <h3 class="video-title">${video.title}</h3>
                    <div class="space"></div>
                    <button class="favorite-button active" data-video-id="${video.id}" data-title="${video.title}" data-thumbnail="${video.thumbnailUrl}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            
            `;

            const favoritoButton = videoElement.querySelector(".favorite-button");
            favoritoButton.addEventListener("click", () => deleteFromBackendFavorites(video.id));

            videoContainer.appendChild(videoElement);
        });
    }

    async function deleteFromBackendFavorites (videoId) {
        try{
            const response =await fetch(`"http://localhost:3004/api/youtube/favoritos/${videoId}"`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar favorito:', response.status);
        }

        fetchFavoritosVideos();

    } catch (error){
        console.error('Erro ao deletar favorito:', error);
    }
}

fetchFavoritosVideos();

})