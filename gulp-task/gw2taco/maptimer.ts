/**
 * Created by user on 2017/10/21/021.
 */

import gulp from '../../src/gulp/hook';

import fs from '../../src/lib/fs';
import * as path from 'path';
import * as globby from 'globby';
import * as Promise from 'bluebird';
import * as minimatch from 'minimatch';
import * as globule from 'globule';

import * as cheerio from 'cheerio';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../../project.config';

import gw2taco, { Category, Node, Poi } from '../../src/gw2taco';
import * as cu from '../../src/gw2taco/category/util';
import * as myutil from '../../src/lib/util';
import gw2api, { getMapAll, getMapInfo } from '../../src/gw2api/map';

import addTasks from 'gulp-add-tasks2';

const addGulpTasks = addTasks(gulp, ['gw2taco', 'maptimer']);

addGulpTasks({

	'default': {

		deps: [
			':build',
		],

	},

	'padding': {

		async callback()
		{

		},

	},

	'build': {

		async callback()
		{
			let mt = await gw2taco.MapTimer.load(path.join(project_root, 'assets/gw2taco', 'maptimer.xml'));

			let mt_root = mt.root();

			const cwd = path.join(project_root, 'assets/gw2taco', 'GW2MapTimer');

			let ls = await globby([
				'**/*.xml',
			], {
				cwd: cwd,
				absolute: true,
				//realpath: true,
			})
				.then(async (ls) =>
				{

					for (let file of ls)
					{
						let m = await gw2taco.MapTimer.load(file);

						m.filter().appendTo(mt_root);
					}

					return mt;
				})
				.then((mt) =>
				{
					let ids = [];

					mt.createPadding(mt.filter())
						.each(function ()
						{
							let _this = mt.$(this);

							let id = _this.attr('id');
							let name = _this.attr('Name');

							if (!id)
							{
								id = Poi.normalize(name);
							}

							let _id = id;
							let i = 1;

							while (ids.includes(_id))
							{
								_id = id + i++;
							}

							ids.push(_id);

							_this.attr('id', _id);
						})
					;

					return mt;
				})
				.then((mt) =>
				{
					mt.filterEvent()
						.each(function ()
						{
							let _this = mt.$(this);

							let color = _this.attr('Color');

							if (!color)
							{
								_this.attr('Color', '');
							}
						})
					;

					return mt;
				})
			;

			await fs.outputFile(path.join(dist_root, 'assets/gw2taco', 'maptimer.xml'), mt.dump());
		},

	},

});
