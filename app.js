//1. Change fetch() to axios().

const express = require("express");
const fs = require('fs');
const cors = require("cors");
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(cors({
    method: 'GET'
}));
app.use(express.static("public"));

const coordinates = {
    "sanJuan" : {
        "lat": 16.682427,
        "lng": 120.337279
    },
    "baler": {
        "lat": 16.682427,
        "lng": 120.337279
    }
};
const sj = {
    "lat": 16.682427,
    "lng": 120.337279
}

const path = {
    "point": "stormGlassResponse.json",
    "tide": "stormGlassTideResponse.json"
};

class LocalData {
    constructor() {
        
    }
    readData(path) {
        return fs.readFileSync(path);
    }
    writeData(path, contents) {
        fs.writeFile(path, contents, function (err) {
            if (err) throw err;
            console.log('Replaced!');
          });
    }
}

class FetchData {
    constructor(data) {
        this.data = data;
        // this.params = [
        //     "seaLevel",
        //     "swellDirection",
        //     "swellHeight",
        //     "swellPeriod",
        //     "secondarySwellPeriod",
        //     "secondarySwellDirection",
        //     "secondarySwellHeight",
        //     "waterTemperature",
        //     "waveDirection",
        //     "waveHeight",
        //     "wavePeriod"
        // ];
        this.params = "seaLevel,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,waterTemperature,waveDirection,waveHeight,wavePeriod";
        this.point;
        this.tide;
    }
    getPointData() {
        axios.get(`https://api.stormglass.io/v2/weather/point?lat=${coordinates.sanJuan.lat}&lng=${coordinates.sanJuan.lng}&params=${this.params}`, {
            headers: {
                'Authorization': process.env.APIKEY
            }
        })
        .then((response) => {
            console.log(`Status code: ${response.status}`);
            return response;
        })
        .then((jsonData) => {
            console.log(jsonData.data);
            // console.log(JSON.parse(jsonData));
            // console.log(JSON.parse(jsonData.data))
            this.tide = JSON.stringify(jsonData.data);
            console.log(this.point);
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
    }
    getTideData() {
        axios.get(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${coordinates.sanJuan.lat}&lng=${coordinates.sanJuan.lng}`, {
            headers: {
                'Authorization': process.env.APIKEY
            }
        })
        .then((response) => {
            console.log(`Status code: ${response.status}`);
            return response;
        })
        .then((jsonData) => {
            console.log(jsonData.data);
            // console.log(JSON.parse(jsonData));
            // console.log(JSON.parse(jsonData.data))
            this.tide = JSON.stringify(jsonData.data);
            console.log(this.tide);
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
    }
}

const localData = new LocalData();
const fetchData = new FetchData();
// console.log(JSON.parse(localData.readData(path.point)));
// console.log(JSON.parse(localData.readData(path.tide)));

// fetchData.getPointData();
// fetchData.getTideData();
// console.log(fetchData.tide);
// localData.writeData(path.tide,"{'hello': 'world'}");
// localData.writeData(path.point, "Hello")



//Serve Surf Check's web app homepage.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

//Serve data upon request - proxy API
//Add authentication handshake
app.get("/data", function(req, res) {
    res.send(JSON.parse(localData.readData(path.point)));
})

//This will serve a page to control the updates for the JSON files.
//As of now, updates are not automated.
app.get("/update", function(req, res) {

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log(`Server has started successfully at port ${port}`)
})
