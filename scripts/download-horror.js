const fs = require('fs');
const path = require('path');
const https = require('https');

const url = "https://upload.wikimedia.org/wikipedia/en/b/bd/The_Nun_II_poster.jpg";
const filepath = path.join(__dirname, '../apps/web/public/images/topics/kinh-di.jpg');

const file = fs.createWriteStream(filepath);
https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
    });
}).on('error', (err) => {
    fs.unlink(filepath, () => { });
    console.error(`Error: ${err.message}`);
});
