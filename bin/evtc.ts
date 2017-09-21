#!/usr/bin/env node

/**
 * Created by user on 2017/8/11/011.
 */

import { evtc, search, winDocuments, gw2path } from '../src/arcdps/script/raid_heroes';

//console.log(process.env);

export = (async () =>
{
	const myDocFolder = await winDocuments();
	const myGW2Path= await gw2path();

	let paths = [
		process.cwd(),
		'.',
		`${myDocFolder}/Documents`,
		`${myGW2Path}/addons`,
		`${myDocFolder}`,
		`${process.env.USERPROFILE}/Documents`,
		`${process.env.USERPROFILE}`,
	];

	let argv = process.argv.slice(2);

	//console.log('argv', argv);

	let cwd = argv[0];

	if (!cwd)
	{
		cwd = search('arcdps', [].concat(paths)) || process.cwd();
	}

	let bin = search('raid_heroes.exe', [cwd].concat(paths));

	console.log({
		bin: bin,
		cwd: cwd,
		argv: argv,
	});

	if (!bin)
	{
		console.error('can\'t found `raid_heroes.exe`');
		//throw 'can\'t found `raid_heroes.exe`';

		return process.exit(1);
	}

	await evtc(bin, cwd);
})();
