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
	'lstat',
	'realpath',
	'readlink',

	//'copy',
	//'outputFile',
	//'emptyDir',
	//'remove',

])
{
	fs[fn] = util.promisify(fs[fn]);
}

export default fs;
//fs.default = fs;
