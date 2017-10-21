/**
 * Created by user on 2017/10/21/021.
 */

import * as path from 'path';
import * as globby from 'globby';
import * as fs from 'fs-extra';

import { immutable as array_unique } from 'array-unique';

interface IEnv
{
	TEMP: string;
}

export = (async () =>
{
	console.log(`gw2cache`);
	console.log('https://help.guildwars2.com/hc/en-us/articles/231273908-Trading-Post-Troubleshooting');
	console.log('');

	let paths = [
		process.cwd(),
		'.',
		process.env.TEMP,
		`${process.env.USERPROFILE}/AppData/Local/Temp`,
		`${process.env.LOCALAPPDATA}/Temp`,
	];

	paths = paths.map((v) => path.normalize(v));
	paths = array_unique(paths);

	for (let cwd of paths)
	{
		let ls = await globby([
				'gw2cache-*',
			], {
				cwd: cwd,
				absolute: true,
				//realpath: true,
			})
			.then(async (ls) =>
			{
				for (let p of ls)
				{
					console.log('[delete]', p);
					await fs.remove(p);
				}
			})
		;
	}
})()
