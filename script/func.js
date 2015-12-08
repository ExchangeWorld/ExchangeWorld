var cp = require('child_process');
var path = require('path');

var working_path = path.resolve(__dirname, '../');

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

	return output;
};

module.exports.out = out;
module.exports.job = job;
module.exports.working_path = working_path;
