var cp = require('child_process');

var working_path = '/root/ExchangeWorld-Develop/ExchangeWorld';

var out = str => {
	console.log(str);
};

var job = (str, options) => {

	if (options == null) {
		options = {
			cwd: working_path
		};
	} else {
		if (options.cwd == null) {
			options.cwd = working_path;
		}
	}

	var output = cp.execSync(str, options).toString();

	console.log(output);

	return output;
};

module.exports.out = out;
module.exports.job = job;
