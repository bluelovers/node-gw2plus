/**
 * Created by user on 2017/8/6/006.
 */

import * as fs from 'fs-extra';
import * as util from 'util';

for (let fn of [
	'readFile',
	'writeFile',
	'link',
	'unlink',
	'symlink',
	'stat',
	'realpath',
	'readlink',
])
{
	fs[fn] = util.promisify(fs[fn]);
}

export = fs;
fs.default = fs;
