/**
 * Created by user on 2017/8/11/011.
 */

import { Category, Node, Poi } from '../src/gw2taco';
import * as path from 'path';

import * as cu from '../src/gw2taco/category/util';
import * as fs from '../src/lib/fs';
import * as myutil from '../src/lib/util';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../project.config';

(async () =>
{
	const assets_iconfile = require(path.join(temp_root, `assets.gw2taco.cache.json`));
	let cats = await Category.load(path.join(temp_root, `categorydata.cache.xml`))
		.then(cu.allCatList)
	;

	//await fs.emptyDir(path.join(temp_root, `temp`));

	let pois_new = {};

	let pois = await Poi.load(path.join(gw2taco_path, 'poidata.xml'));

	let types = [

	];

	let types2 = {
		//'temp.one_path_ends.storyteller__abaddon': 'LS/OnePathEnds/Storyteller_Abaddon',
	};

	pois.filter()
		.each(function (i, elem)
		{
			let _this = pois.$(elem);

			let type = _this.attr('type');

			if (/^temp/.test(type))
			{
				let elem = _this.clone();

				let type_new = type;

				POIS:
				{
					let pois_target_id = '.';

					if (types2[type])
					{
						pois_target_id = types2[type];
					}
					else if (types.includes(type))
					{
						pois_target_id = type;
					}
					else if (/^temp\.one_path_ends\.storyteller/.test(type))
					{
						pois_target_id = [
							'LS',
							'LS3',
							'One Path Ends',
							'Storyteller',
						];
						
						type_new = type.replace(/^temp\.one_path_ends\.storyteller_+(.+)$/, function (match, $1, $2)
						{
							return pois_target_id.join('.') + '.' + myutil.upperCamelCase($1);
						});
					}
					else if (/^temp.where___s_balthazar_.art_critic$/.test(type))
					{
						pois_target_id = [
							'LS',
							'LS3',
							'One Path Ends',
							'Where\'s Balthazar?',
							'Art Critic',
						];

						type_new = pois_target_id.join('.');
					}
					else if (/^temp.lessons_learned_flashpoint$/.test(type))
					{
						pois_target_id = [
							'LS',
							'LS3',
							'Flashpoint',
							'Lessons Learned',
						];

						type_new = pois_target_id.join('.');
					}
					else if (/^temp.head_of_the_snake.a_meeting_of_ministers\./.test(type))
					{
						pois_target_id = [
							'LS',
							'LS3',
							'The Head of the Snake',
							'A Meeting of Ministers',
						];

						type_new = type
							.replace(/^temp.head_of_the_snake.a_meeting_of_ministers\./, '')
							.split('_').map(v => myutil.upperCamelCase(v)).join(' ')
						;

						pois_target_id.push(type_new);

						type_new = pois_target_id;
					}
					else if (/^temp.where___s_balthazar_\./.test(type))
					{
						pois_target_id = [
							'LS',
							'LS3',
							'One Path Ends',
							'Where\'s Balthazar?',
						];

						type_new = type
							.replace(/^temp.where___s_balthazar_\./, '')
							.split('_').map(v => myutil.upperCamelCase(v)).join(' ')
						;

						pois_target_id.push(type_new);

						type_new = pois_target_id;
					}
					else if (/^temp.one_path_ends\./.test(type))
					{
						pois_target_id = [
							'LS',
							'LS3',
							'One Path Ends',
						];

						type_new = type
							.replace(/^temp.one_path_ends\./, '')
							.split('_').map(v => myutil.upperCamelCase(v)).join(' ')
						;

						pois_target_id.push(type_new);

						type_new = pois_target_id;
					}
					else if (type == 'temp.cin_business')
					{
						pois_target_id = [
							'LS',
							'LS3',
							'The Head of the Snake',
							'Cin Business',
						];

						type_new = pois_target_id;
					}
					else if (type == 'temp.not_all_who_wander_are_lost')
					{
						pois_target_id = [
							'LS',
							'LS3',
							'The Head of the Snake',
							'Not All Who Wander Are Lost',
						];

						type_new = pois_target_id;
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
		})
	;

	for (let pois_target_id in pois_new)
	{
		let pois_target = get_pois_new(pois_target_id, pois_new);

		let name = pois_target_id;

		//await fs.outputFile(path.join(temp_root, `temp/${name}.poi.xml`), pois_target.poi.dump());
		//await fs.outputFile(path.join(temp_root, `temp/${name}.cat.xml`), pois_target.cat.dump());

		pois_target.cat_root.append(pois_target.poi_root);
		await fs.outputFile(path.join(temp_root, `temp/${name}.xml` + (/_bak$/.test(name) ? '.bak' : '')), pois_target.cat.dump());
	}

	await fs.outputFile(path.join(gw2taco_path, 'poidata.xml'), pois.dump());

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
