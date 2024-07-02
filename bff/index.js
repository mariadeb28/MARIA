const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const youtubeRoutes = require("./routes/youtubeRoutes");
const favoritosRoutes = require("./routes/favoritosRoutes");

dotenv.config();
const app = express();
const Door = process.env.Door || 3004;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use("/api/youtube", youtubeRoutes);

app.use("/api/youtube", favoritosRoutes);

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(Door, () =>{
    console.log(`Servidor BFF rodando em http://localhost:${Door}`);

})