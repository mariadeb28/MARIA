const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.YOUTUBE_API_KEY;
const apiURL = 'https://www.googleapis.com/youtube/v3/search';

async function searchVideos(query){
    try{
        const response = await axios.get(apiURL, {
            params: {
                key: apiKey,
                q: query,
                part: 'snippet',
                type: 'video'
              }
        });
        return response.data;
    }catch (error){
        console.error('Erro ao buscar vídeos:', error.message);
        throw new Error('Erro ao buscar e salvar vídeos');
    }
}

module.exports = {
    searchVideos
};