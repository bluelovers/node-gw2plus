/**
 * Created by user on 2017/8/11/011.
 */

import { Category, Node, Poi } from '../src/gw2taco';
import * as path from 'path';

import * as cu from '../src/gw2taco/category/util';
import fs from '../src/lib/fs';
import * as myutil from '../src/lib/util';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

const gw2taco_path_old = path.join(project_root, 'vendor/GW2TacO');

import gw2api, { getMapAll, getMapInfo } from '../src/gw2api/map';

(async () =>
{
	const assets_iconfile = require(path.join(temp_root, `assets.gw2taco.cache.json`));
	let cats = await Category.load(path.join(temp_root, `categorydata.cache.xml`))
		.then(cu.allCatList)
	;

	//await fs.emptyDir(path.join(temp_root, `temp`));

	let pois_new = {};

	let pois = await Poi.load(path.join(gw2taco_path_old, 'poidata.xml'));

	let types = [
		'tactical.guildmission.trek',
	];

	let _cache_ = {};

	let types2 = {
		'temp.nevermore iii': [
			'Achievement',
			'Legendary Weapons',
			'Nevermore',
			'Nevermore III',
		],
		'temp.nevermore iv': [
			'Achievement',
			'Legendary Weapons',
			'Nevermore',
			'Nevermore IV',
		],
		'resourcenode.ore.normal.quartzcrystal': [
			'ResourceNode',
			'Other',
			'QuartzCrystal',
		],
		'resourcenode.ore.rich.quartzcrystal': [
			'ResourceNode',
			'Other',
			'QuartzCrystal',
		],
		'temp.thorough sampling trigger': [
			'LS',
			'LS3',
			'A Crack in the Ice',
			'Thorough Sampling',
		],
		'resourcenode.other.candy corn': [
			'ResourceNode',
			'Other',
			'Candy Corn',
		],
	};

	let ls = pois.filter();

	//console.log(ls);

	for (let i in Object.keys(ls))
	{
		let elem = ls[i];

		let _this = pois.$(elem);

		let type = _this.attr('type');

		if (type && !type.match(/undefined/))
		{
			let elem = _this.clone();

			let type_new = null;

			POIS:
			{
				//console.log(type);

				let pois_target_id: any = '.';

				if (types2[type])
				{
					pois_target_id = types2[type];
				}
				else if (types.includes(type))
				{
					pois_target_id = type;
				}
				else if (cats[type] && type.match(/^(?:resourcenode.wood)\.(.+)$/i))
				{
					pois_target_id = cats[type].name_id.split('.');
					type_new = pois_target_id.slice(0);

					pois_target_id[pois_target_id.length - 1]
						= pois_target_id[1] + '_' + pois_target_id[pois_target_id.length - 1];
				}
				else if (cats[type] && type.match(/^(?:resourcenode.ore.rich)\.(.+)$/i))
				{
					pois_target_id = [
						'ResourceNode',
						'Ore',
						'Rich',
					];
					type_new = cats[type].name_id;

					pois_target_id[pois_target_id.length - 1]
						= pois_target_id[1] + '_' + pois_target_id[pois_target_id.length - 1];
				}
				else if (cats[type] && type.match(/^(?:resourcenode.ore.normal)\.(.+)$/i))
				{
					pois_target_id = cats[type].name_id.split('.');
					type_new = pois_target_id.slice(0);

					pois_target_id[pois_target_id.length - 1]
						= pois_target_id[1] + '_' + pois_target_id[pois_target_id.length - 1];
				}
				else if (cats[type] && type.match(/^(?:resourcenode.plant)\.(.+)$/i))
				{
					pois_target_id = cats[type].name_id.split('.');
					type_new = pois_target_id.slice(0);

					pois_target_id[pois_target_id.length - 1]
						= pois_target_id[1] + '_' + pois_target_id[pois_target_id.length - 1];
				}
				else if (type.match(/^(?:chest)\.(.+)$/i))
				{
					pois_target_id = [
						'Chest',
					];

					type_new = pois_target_id.slice(0);

					let k = RegExp.$1;

					switch (k)
					{
						case 'mapspecific.ember bay':
						case 'mapspecific.bitterfrost frontier':

							type_new = type_new
								.concat([
									'MapSpecific',
									'KeyRequired',
								])
							;

							break;
						case 'meta':
						case 'permanent':

							type_new = cats[type] ? cats[type].name_id : type;

							break;
						default:
							break POIS;
							//break;
					}

					let map_id = elem.attr('MapID');

					if (!Object.keys(_cache_).length)
					{
						_cache_ = await gw2api.getMapAll();
					}

					//console.log(map_id, _cache_[map_id].name);

					if (_cache_[map_id])
					{
						pois_target_id.push(_cache_[map_id].region_name);

						map_id += '_' + _cache_[map_id].name;
					}

					pois_target_id[pois_target_id.length] = 'Chest' + '_' + map_id;
				}
				else if (type.match(/^(?:resourcenode\.mapspecific|resourcenode.wood|resourcenode.ore.normal)\.(.+)$/i))
				{
					let k = RegExp.$1;

					pois_target_id = [
						'ResourceNode',
						'MapSpecific',
						'Plant',
						'Currency',
					];

					switch (k)
					{
						case 'winterberrie':

							pois_target_id[2] = 'Plant';

							type_new = pois_target_id.slice(0);
							pois_target_id[pois_target_id.length - 1] = 'Currency_' + 'Fresh Winterberry';

							break;
						case 'petrified':

							pois_target_id[2] = 'Wood';

							type_new = pois_target_id.slice(0);
							pois_target_id[pois_target_id.length - 1] = 'Currency_' + 'Petrified Wood';

							break;
						case 'bloodstone crystals':

							pois_target_id[2] = 'Ore';

							type_new = pois_target_id.slice(0);
							pois_target_id[pois_target_id.length - 1] = 'Currency_' + 'Blood Ruby';

							break;
						default:

							break POIS;

							//break;
					}

					//console.log(777, pois_target_id, type_new);

					//break POIS;
				}
				else
				{
					break POIS;
				}

				let options = {
					gw2taco: false,
					lc: false,
					space: true,
				};

				if (Array.isArray(pois_target_id))
				{
					pois_target_id = pois_target_id
						.map(v =>
						{
							return Category.normalize(v, options);
						})
						.join('/')
					;
				}

				if (type_new === null)
				{
					type_new = pois_target_id.split('/');
				}

				if (Array.isArray(type_new))
				{
					type_new = type_new
						.map(v =>
						{
							return Category.normalize(v, options);
						})
						.join('.')
					;
				}

				let pois_target = get_pois_new(pois_target_id, pois_new);

				type_new = Category.normalize(type_new, options);

				let c = pois_target.cat.makeTree(type_new.split('.'), [], options);

				elem.attr('type', Poi.normalize2(type_new));

				pois_target.poi_root.append(elem);

				{
					let elem = _this.clone();

					let pois_target = get_pois_new(pois_target_id + '_bak', pois_new);
					pois_target.poi_root.append(elem);
				}

				_this.remove();
			}
		}

		//console.log(i, type);
	}
	;

	for (let pois_target_id in pois_new)
	{
		let pois_target = get_pois_new(pois_target_id, pois_new);

		let name = pois_target_id;

		//await fs.outputFile(path.join(temp_root, `temp/${name}.poi.xml`), pois_target.poi.dump());
		//await fs.outputFile(path.join(temp_root, `temp/${name}.cat.xml`), pois_target.cat.dump());

		pois_target.cat_root.append(pois_target.poi_root);
		await fs.outputFile(path.join(temp_root, `temp/import/${name}.xml` + (/_bak$/.test(name)
			? '.bak'
			: '')), pois_target.cat.dump());
	}

	await fs.outputFile(path.join(gw2taco_path_old, 'poidata.xml'), pois.dump());

	//console.log(cats);
})();

function get_pois_new(id, pois_new = {})
{
	if (!pois_new[id])
	{
		pois_new[id] = {};

		pois_new[id].poi = Poi.init();
		pois_new[id].poi_root = pois_new[id].poi.root();

		pois_new[id].cat = Category.init();
		pois_new[id].cat_root = pois_new[id].cat.root();

		pois_new[id].cat.filter().remove();
	}

	return pois_new[id];
}
