const express = require("express");
const path = require("path");

const app = express();
const Door = process.env.Door || 8001;

app.use(express.static(path.join(__dirname, "src")));

app.get("/src/videos", (req, res) =>{
    res.sendFile(path.join(__dirname, "src", "videos", "index.html"));
});


app.get("/favoritos", (req,res) =>{
    res.sendFile(path.join(__dirname, "src", "favoritos", "index.html"));
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({error: "Erro interno do servidor"});
});

app.listen(Door, () =>{
    console.log(`Servidor frontend rodando em http://localhost:${Door}`);
});