const express = require("express");
const cors = require("cors");
const Connection = require("./config/db");
const routes = require("./routes/route");
const app = express();

app.use(cors({
    origin:"https://adorable-queijadas-af5e45.netlify.app"
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);           

const PORT = 8000;
Connection();
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
