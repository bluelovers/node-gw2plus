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

* [Guild Wars 2 Tactical Overlay](https://gw2taco.blogspot.com/) by [BoyC.2653](https://www.reddit.com/user/BoyC)

### archive

* [categorydata.xml](categorydata.xml) - overwrite style
* [maptimer.xml](maptimer.xml) - event timer
* [archive/GW2TacO_Data.zip](archive/GW2TacO_Data.zip) - icon
* [archive/GW2TacO_POIs.zip](archive/GW2TacO_POIs.zip) - poi

### desc

1. download [categorydata.xml](categorydata.xml), replace exists \`GW2TacO/categorydata.xml\`
2. download image file [Data/](Data/) into \`GW2TacO/Data\`, **not realy need but if u wanna looks with better icon**
3. choose any of \`*.xml\` u wanna use, put it into \`GW2TacO/POIs\` folder, **don't put on subfolder**

* \`ZZZ_SC_*.xml\` is lazy merge pack

\`\`\`
${ts}
\`\`\`

## FAQ

* [Quick Start Guide](http://gw2taco.blogspot.hu/2015/12/quick-start-guide.html)
* [FAQ and Common Problems](http://gw2taco.blogspot.hu/2015/12/faq-and-troubleshooter.html)
* [Feature list and planned features](http://gw2taco.blogspot.hu/2015/01/feature-list.html)
* [How to create and share your own markers (Documentation)](http://gw2taco.blogspot.hu/2016/01/how-to-create-your-own-marker-pack.html)

`);
		}
	}
});
