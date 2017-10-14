/**
 * Created by user on 2017/10/13/013.
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

import xyz from 'coord-xyz';

const addGulpTasks = addTasks(gulp, ['gw2taco', 'revise']);

addGulpTasks({
	'xyz': {

		deps: [
			//
		],

		async callback()
		{
			let patterns = [
				'ResourceNode/Plant/Orichalcum/Plant_Flax.xml',
				'ResourceNode/Plant/Orichalcum/Plant_Cluster of Desert Herbs.xml',
				'ResourceNode/Plant/Orichalcum/Plant_Desert Vegetables.xml',
				'ResourceNode/Plant/Orichalcum/Plant_Lentils.xml',
			];

			const cwd = path.join(project_root, 'assets/gw2taco', 'POIs');

			let options = {
				cwd: cwd,
				absolute: false,
			};

			const SCALE = 40;

			let ls = await globby(patterns, options)
				.then(async (ls) =>
				{
					let $t = cheerio.load('<POI MapID="1228" xpos="1020.4" ypos="17.1832" zpos="142.162" GUID="0ImqM3wblk6hhucuZCTLcw=="/>', {
						xmlMode: true,
						decodeEntities: false,
					})('POI').eq(0);

					let poi_backup = Poi.init();

					for (let file of ls)
					{
						let pois = await Poi.load(path.join(cwd, file));
						let ls = pois.filter();

						let changed = false;

						for (let i in Object.keys(ls))
						{
							let elem = ls[i];

							let _this = pois.$(elem);

							if (_this.attr('MapID') != $t.attr('MapID'))
							{
								continue;
							}

							let type = _this.attr('type');

							let d = xyz({
								x: $t.attr('xpos'),
								y: $t.attr('ypos'),
								z: $t.attr('zpos'),
							}, {
								x: _this.attr('xpos'),
								y: _this.attr('ypos'),
								z: _this.attr('zpos'),
							}, SCALE);

							if (d <= 300)
							{
								changed = true;

								let el = _this.remove();

								poi_backup.root().append(el);

								//console.log(type, d);
							}
						}

						if (changed)
						{
							await fs.outputFile(path.join(temp_root, 'revise', file), pois.dump());
						}
					}

					console.log('[revise]', 'count:', poi_backup.filter().length);

					await fs.outputFile(path.join(temp_root, 'revise', 'revise.xml.bak'), poi_backup.dump());
				})
			;
		}
	}
});
