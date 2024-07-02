const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtubeController");

router.get("/videos", async (req,res) =>{
    const {query} = req.query;
    try{
        const data = await youtubeController.searchVideos(query); 
        res.json(data);
    }catch (error) {
        res.status(400).json({ error: 'Erro ao buscar e salvar vídeos' });
    }
});

module.exports = router;