var cp = require('child_process');

var job = str => {
	console.log(cp.execSync(str).toString().replace(/\n/g, ''));
}

job('git pull');

