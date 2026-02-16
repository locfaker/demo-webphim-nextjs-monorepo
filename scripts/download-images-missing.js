const fs = require('fs');
const path = require('path');
const https = require('https');

// Verified working TMDB links for remaining missing images
const topics = [
    { name: "Phim Kinh Dị", slug: "kinh-di", url: "https://image.tmdb.org/t/p/w780/5a4JdoFwll5DRtKMe7JLuZ96POZ.jpg" }, // Exorcist (Failed previously) -> Try different ID
    // Tried 5a4Jdo..., fallback to:
    { name: "Phim Kinh Dị", slug: "kinh-di", url: "https://image.tmdb.org/t/p/w780/6u68ujnVJAL91rXz4d22i1z28aH.jpg" }, // Evil Dead Rise
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded: ${filepath}`);
                    resolve();
                });
            } else {
                file.close();
                fs.unlink(filepath, () => { });
                reject(`Server responded with ${response.statusCode}: ${url}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
};

const main = async () => {
    const dir = path.join(__dirname, '../apps/web/public/images/topics');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Only download kinh-di
    const topic = topics[1];
    const filename = `${topic.slug}.jpg`;
    const filepath = path.join(dir, filename);
    console.log(`Downloading ${topic.slug}...`);
    try {
        await downloadImage(topic.url, filepath);
    } catch (error) {
        console.error(`Failed: ${error}`);
    }
};

main();
