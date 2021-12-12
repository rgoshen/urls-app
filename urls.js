const axios = require('axios');
const fs = require('fs');
const url = require('url');

const file = process.argv.slice(2).toString();

try {
  const allContents = fs.readFileSync(file, 'utf8');
  allContents.split(/\r?\n/).forEach((line) => {
    if (line !== '') {
      const parsedURL = url.parse(line);
      axios
        .get(line)
        .then((res) => {
          const htmlBody = res.data;
          try {
            const writeToFile = `${__dirname}/${parsedURL.hostname}.txt`;
            fs.writeFileSync(writeToFile, htmlBody);
          } catch (error) {
            console.log(`Can not write to ${writeToFile}`);
          }
        })
        .catch((err) => {
          console.log(`${line} is a bad URL`);
        });
    }
  });
} catch (error) {
  console.log(`Can not access ${file}`);
}
