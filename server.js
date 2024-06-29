const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 3009;

//Middleware
app.use(bodyParser.json());
app.use("/home", express.static(__dirname + "/public")); // Add this line to serve static files

//Database setup
const sequelize = new Sequelize(
    "postgres://postgres:Jaishridev009@localhost:5432/hodlinfo",
    {
        dialect: "postgres",    
    },
);

const Ticker = sequelize.define("Ticker", {
    name: { type: DataTypes.STRING },
    last: { type: DataTypes.FLOAT },
    buy: { type: DataTypes.FLOAT },
    sell: { type: DataTypes.FLOAT },
    volume: { type: DataTypes.FLOAT },
    base_unit: { type: DataTypes.STRING },
});

const fetchData = async () => {
    try {
        const response = await axios.get(
            "https://api.wazirx.com/api/v2/tickers",
        );
        const data = response.data;
        // console.log(data);
        const top10 = Object.values(data).slice(0, 10);
        // console.log(top10);

        await Ticker.sync({ force: true });
        for (const item of top10) {
            await Ticker.create({
                name: item.name,
                last: item.last,
                buy: item.buy,
                sell: item.sell,
                volume: item.volume,
                base_unit: item.base_unit,
            });
        }
    } catch (err) {
        console.log("there is an error : ", err);
    }
};

app.get("/api/tickers", async (req, res) => {
    try {
        const tickers = await Ticker.findAll();
        // console.log(tickers);
        // res.json(tickers);
        // res.sendFile(path.join(__dirname, 'index.html'));
        // res.json({
        //     status:"success",
        //     data:{
        //         tickers,
        //     }
        // })
        res.send(tickers);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

//start server
app.listen(port, () => {
    console.log(`Server is up 👾🧮🚀✅ and is running on https://localhost: ${port}`);
    fetchData();
});
