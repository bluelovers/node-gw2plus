/**
 * Created by user on 2017/9/30/030.
 */

import gulp from '../src/gulp/hook';

import fs from '../src/lib/fs';
import * as path from 'path';
import * as util from 'util';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

import addTasks from 'gulp-add-tasks2';

const addGulpTasks = addTasks(gulp, 'tree');

import * as dirTree from 'dir-tree-creator';

const dirTreeify = util.promisify(dirTree);

addGulpTasks({
	'default': {
		deps: [
			':gw2taco',
		],
	},

	gw2taco: {

		deps: [

		],

		async callback()
		{
			let ts = await dirTreeify(path.join(dist_root, 'assets/gw2taco', 'POIs'));

			await fs.outputFile(path.join(dist_root, 'assets/gw2taco', `README.md`), `
## GW2TacO

\`\`\`
categorydata.xml
${ts}
\`\`\`
`);
		}
	}
});
