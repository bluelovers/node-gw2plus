/**
 * Created by user on 2017/8/31/031.
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

import gw2api, { getMapAll, getMapInfo } from '../src/gw2api/map';

const addGulpTasks = addTasks(gulp, 'gw2api');

addGulpTasks({
	'cache': {
		'map': {
			async callback()
			{
				let _cache_ = await gw2api.getMapAll();

				let json = JSON.stringify(_cache_, null, "  ");

				await fs.outputFile(path.join(temp_root, 'gw2api', 'maps.json'), json);
			},
		}
	}
});
