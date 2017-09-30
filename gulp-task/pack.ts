/**
 * Created by user on 2017/9/30/030.
 */

import gulp from '../src/gulp/hook';
import * as zip from 'gulp-zip';

import fs from '../src/lib/fs';
import * as path from 'path';
import * as util from 'util';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

import addTasks from 'gulp-add-tasks2';

const addGulpTasks = addTasks(gulp, 'pack');

import * as dirTree from 'dir-tree-creator';

const dirTreeify = util.promisify(dirTree);

addGulpTasks({
	'default': {
		deps: [
			':gw2taco:icon',
			':gw2taco:poi',
		],
	},

	gw2taco: {

		poi: {

			deps: [

			],

			callback()
			{
				return gulp.src(path.join(dist_root, 'assets/gw2taco', 'POIs', '**'))
					.pipe(zip('GW2TacO_POIs.zip'))
					.pipe(gulp.dest(path.join(dist_root, 'assets/gw2taco', 'archive')))
					;
			}
		},

		icon: {

			deps: [

			],

			callback()
			{
				return gulp.src(path.join(dist_root, 'assets/gw2taco', 'Data', '**'))
					.pipe(zip('GW2TacO_Data.zip'))
					.pipe(gulp.dest(path.join(dist_root, 'assets/gw2taco', 'archive')))
					;
			}
		},

	},
});
