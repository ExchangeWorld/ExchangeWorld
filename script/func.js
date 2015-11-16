var cp = require('child_process');

var out = str => {
	console.log(str);
}

var job = (str, options) => {
	
	if (options == null) {
		options = {cwd: '/root/ExchangeWorld-Develop/ExchangeWorld'};
	} else {
		if (options.cwd == null) {
			options.cwd = '/root/ExchangeWorld-Develop/ExchangeWorld';
		}
	}
	
	var output = cp.execSync(str, options).toString();

	console.log(output);

	return output;
}

module.exports.out = out;
module.exports.job = job;

