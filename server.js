const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/thumbnails", async (req, res) => {
  try {
    const { assetIds } = req.body;

    const robloxUrl =
      `https://thumbnails.roblox.com/v1/assets?assetIds=${assetIds.join(",")}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`;

    const response = await fetch(robloxUrl);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Servidor Roblox Thumbnail API online.");
});

app.listen(PORT, () => {
  console.log("Servidor online na porta " + PORT);
});
