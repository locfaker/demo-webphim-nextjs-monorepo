const fs = require('fs');
const path = require('path');
const https = require('https');

// Verified working TMDB links (2025/2026 popular)
const topics = [
    { name: "Phim Hành Động", slug: "hanh-dong", url: "https://image.tmdb.org/t/p/w780/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg" }, // Aquaman 2
    { name: "Phim Cổ Trang", slug: "co-trang", url: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" }, // Dune 2
    { name: "Phim Ngôn Tình", slug: "tinh-cam", url: "https://image.tmdb.org/t/p/w780/yOm993lsJyPmBodlYjgpPwBjXP9.jpg" }, // Wonka
    { name: "Phim Hài Hước", slug: "hai-huoc", url: "https://image.tmdb.org/t/p/w780/cxevDYdeFkiixRShbObdwAHBZry.jpg" }, // Rebel Moon
    { name: "Phim Kinh Dị", slug: "kinh-di", url: "https://image.tmdb.org/t/p/w780/5a4JdoFwll5DRtKMe7JLuZ96POZ.jpg" }, // Exorcist
    { name: "Phim Hoạt Hình", slug: "hoat-hinh", url: "https://image.tmdb.org/t/p/w780/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" }, // Kung Fu Panda 4
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

    for (const topic of topics) {
        const filename = `${topic.slug}.jpg`;
        const filepath = path.join(dir, filename);
        console.log(`Downloading ${topic.slug}...`);
        try {
            await downloadImage(topic.url, filepath);
        } catch (error) {
            console.error(`Failed: ${error}`);
        }
    }
};

main();
