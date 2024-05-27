const express = require("express");
const fs = require("fs");

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT");
}

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", async (req, res) => { // Route for streaming video.
    
    const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice online.`);
});
