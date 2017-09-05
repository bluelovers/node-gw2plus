/**
 * Created by user on 2017/8/25/025.
 */

import gulp from '../src/gulp/hook';

import fs from '../src/lib/fs';
import * as path from 'path';
import * as globby from 'globby';
import * as Promise from 'bluebird';
import * as minimatch from 'minimatch';
import * as globule from 'globule';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

import gw2taco, { Category, Node, Poi } from '../src/gw2taco';
import * as cu from '../src/gw2taco/category/util';

import addTasks from 'gulp-add-tasks2';

const addGulpTasks = addTasks(gulp, 'gw2taco');

addGulpTasks({
	'build-poi': {

		'default': {
			deps: [
				':resourcenode',
				':guildmission',
				':chest',
				':mapspecific',
			],
		},

		resourcenode: {

			deps: [
				'category:cache',
			],

			async callback()
			{
				let cat_cache = await Category.load(path.join(temp_root, `categorydata.cache.xml`));
				cat_cache = cat_cache.toList();

				let cats = {};

				let options = {
					cwd: path.join(dist_root, 'assets/gw2taco', 'POIs/ResourceNode'),
					absolute: true,
				};

				let nodes = Poi.init();
				let pois = nodes.root();

				let ls = await globby([
						'**/*.xml',
					], options)
					.then(async (ls) =>
					{
						for (let file of ls)
						{
							let cat = await Category.load(file);
							cats = Object.assign(cats, cat.toList());

							let poi = await Poi.load(file);

							pois.append(poi.filter());
						}
					})
				;

				nodes.find('OverlayData').prepend(cu.listToCat(cats, {
					gw2taco: true,
					lc: false,
					space: true,
				}).find('OverlayData > MarkerCategory'));

				await fs.outputFile(path.join(dist_root, 'assets/gw2taco', `POIs/${project_config.RUNTIME_PREFIX_TEMP}ResourceNode.xml`), nodes.dump());
			},
		},

		guildmission: {

			deps: [
				'category:cache',
			],

			async callback()
			{
				let cat_cache = await Category.load(path.join(temp_root, `categorydata.cache.xml`));
				cat_cache = cat_cache.toList();

				let cats = {};

				let options = {
					cwd: path.join(dist_root, 'assets/gw2taco', 'POIs/Tactical/GuildMission'),
					absolute: true,
				};

				let nodes = Poi.init();
				let pois = nodes.root();

				let ls = await globby([
						'**/*.xml',
					], options)
					.then(async (ls) =>
					{
						for (let file of ls)
						{
							let cat = await Category.load(file);
							cats = Object.assign(cats, cat.toList());

							let poi = await Poi.load(file);

							pois.append(poi.filter());
						}
					})
				;

				nodes.find('OverlayData').prepend(cu.listToCat(cats, {
					gw2taco: true,
					lc: false,
					space: true,
				}).find('OverlayData > MarkerCategory'));

				await fs.outputFile(path.join(dist_root, 'assets/gw2taco', `POIs/${project_config.RUNTIME_PREFIX_TEMP}GuildMission.xml`), nodes.dump());
			},
		},

		chest: {

			deps: [
				'category:cache',
			],

			async callback()
			{
				let cat_cache = await Category.load(path.join(temp_root, `categorydata.cache.xml`));
				cat_cache = cat_cache.toList();

				let cats = {};

				let options = {
					cwd: path.join(dist_root, 'assets/gw2taco', 'POIs/Chest'),
					absolute: true,
				};

				let nodes = Poi.init();
				let pois = nodes.root();

				let ls = await globby([
						'**/*.xml',
					], options)
					.then(async (ls) =>
					{
						for (let file of ls)
						{
							let cat = await Category.load(file);
							cats = Object.assign(cats, cat.toList());

							let poi = await Poi.load(file);

							pois.append(poi.filter());
						}
					})
				;

				nodes.find('OverlayData').prepend(cu.listToCat(cats, {
					gw2taco: true,
					lc: false,
					space: true,
				}).find('OverlayData > MarkerCategory'));

				await fs.outputFile(path.join(dist_root, 'assets/gw2taco', `POIs/${project_config.RUNTIME_PREFIX_TEMP}Chest.xml`), nodes.dump());
			},
		},

		'mapspecific': {
			deps: [
				'category:cache',
			],

			async callback()
			{
				await pack_poi('POIs/MapSpecific', path.join(dist_root, 'assets/gw2taco', `POIs/${project_config.RUNTIME_PREFIX_TEMP}MapSpecific.xml`))
			},
		},
	},
});


async function pack_poi(glob, dist)
{
	let cat_cache = await Category.load(path.join(temp_root, `categorydata.cache.xml`));
	cat_cache = cat_cache.toList();

	let cats = {};

	let options = {
		cwd: path.join(dist_root, 'assets/gw2taco', glob),
		absolute: true,
	};

	let nodes = Poi.init();
	let pois = nodes.root();

	let ls = await globby([
	'**/*.xml',
], options)
	.then(async (ls) =>
	{
		for (let file of ls)
		{
			let cat = await Category.load(file);
			cats = Object.assign(cats, cat.toList());

			let poi = await Poi.load(file);

			pois.append(poi.filter());
		}
	})
;

	nodes.find('OverlayData').prepend(cu.listToCat(cats, {
		gw2taco: true,
		lc: false,
		space: true,
	}).find('OverlayData > MarkerCategory'));

	await fs.outputFile(dist, nodes.dump());
}
