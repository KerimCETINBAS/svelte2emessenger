
// imports
// socket io server kutuphanesi
const _io = require("socket.io")
// nodejs http server kutuphanesi
const http = require("http")

// dosya yolu islemleri icin nodejs path kutuphanesi
const { join } = require("path")

// dosya islemleri icin nodejs file system kutuphanesi
const { createReadStream } = require("fs")

// http server icin express frameworku
const express = require("express")


// yeni express uygulamasi yarat
const app = express()

// clientteki index html i serve etmek icin, ../client/dist dizinini pulic olarak isaretle
app.use(express.static(join("../", "client", "dist")))

// http server yarat ve server handleri olarak express uygulamasini ver 
const server = http.createServer(app)

/*

    io server kutupanesinden
    io namespace i altindaki Server classindan yeni bir
    socket io instanci yarat, constructoru 2 parametre aliyor
    
    birinci parametre http server, http.server dan olusturdugumuz server instancini verdim
    ikinci parametre ayarlari iceren  obje
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    // Partial<ServerOptions> // ayar olarak aldigi butun parametreler   node_modules/socket.io/dist/index.d.ts
*/
const io = new _io.Server(server, {
    cors: {
        origin: "localhost:3000"
    }
})

// servera bir socket baglandiginda // http/upgrade requestini yakalayip connection eventi firlatiyor
// connection eventi, listener olarak io.socket tipinde parametre iceren void turunde bir callback istiyor
io.on("connection", socket => {
    // socket baglandiginda burdaki satirlar calisir
    console.log("yeni baglanti geldi")

    // baglanan her socket icin "send-message" eventini register et
    socket.on("send-message", data => {
        // socket eventi client tarafindan gonderilen data icin unknown tipinde parametre veya parametreler alir
        console.log("servera mesaj geldi", data)

        // mesaj geldigind data objesine from propertysi ve value olarak anon degerini ekle
        data.from = "anon"

        // gelen mesaji bagli olan deger socketlere broadcast et
        socket.broadcast.emit("message", data)
    })
})

// 3000 inci portu dinle
server.listen(3000)
