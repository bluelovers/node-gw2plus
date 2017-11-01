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

import * as zip from 'gulp-zip';
import * as gulpCopy from 'gulp-copy';
import * as sourcemaps from 'gulp-sourcemaps';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

const addGulpTasks = addTasks(gulp, 'arcdps');

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
				.pipe(gulp.dest(path.join(dist_root, 'assets', 'arcdps/translations')))
				.pipe(verify())
				.pipe(sourcemaps.init())
				.pipe(tsProject())
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(path.join(dist_root, 'assets', 'arcdps/translations')))
				.pipe(verify())
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

				let chs2 = await fs.readFile(path.join(project_root, 'assets', 'arcdps/translations/chinese-simplified/arcdps_lang.ini'), encodings);
				let chs2_ini = ini.parse(chs2.toString());

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

				let no_lang = [];

				for (let i in c.lang)
				{
					if ((i as any) == 1)
					{
						console.log(`;${i}=${c.lang[i]}`);

						continue;
					}

					let cv = [];
					let v = '';

					cv.push(c.lang[i]);
					//cht_new.push(`;${i}=${c.lang[i]}`);

					if (chs2_ini[i] && !cv.includes(chs2_ini[i]))
					{
						cv.push(chs2_ini[i]);
					}

					if (chs_ini[i] && !cv.includes(chs_ini[i]))
					{
						cv.push(chs_ini[i]);
						//cht_new.push(`;${i}=${chs_ini[i]}`);
					}

					if (cht_ini[i])
					{
						//console.log(`${i}=${cht_ini[i]}`);

						v = cht_ini[i];
						//cht_new.push(`${i}=${cht_ini[i]}`);
					}
					else if (cht_ini[i] === '')
					{
						// reset to english

						if (tw_ini[i] && !cv.includes(tw_ini[i]))
						{
							cv.push(tw_ini[i]);
							//cht_new.push(`;${i}=${tw_ini[i]}`);
						}
					}
					else if (tw_ini[i])
					{
						v = tw_ini[i];
						//cht_new.push(`${i}=${tw_ini[i]}`);
					}

					if (cv.length)
					{
						cv = cv.reduce(function (a, b)
						{
							a.push(`;${i}=${b}`);

							return a;
						}, cht_new);

						//console.log(cv);

						//cht_new = cht_new.concat(cv);
					}

					//console.log(i, v);

					if (v)
					{
						cht_new.push(`${i}=${v}`);
					}
					else
					{
						no_lang.push(`;${i}=${c.lang[i]}`);
					}
				}

				cht_new.push(`; miss/removed list`);

				let t = Object.assign({}, chs_ini, tw_ini, cht_ini);

				for (let i in t)
				{
					if (!c.lang[i] && i != '[lang]')
					{
						let v = t[i];
						cht_new.push(`;${i}=${v}`);
					}
				}

				cht_new.push(`; not translation list`);

				cht_new = cht_new.concat(no_lang);

				let out = Buffer.from(cht_new.join("\n"));

				out = iconv.encode(out as any, encodings, {
					addBOM: true,
				});

				fs.outputFile(path.join(dist_root, 'assets', 'arcdps/translations/cht/arcdps_lang.ini'), out as any, encodings);
			}
		},

		ttf: {
			callback()
			{
				return gulp.src([
						path.join(project_root, 'assets/arcdps', 'translations/arcdps_font.ttf'),
					], {
						base: 'assets/arcdps'
					})
					.pipe(gulpCopy(path.join(dist_root, 'assets', 'arcdps/translations'), { prefix: 99 }))
					.pipe(verify())
					;
			}
		},

		pack: {
			deps: [
				':cht',
				':ttf',
			],

			callback()
			{
				return gulp.src([
						path.join(dist_root, 'assets/arcdps', 'translations/cht/arcdps_lang.ini'),
						path.join(dist_root, 'assets/arcdps', 'translations/arcdps_font.ttf'),
					], {
						//base: path.join(dist_root, 'assets/arcdps', 'translations/cht/arcdps_lang.ini'),
					})
					.pipe(verify())
					.pipe(zip('arcdps_translations_cht.zip'))
					.pipe(gulp.dest('archive', {
						cwd: path.join(dist_root, 'assets/arcdps'),
					}))
					;
			}
		},

	},
};

addGulpTasks(_gulp_);

function verify()
{
	var options = {
		objectMode: true,
	};
	return through(options, write, end);

	function write(file, enc, cb)
	{
		console.debug('[verify]', 'file', file.path);
		cb(null, file);
	}

	function end(cb)
	{
		console.debug('[verify]', 'done');
		cb();
	}
}
