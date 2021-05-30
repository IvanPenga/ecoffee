const fs = require('fs');
const request = require('request');
const path = require('path');
const { hashes } = require('../src/avatars/index');

const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

hashes.forEach(hash => {
  const filepath = path.join(__dirname, '..', 'src/images/robohash', `${hash}.png`);
  download(`https://robohash.org/${hash}.png?size=100x100`, filepath, function(){
    console.log('Finished ');
  });
});