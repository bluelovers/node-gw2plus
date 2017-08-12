/**
 * Created by user on 2017/8/11/011.
 */

import * as path from 'path';
import * as globby from 'globby';
import { execFile } from 'child_process';
import * as util from 'util';
//import * as Promise from 'bluebird';
import * as fs from 'fs';

execFile = util.promisify(execFile);

import * as Winreg from 'winreg';

export async function evtc(bin, cwd = process.cwd())
{
	const current_cwd = process.cwd();

	if (fs.existsSync(path.join(cwd, 'arcdps.cbtlogs')))
	{
		cwd = path.join(cwd, 'arcdps.cbtlogs');
	}

	let ls = await globby([
			'**/*.evtc',
			'arcdps.cbtlogs/**/*.evtc',
			'!npm-cache',
			'!node_modules',
		], {
			cwd: cwd,
			absolute: true,
			//realpath: true,
		})
			.then(async (ls) =>
			{
				console.log(path.basename(bin), cwd);
				//console.log(ls);

				if (!ls.length)
				{
					return false;
				}

				let out = path.join(cwd, 'evtc.html');

				if (!fs.existsSync(out))
				{
					fs.mkdirSync(out);
				}

				//process.chdir(out);

				ls = ls.map((b) =>
				{
					let file = path.relative(cwd, b);

					console.log('[evtc]', 'start...', file);

					return execFile(bin, [
						b,
					], {
						cwd: out,
					})
						.then((argv) =>
						{
							console.log('[evtc]', 'done.', file);

							if (argv.stderr)
							{
								console.log('[evtc]', 'error', file, argv.stderr);
							}
						})
						;
				});

				return Promise.all(ls)
					.then(ls =>
					{
						console.log('[evtc]', 'all done.');
					})
					;
			})
			.catch((...argv) =>
			{
				console.trace('[error]', argv);
			})
	;

	return ls;
}

export function search(target, paths, def = void(0))
{
	paths = paths || [
		process.cwd(),
		'.',
	];

	for (let p of paths)
	{
		if (!p)
		{
			continue;
		}

		let t = path.join(p, target);

		//console.log(t, fs.existsSync(t));

		if (fs.existsSync(t))
		{
			//console.error(t);

			return t;
		}
	}

	if (def)
	{
		return path.join(def, target);
	}

	return def;
}

export async function winDocuments()
{
	let regKey = new Winreg({
		hive: Winreg.HKCU,
		key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders'
	});

	let myDocFolder = await new Promise(function (resolve, reject)
	{
		regKey.values(function (err, items)
		{
			for (let i in items)
			{
				if (items[i].name === 'Personal')
				{
					resolve(items[i].value);
				}
			}
		});
	});

	return myDocFolder;
}
