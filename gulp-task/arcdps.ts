/**
 * Created by user on 2017/8/16/016.
 */

import gulp from '../src/gulp/hook';

import * as concat from 'gulp-concat';
import * as rename from 'gulp-rename';
import * as header from 'gulp-header';
import * as headerfooter from 'gulp-header-footer';
import * as source from 'vinyl-source-stream';
import * as through from 'through2';

import * as runGulpTask from 'run-gulp-task';
import addTasks from 'gulp-add-tasks2';
import fs from '../src/lib/fs';

import * as ts from 'gulp-typescript';

import * as ini from 'ini';
import * as iconv from 'iconv-lite';

import * as path from 'path';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

const addGulpTasks = addTasks(gulp);

const _gulp_ = {
	translations: {

		async c()
		{
			let h = await fs.readFile(path.join(project_root, 'assets', 'arcdps/translations/enum.c'));
			let f = await fs.readFile(path.join(project_root, 'assets', 'arcdps/translations/default.c'));

			f = f.toString().replace(/lang\[([^\]]+)\]/g, `lang[m_translate.$1]`);

			const tsProject = ts.createProject(path.join(project_root, 'tsconfig.json'));

			return gulp.src(path.join(project_root, 'assets', 'arcdps/translations/default.c'))
				.pipe(rename({
					basename: 'english',
					extname: ".ts",
				}))
				.pipe(through.obj(function (file, enc, cb)
				{

					if (file.isBuffer())
					{
						file.contents = Buffer.concat([
							new Buffer(h),
							new Buffer(`
							
							export { m_translate };
							
							let lang = {};
							
							`),
							new Buffer(f),
							new Buffer(`export { lang }; export default lang;`),
						]);
					}

					this.push(file);
					cb();
				}))
				//.pipe(tsProject())
				.pipe(gulp.dest(path.join(dist_root, 'assets', 'arcdps/translations')));
			;
		},

		cht: {
			deps: [
				':c',
			],
			async callback(done)
			{
				let encodings = 'utf16le';

				let c = await import(path.join(dist_root, 'assets', 'arcdps/translations/english'));

				let chs = await fs.readFile(path.join(project_root, 'assets', 'arcdps/translations/chs.ini'), encodings);
				let chs_ini = ini.parse(chs.toString());

				let tw = await fs.readFile(path.join(project_root, 'assets', 'arcdps/translations/tw.ini'), encodings);
				let tw_ini = ini.parse(tw.toString());

				let cht = await fs.readFile(path.join(project_root, 'assets', 'arcdps/translations/cht.ini'), encodings);
				let cht_ini = ini.parse(cht.toString());

				chs_ini = chs_ini.lang || chs_ini;
				tw_ini = tw_ini.lang || tw_ini;
				cht_ini = cht_ini.lang || cht_ini;

				//console.log(cht, cht_ini);

				let cht_new = ['[lang]'];

				cht_new.push(`;${encodings} BOM`);
				cht_new.push(`;Traditional Chinese`);
				cht_new.push(`;https://github.com/bluelovers/node-gw2plus/tree/master/dist/assets/arcdps/translations/cht/arcdps_lang.ini`);

				for (let i in c.lang)
				{
					if (i == 1)
					{
						//console.log(`;${i}=${c.lang[i]}`);

						continue;
					}

					cht_new.push(`;${i}=${c.lang[i]}`);

					if (chs_ini[i])
					{
						cht_new.push(`;${i}=${chs_ini[i]}`);
					}

					if (cht_ini[i])
					{
						//console.log(`${i}=${cht_ini[i]}`);

						cht_new.push(`${i}=${cht_ini[i]}`);
					}
					else if (cht_ini[i] === '')
					{
						// reset to english
					}
					else if (tw_ini[i])
					{
						cht_new.push(`${i}=${tw_ini[i]}`);
					}
				}

				let out = Buffer.from(cht_new.join("\n"));

				out = iconv.encode(out, encodings, {
					addBOM: true,
				});

				fs.outputFile(path.join(dist_root, 'assets', 'arcdps/translations/cht/arcdps_lang.ini'), out, encodings);
			}
		}

	},
};

addGulpTasks({
	arcdps: _gulp_,
});
