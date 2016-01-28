/**
 * Converting snake_case to camelCase
 * usage: node snakeToCamel.js <src> <dst>
 *
 * 2015/01/28 by SSARCandy
 */

const fs = require('fs');

function snakeToCamel(s) {
  return s.replace(/(_\w)/g, function(m) {
    return m[1].toUpperCase();
  });
}


function convert(savPath, srcPath) {
  fs.readFile(srcPath, 'utf8', function(err, data) {
    if (err) throw err;

    var fileWithCamel = snakeToCamel(data);


    fs.writeFile(savPath, fileWithCamel, function(err) {
      if (err) throw err;
      console.log('complete');
      process.exit(0);
    });
  });
}

if (process.argv.length < 4) {
  console.error('Argument too few.');
  throw '[USAGE] node snakeToCamel.js <src> <dst>';
} 

var src = process.argv[2];
var dst = process.argv[3];

convert(dst, src);
