const https = require('https');
const fs = require('fs');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const location = 'https://api.hyperphish.com/gimme-domains';

async function download(href, location) {
  return await new Promise((resolve, reject) => {
    let file = fs.createWriteStream(location);
    https.get(href, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close();
        resolve(fs.readFileSync(location));
      })
    })
  });
}

(async() => {
  // Create watch event for the paper.jar file.
  while (true) {
    const arrayRaw = await download(location, 'scam-domains.txt')
    const array = JSON.parse(arrayRaw)
    let string = array.join('\n');
    fs.writeFileSync(`scam-domains.txt`, string)
    // Wait 1 hour to restart.
    await sleep(3600000)
  }
})();