/**
 * Created by user on 2016/4/4.
 */

var describe = describe || false;
module.exports.describe = describe;

var local_def_filename = 'local-dev/config.js';

const fs = require('fs');
const path = require('upath2');

var localconfig = {};

function path_relative(to)
{
	//console.log(__dirname + '/../', to)
	return path.relative(__dirname + '/../', to);
};

module.exports.path_relative = path_relative;

var bool = false;

try
{
	local_def_filename = path_relative(local_def_filename);

	fs.accessSync(local_def_filename, fs.F_OK | fs.R_OK);

	bool = true;

	if (bool)
	{
		eval(fs.readFileSync(local_def_filename) + '');
	}
}
catch (e)
{
}
finally
{
	module.exports.localconfig = localconfig;
	global.localconfig = module.exports.localconfig;
}

describe && describe(path_relative(__filename), function ()
	{
		it(path_relative(local_def_filename), function ()
			{
				assert(bool);
			}
		);
	}
);

//console.log(global.localconfig);

var chai = require('chai');

module.exports.mochaAsync = (fn) =>
{
	return async (done) =>
	{
		try
		{
			await fn();
			done();
		}
		catch (err)
		{
			done(err);
		}
	};
};

module.exports.localconfig = localconfig;

module.exports.expect = chai.expect;
module.exports.assert = chai.assert;
module.exports.should = chai.should;

for (let i in module.exports)
{
	global[i] = module.exports[i];
}

module.exports.default = module.exports;
