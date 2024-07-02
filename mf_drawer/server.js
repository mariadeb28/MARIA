const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const Door = process.env.Door || 8000;

app.use(cors);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/drawer", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "drawer", "index.html"));
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Erro!");
});

app.listen(Door, () =>{
    console.log(`Server running at Door ${Door} 🎵`)
})