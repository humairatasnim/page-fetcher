const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
try {
  let validURL = new URL(url);
} catch (error) { 
  return console.log("Invalid URL. Please try again.");
}
const localPath = process.argv[3];

fs.access(localPath, fs.constants.W_OK, function (error) {
  if (!error) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('File already exists! Do you want to overwrite the file (y/n)?: ', (answer) => {
      rl.close();
      if (answer === 'y') {
        writeToFile();
      } else {
        return console.log('Try again with a different file name');
      }
    });
  } else {
    writeToFile();
  }
});

function writeToFile() {
  request(url, (error, response, body) => {
  
    if (error) {
      console.log('error:', error); // Print the error if one occurred
    }
  
    fs.writeFile(localPath, body, error => {
      if (error) {
        console.log('error:', error); // Print the error if one occurred
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`)
    });
  });
}