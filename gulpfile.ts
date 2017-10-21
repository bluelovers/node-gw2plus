/**
 * Created by user on 2017/8/10/010.
 */

import gulp from './src/gulp/hook';

import fs from './src/lib/fs';
import * as path from 'path';
import * as globby from 'globby';
import * as Promise from 'bluebird';
import * as minimatch from 'minimatch';
import * as globule from 'globule';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from './project.config';

import gw2taco, { Category, Node, Poi } from './src/gw2taco';

import addTasks from 'gulp-add-tasks2';
const addGulpTasks = addTasks(gulp);

import './gulp-task/gw2taco';
import './gulp-task/gw2taco/runtime';
import './gulp-task/gw2taco/maptimer';
import './gulp-task/gw2api';
import './gulp-task/tree';
import './gulp-task/pack';

import * as cu from './src/gw2taco/category/util';

gulp.task('gw2taco:categorydata', ['category:cache'], async function ()
{
	//let src = path.join(dist_root, 'assets/gw2taco', file);
	//let target = path.join(gw2taco_path, file);
});

gulp.task('gw2taco:link', async function ()
{
	const currentTask = this.currentTask;

	let options = {
		cwd: path.join(dist_root, 'assets/gw2taco'),
	};

	let ls = await globby([
			'categorydata.xml',
			'*.xml',
			'*/*.xml',
			'**/*.{gif,jpg,jpeg,png}',
		], options)
		.then(async (ls) =>
		{
			for (let file of ls)
			{
				let src = path.join(dist_root, 'assets/gw2taco', file);
				let target = path.join(gw2taco_path, file);

				if (fs.existsSync(target))
				{
					src = await fs.realpath(src);

					let stat = await fs.lstat(target);

					//console.log(src, target, stat);

					if (!stat.isSymbolicLink() && !fs.existsSync(target + '.gw2taco'))
					{
						console.warn(`backup ${file}`);
						await fs.copy(target, target + '.gw2taco');
					}

					if (src != await fs.realpath(target))
					{
						console.warn(`relink ${file}`);
						await fs.remove(target);
					}
					else
					{
						console.info(`skip ${file}`);
						continue;
					}
				}

				console.warn(`link ${file}`);
				await fs.ensureSymlink(src, target);
			}

			return ls;
		})
	;

	return ls;
});

gulp.task('dist:clear', async function ()
{
	return await fs.emptyDir(path.join(dist_root, 'assets/gw2taco'));
});

gulp.task('assets:copy', ['dist:clear'], async function ()
{
	const currentTask = this.currentTask;

	let patterns = [
		'**/psd',
		'**/*.{psd,bak}',
	];

	await fs.copy(path.join(project_root, 'assets/gw2taco'), path.join(dist_root, 'assets/gw2taco'), {
		preserveTimestamps: true,
		filter: function (src, dest)
		{
			let _path = path.relative(project_root, src);

			//console.log(_path, globule.isMatch(patterns, _path));

			if (globule.isMatch(patterns, _path))
			{
				return false;
			}

			return true;
		}
	});
});

gulp.task('assets:pretty', async function ()
{
	const currentTask = this.currentTask;

	let options = {
		cwd: path.join(project_root, 'assets/gw2taco'),
		absolute: true,
	};

	let ls = await globby([
		'**/*.xml',
	], options);

	for (let file of ls)
	{
		let doc = await Node.load(file);
		let out = doc.dump();

		await fs.writeFile(file, out);

		//let b = path.relative(options.cwd, file);
		//await fs.outputFile(path.join(dist_root, 'assets/gw2taco', b), out);
	}
});

gulp.task('dist:pretty', async function ()
{
	const currentTask = this.currentTask;

	let options = {
		cwd: path.join(dist_root, 'assets/gw2taco'),
		absolute: true,
	};

	let ls = await globby([
		'**/*.xml',
	], options);

	for (let file of ls)
	{
		let doc = await Node.load(file);
		let out = doc.dump();

		await fs.writeFile(file, out);
	}
});

gulp.task('assets:cache', ['assets:copy'], async function ()
{
	const currentTask = this.currentTask;

	let patterns = [
		'**/*.{gif,jpg,jpeg,png}',
	];

	let ls = await globby(patterns, {
			cwd: path.join(gw2taco_path, 'data'),
		})
		.then(async (ls) =>
		{
			let ls2 = await globby(patterns, {
				cwd: path.join(gw2taco_path, 'pois/data'),
			});

			return ls.concat(ls2);
		})
		.then(async (ls) =>
		{
			let ls2 = await globby(patterns, {
				cwd: path.join(project_root, 'assets/gw2taco/data'),
			});

			return ls.concat(ls2);
		})
		.then(async (ls) =>
		{
			let ls2 = await globby(patterns, {
				cwd: path.join(project_root, 'assets/gw2taco/pois/data'),
			});

			return ls.concat(ls2);
		})
		.then(ls =>
		{
			return Array.from(new Set(ls));
		})
		.then(ls =>
		{
			ls.sort();

			return ls.reduce((a, b) =>
			{
				let k = b.toString().toLowerCase().replace(/\.(gif|jpg|jpeg|png)$/, '').replace(/[\\\/\-]+/g, '.');

				k = Poi.normalize(k);

				a[k] = b;

				return a;
			}, {});
		})
	;

	//console.log(ls);

	await fs.outputFile(path.join(temp_root, `assets.gw2taco.cache.json`), JSON.stringify(ls, null, "  "));
});

gulp.task('category:cache', ['assets:cache'], async function ()
{
	const cu = require('./src/gw2taco/category/util');

	const currentTask = this.currentTask;
	const gw2taco_prefix = project_config.RUNTIME_PREFIX_TEMP;

	let patterns = [
		'categorydata.xml',
		'POIs/*.xml',
		`!${gw2taco_prefix}*.xml`,
		`!POIs/${gw2taco_prefix}*.xml`,
		`!${project_config.RUNTIME_PREFIX}Temp.xml`,
		`!POIs/${project_config.RUNTIME_PREFIX}Temp.xml`,
	];

	let options = {
		cwd: gw2taco_path,
		absolute: true,
	};

	let ls = await globby(patterns, options)
		.then(async (ls) =>
		{
			patterns.push('POIs/**/*.xml');

			let ls2 = await globby(patterns, (options.cwd = path.join(dist_root, 'assets/gw2taco'), options));

			//console.log(ls, ls2);

			return ls.concat(ls2);
		})
		.then(cu.loadAll)
		.then(ls =>
		{
			return cu.allCatList(ls, {
				merge: true,
				overwite: true,
			});
		})
		.then(ls =>
		{

			let assets_iconfile = require(path.join(temp_root, `assets.gw2taco.cache.json`));

			//console.log(ls['DivingGoggles'], ls['divinggoggles']);

			return cu.listToCat(ls, function (a, b, cat, ls)
			{
				//console.log(b, ls[b].name_id, Object.keys(ls[b].elem[0]));

				let name_id = ls[b].name_id.substr(0);

				if (ls[b].parent_name)
				{
					let parent_name = Poi.normalize(ls[b].parent_name);
					parent_name = ls[parent_name].name_id;

					name_id = `${parent_name}.${ls[b].name}`;
				}

				let d = name_id;
				let p = cat.makeTree(d.split('.'), [], {
					//gw2taco: true,
					gw2taco: false,
					lc: false,
					space: true,
				});

				let attrs = {};

				for (let attr in ls[b].elem[0].attribs)
				{
					if (attr == 'name') continue;

					//let value = cat.$(ls[b].elem).attr(attr);
					let value = ls[b].elem[0].attribs[attr];

					//p.attr(attr, value);

					attrs[attr] = value;
				}

				if (p.attr('name') != ls[b].name && !p.attr('DisplayName') && !attrs['DisplayName'])
				{
					attrs['DisplayName'] = ls[b].name;
				}

				{
					let iconFile = p.attr('iconFile') || attrs['iconFile'];

					if (1 || !iconFile || iconFile == p.attr('data-iconFile'))
					{
						let k = Poi.normalize(name_id);
						let k2 = Poi.normalize(name_id.split('.')
							.slice(0, -1)
							.concat([attrs['DisplayName'] || p.attr('DisplayName') || p.attr('name')])
							.join('.'));

						//console.log(k, k2);

						let i = _search_icon(assets_iconfile, k, k2);
						if (i)
						{
							attrs['iconFile'] = `Data/${i}`;
							attrs['data-iconFile'] = iconFile || attrs['iconFile'];
						}
					}
				}

				cat.getStatic().attr(p, attrs);

				//console.log(p[0].attribs);

				return a;
			});
		})
		.then(cat =>
		{
			let p = cat.makeTree(`temp`.split('.'), [])
				.attr('data-allowsub', true)
			;

			p.appendTo(p.parent());

			cat
				.find(`${cat.tagName}[name="undefined"]`)
				.each(function (i, elem)
				{
					cat.$(elem).appendTo(cat.$(elem).parent());
				})
			;

			return cat;
		})
		.then(cat =>
		{
			cat.getStatic().attr(cat.root(), {
				fadeFar: 16800,
				fadeNear: 8400,
			});

			interface IMarkerCategory
			{
				iconFile?: string;
				iconSize?: string;

				alpha?: 1.0|number;

				behavior?: 0|1|2|3|4|5|6|7;

				fadeNear?: -1|number;
				fadeFar?: -1|number;

				heightOffset?: 1.5|number;

				resetLength?: number;
				resetOffset?: number;

				DisplayName?: string;
			}

			let assets_iconfile = require(path.join(temp_root, `assets.gw2taco.cache.json`));

			let _elem_parentid = function (_this)
			{
				let a = [];
				let c = _this.parent();

				while (c && c.length && c[0].tagName == 'MarkerCategory')
				{
					a.unshift(c.attr('name'));

					c = c.parent();
				}

				//console.log(a);

				return a;
			};

			let _class_fn = function (_this, _class: string, _attr: IMarkerCategory): any|IMarkerCategory
			{
				switch (_class)
				{
					case 'poi-default':

						_attr.heightOffset = 1.5;

						break;
					case 'poi-plant':

						_attr.heightOffset = 1.6;

						break;
					case 'poi-chest':

						_attr.heightOffset = 1.6;

						break;
					case 'poi-chest-meta':

						_attr.heightOffset = 3.5;

						break;
					case 'icon-reset':

						_attr.iconFile = null;

						break;
					default:
						break;
				}

				return _attr;
			};

			cat.find('MarkerCategory[data-class*="iconsize"]')
				.each(function (i, elem)
				{
					let _this = cat.$(elem);

					let size;
					if (_this.attr('data-class').match(/(?:^|\s)iconsize\-([\d\.]+)(?:$|\s)/))
					{
						size = RegExp.$1;

						//console.log(size);

						_this
							.find('MarkerCategory[iconFile]:not([iconSize])')
							.attr('iconSize', size)
						;
					}

					//console.log(_this.attr('data-class'));
				})
			;

			cat.find('MarkerCategory[data-class*="size"]:not([iconSize])')
				.each(function (i, elem)
				{
					let _this = cat.$(elem);

					let size;
					if (_this.attr('data-class').match(/(?:^|\s)size\-([\d\.]+)(?:$|\s)/))
					{
						size = RegExp.$1;

						//console.log(size);

						_this
							.attr('iconSize', size)
						;
					}

					//console.log(_this.attr('data-class'));
				})
			;

			cat.find('MarkerCategory[data-class]')
				.each(function (i, elem)
				{
					let _this = cat.$(elem);

					let _class_a = _this.attr('data-class');

					if (typeof _class_a == 'undefined')
					{
						return;
					}

					_class_a = _class_a.toString().split(' ');

					let _attr = {} as IMarkerCategory;

					for (let _class of _class_a)
					{
						let ret = _class_fn(_this, _class, _attr);

						if (ret)
						{
							_attr = ret;
						}
					}

					cat.getStatic().attr(_this, _attr);
				})
			;

			cat.find('MarkerCategory[data-class*="fade"]')
				.each(function (i, elem)
				{
					let _this = cat.$(elem);

					if (!_this.attr('fadeFar') && !_this.attr('fadeNear'))
					{
						if (_this.attr('data-class').match(/(?:^|\s)fade\-([\da-zA-Z0-9\._\-]+)(?:$|\s)/))
						{
							let size = RegExp.$1;

							//console.log(size);

							let attr = {} as any;

							switch (size)
							{
								case '1':
									attr.fadeFar = 16800;
									attr.fadeNear = 8400;
									break;
								case 'max2':
									attr.fadeFar = 25200 + 16800;
									attr.fadeNear = 25200;
									break;
								case '2':
								case 'max':
									attr.fadeFar = 25200;
									attr.fadeNear = 16800;
									break;
								case '3':
									attr.fadeFar = 25200;
									attr.fadeNear = 8400;
									break;
								case '4':
									attr.fadeFar = 8400;
									attr.fadeNear = 2100;
									break;
								case '5':
								case 'min':
									attr.fadeFar = 2400;
									attr.fadeNear = 1200;
									break;
								case '6':
								case 'synthesizer':
									attr.fadeFar = 5600;
									attr.fadeNear = 4800;
									break;
								case 'raid':
									attr.fadeFar = 5600;
									attr.fadeNear = attr.fadeFar;
									break;
								case '7':
									attr.fadeFar = 10500;
									attr.fadeNear = 4200;
									break;
								case '8':
									attr.fadeFar = 5600;
									attr.fadeNear = 1200;
									break;
								case 'none':
									attr.fadeFar = '';
									attr.fadeNear = '';
									break;
							}

							cat.getStatic().attr(_this, attr);
						}
					}

					//console.log(_this.attr('data-class'));
				})
			;

			cat.find('MarkerCategory[data-class*="boss"]')
				.each(function (i, elem)
				{
					let _this = cat.$(elem);

					let size;
					if (_this.attr('data-class').match(/(?:^|\s)boss\-([\d\.]+)(?:$|\s)/))
					{
						size = RegExp.$1;

						if (!_this.attr('iconFile'))
						{
							_this.attr('iconFile', 'Data/Boss.png');
						}

						if (!_this.attr('heightOffset') && _this.attr('heightOffset') !== '0')
						{
							_this.attr('heightOffset', 3);
						}
					}

					//console.log(_this.attr('data-class'));
				})
			;

			cat.find('OverlayData > MarkerCategory')
				.each(function (i, elem)
				{
					let _this = cat.$(elem);

					if (!_this.attr('fadeFar') && !_this.attr('fadeNear'))
					{
						_this.attr('fadeFar', cat.root().attr('fadeFar'));
						_this.attr('fadeNear', cat.root().attr('fadeNear'));
					}

					if (!_this.attr('maxSize'))
					{
						_this.attr('maxSize', 256);
					}
				})
			;

			{
				let compareFn = function (a, b)
				{
					let nameA = a.toUpperCase();
					let nameB = b.toUpperCase();

					//console.log(nameA, nameB);

					if (nameA < nameB)
					{
						return -1;
					}
					else if (nameA > nameB)
					{
						return 1;
					}

					// names must be equal
					return 0;
				};

				cat.find('MarkerCategory[data-sort]')
					.each(function (i, elem)
					{
						let _this = cat.$(elem);

						let attr_sort = _this.attr('data-sort');

						if (attr_sort && attr_sort != 'false')
						{
							if (attr_sort == 'true')
							{
								attr_sort = 'name';
							}

							let p = [];
							for (let i = 0; i < elem.children.length; i++)
							{
								p.push(elem.children[i].attribs[attr_sort]);
							}
							p.sort();

							cu.sortByArray(elem, p, attr_sort);

							//console.log(elem.children);
						}
					})
				;
			}

			//console.log(cat.find('OverlayData > MarkerCategory').eq(0));

			return cat;
		})
	;

	await fs.outputFile(path.join(temp_root, `categorydata.cache.xml`), ls.dump());
});

gulp.task('category:undefined', ['category:cache'], async function ()
{
	const cu = require('./src/gw2taco/category/util');

	const currentTask = this.currentTask;
	const gw2taco_prefix = project_config.RUNTIME_PREFIX_TEMP;

	let patterns = [
		'categorydata.xml',
		'POIs/*.xml',
		`!${gw2taco_prefix}*.xml`,
		`!POIs/${gw2taco_prefix}*.xml`,
	];

	let options = {
		cwd: gw2taco_path,
		absolute: true,
	};

	/*
	let ls = await globby(patterns, options)
		.then(async (ls) =>
		{
			let ls2 = await globby(patterns, (options.cwd = path.join(dist_root, 'assets/gw2taco'), options));

			return ls.concat(ls2);
		})
		.then(cu.loadAll)
	*/

	let ls = await Category.load(path.join(temp_root, `categorydata.cache.xml`))
		.then(cat =>
		{
			let ls = [cat];

			ls.push(Category.load(path.join(dist_root, 'assets/gw2taco', `pois/${project_config.RUNTIME_PREFIX}Temp.xml`)));

			return Promise.all(ls);
		})
		.then(cu.allCatList)
		.then(ls =>
		{
			return cu.listToCat(ls, function (a, b, cat, ls)
			{
				let name_id = ls[b].name_id.substr(0);

				if (ls[b].parent_name)
				{
					let parent_name = Poi.normalize(ls[b].parent_name);
					parent_name = ls[parent_name].name_id;

					name_id = `${parent_name}.${ls[b].name}`;
				}

				let d = `${name_id}.undefined`;

				let c = !!ls[`${b}.undefined`] || b.name == 'undefined';

				//console[!c ? 'log' : 'error'](c, b, d);

				//console.error(ls[b].elem.attr('data-allowsub'));

				if (!c && (ls[b].elem.children().length || ls[b].elem.attr('data-allowsub')))
				{
					let p = cat.makeTree(d.split('.'), [], {
						gw2taco: true,
						lc: false,
						space: true,
					});
				}

				return a;
			});
		})
		.then(cat =>
		{
			cat.makeTree(`temp.undefined`.split('.'), []);
			cat.makeTree(`undefined`.split('.'), []);

			//console.log(`${cat.tagName}[name="undefined"]`);

			cat
				.find(`${cat.tagName}[name="undefined"]`)
				.each(function (i, elem)
				{
					cat.$(elem).appendTo(cat.$(elem).parent());
				})
			;

			return cat;
		})
	;

	await fs.outputFile(path.join(dist_root, 'assets/gw2taco', 'pois', `${gw2taco_prefix}undefined.xml`), ls.dump());
});

gulp.task('arcdps:evtc', async function ()
{
	const old = process.argv.slice(0);

	process.argv = [];

	try
	{
		await require('./bin/evtc');
	}
	finally
	{
		process.argv = old;
	}
});

gulp.task('category:attr', ['category:undefined', 'gw2taco:build-poi:default'], async function ()
{
	const cu = require('./src/gw2taco/category/util');

	let cat_cache = await Category.load(path.join(temp_root, `categorydata.cache.xml`));

	cat_cache = cat_cache.toList();

	let options = {
		cwd: path.join(dist_root, 'assets/gw2taco'),
		absolute: true,
	};

	let ls = await globby([
			'**/*.xml',
		], options)
		.then(async (list) =>
		{
			for (let file of list)
			{
				let doc = await Category.load(file);

				//console.log(doc);

				let ls = doc.toList();

				for (let id in ls)
				{
					if (cat_cache[id])
					{
						let attrs = {};

						for (let attr in cat_cache[id].elem[0].attribs)
						{
							if (attr == 'name') continue;

							let value = cat_cache[id].elem[0].attribs[attr];
							attrs[attr] = value;
						}

						//ls[id].elem[0].attribs = Object.assign(ls[id].elem[0].attribs, cat_cache[id].elem[0].attribs);
						ls[id].elem[0].attribs = Object.assign(ls[id].elem[0].attribs, attrs);
					}

					if (!ls[id].elem[0].attribs['DisplayName'] && Category.normalize2(ls[id].elem[0].attribs['name']) != ls[id].elem[0].attribs['name'])
					{
						ls[id].elem[0].attribs['DisplayName'] = ls[id].elem[0].attribs['name'];
					}
				}

				let out = doc.dump();

				await fs.writeFile(file, out);
			}
		})
	;

});

addGulpTasks({
	'category': {

		'sort': {

			async callback()
			{
				const currentTask = this.currentTask;
				const gw2taco_prefix = project_config.RUNTIME_PREFIX_TEMP;

				let patterns = [
					'categorydata.xml',
					'POIs/**/*.xml',
				];

				let options = {
					cwd: path.join(dist_root, 'assets/gw2taco'),
					absolute: true,
				};

				let cat_cache = await Category.load(path.join(temp_root, `categorydata.cache.xml`));
				cat_cache = cat_cache.toList();

				let ls = await globby(patterns, options)
					.then(async (ls) =>
					{
						for (let file of ls)
						{
							//console.log(file);

							let cat = await Category.load(file);

							cat.find('MarkerCategory[data-sort]')
								.each(function (i, elem)
								{
									let _this = cat.$(elem);

									let attr_sort = _this.attr('data-sort');

									if (attr_sort && attr_sort != 'false')
									{
										if (attr_sort == 'true')
										{
											attr_sort = 'name';
										}

										let p = [];
										for (let i = 0; i < elem.children.length; i++)
										{
											if (elem.children[i].type != 'tag')
											{
												continue;
											}

											p.push(elem.children[i].attribs[attr_sort]);
										}
										p.sort();

										cu.sortByArray(elem, p, attr_sort);

										//console.log(elem.children);
									}
								})
							;

							await fs.outputFile(file, cat.dump());
						}
					})
				;
			},

		},

	},
});

addGulpTasks({
	'default': {
		deps: [
			'category:attr',
		],

		tasks: [
			'category:sort',
			'gw2taco:maptimer:default',
			['tree:default', 'pack:default'],
		],
	},
});

function _search_icon(assets_iconfile, ...ids)
{
	for (let k of ids)
	{
		let ks = _make_img_ids(k);

		for (let k of ks)
		{
			if (assets_iconfile[k])
			{
				return assets_iconfile[k];
			}
		}
	}
}

function _make_img_ids(k)
{
	let ret = [k];

	if (k.match(/^(.+)s$/))
	{
		ret.push(RegExp.$1);
	}
	else
	{
		ret.push(RegExp.$1 + 's');
	}

	return ret;
}
