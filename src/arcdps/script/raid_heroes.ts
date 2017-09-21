/**
 * Created by user on 2017/8/11/011.
 */

import * as path from 'path';
import * as globby from 'globby';
import * as cp from 'child_process';
import * as util from 'util';
//import * as Promise from 'bluebird';
import * as fs from 'fs';

const execFile = util.promisify(cp.execFile);

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

export async function winreg(name, key, hive)
{
	let regKey = new Winreg({
		hive: hive,
		key: key,
	});

	let v = await new Promise(function (resolve, reject)
	{
		regKey.get(name, function (err, item)
		{
			if (err)
			{
				//reject(err);
				resolve();
			}
			else
			{
				resolve(item.value);
			}
		});
	});

	return v;
}

export async function gw2exe()
{
	let p1 = await winreg(Winreg.DEFAULT_VALUE, '\\Gw2\\shell\\open\\command', Winreg.HKCR);

	if (p1 && p1.toString().match(/^\s*\"([^\"]+)\"/))
	{
		p1 = RegExp.$1;
	}

	if (p1 && fs.existsSync(p1))
	{
		return p1;
	}

	let p2 = await winreg('Path', '\\SOFTWARE\\ArenaNet\\Guild Wars 2', Winreg.HKLM);

	if (p2 && fs.existsSync(p2))
	{
		return p2;
	}
}

export async function gw2path()
{
	let exe = await gw2exe();

	if (exe)
	{
		return path.dirname(exe);
	}
}
