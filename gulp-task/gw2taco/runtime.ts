/**
 * Created by user on 2017/8/30/030.
 */

import gulp from '../../src/gulp/hook';

import fs from '../../src/lib/fs';
import * as path from 'path';
import * as globby from 'globby';
import * as Promise from 'bluebird';
import * as minimatch from 'minimatch';
import * as globule from 'globule';

import project_config, { project_root, dist_root, temp_root, gw2taco_path } from '../../project.config';

import gw2taco, { Category, Node, Poi } from '../../src/gw2taco';
import * as cu from '../../src/gw2taco/category/util';
import * as myutil from '../../src/lib/util';
import gw2api, { getMapAll, getMapInfo } from '../../src/gw2api/map';

import addTasks from 'gulp-add-tasks2';

const addGulpTasks = addTasks(gulp, ['gw2taco', 'runtime']);

addGulpTasks({
	'export': {

		deps: [
			'gw2api:cache:map',
		],

		async callback()
		{
			const assets_iconfile = require(path.join(temp_root, `assets.gw2taco.cache.json`));
			let cats = await Category.load(path.join(temp_root, `categorydata.cache.xml`))
				.then(cu.allCatList)
			;

			let _cache_ = require(path.join(temp_root, 'gw2api', 'maps.json'));

			let pois_new = {};
			let pois = await Poi.load(path.join(gw2taco_path, 'poidata.xml'));

			let types = [
				'resourcenode.other.leather',
				'resourcenode.other.cloth',
				'resourcenode.mapspecific.ore.lump_of_aurillium',
				'resourcenode.other.watchwork_sprocket',
				'tactical.guildmission.trek',
				'resourcenode.mapspecific.synthesizer',
				'resourcenode.mapspecific.plant.toxic_seedling',
				'ls.ls3.flashpoint.lessons_learned',
			];

			let types2 = {
				//'temp.one_path_ends.storyteller__abaddon': 'LS/OnePathEnds/Storyteller_Abaddon',
				'temp.aurora.aurora_ii__empowering': [
					'Achievement',
					'Legendary Trinkets',
					'Aurora',
					'Aurora II: Empowering',
				],
			};

			const map_home = [
				'371',
			];

			const map_gh = [
				'1124',
				'1121',
				'1232',
			];

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

					let map_id = elem.attr('MapID').toString();

					POIS:
					{
						//console.log(type);

						let pois_target_id: any = '.';

						if (0)
						{
							//
						}
						else if (cats[type] && map_home.includes(map_id))
						{
							pois_target_id = [
								'MapSpecific',
								'Home',
							];

							type_new = cats[type].name_id.split('.');

							if (_cache_[map_id])
							{
								map_id += '_' + _cache_[map_id].name;
							}

							pois_target_id[pois_target_id.length] = 'Home' + '_' + map_id;
						}
						else if (cats[type] && map_gh.includes(map_id))
						{
							pois_target_id = [
								'MapSpecific',
								'Guild Hall',
							];

							type_new = cats[type].name_id.split('.');

							if (_cache_[map_id])
							{
								map_id += '_' + _cache_[map_id].name;
							}

							pois_target_id[pois_target_id.length] = 'Guild Hall' + '_' + map_id;
						}
						else if (types2[type])
						{
							pois_target_id = types2[type];
						}
						else if (cats[type] && types.includes(type))
						{
							//pois_target_id = type;
							pois_target_id = cats[type].name_id.split('.');
						}
						else if (cats[type] && type.match(/^(?:tactical\.juvenile_pets)\.(.+)$/i))
						{
							pois_target_id = cats[type].name_id.split('.');
						}
						else if (cats[type] && type.match(/^(?:resourcenode\.wood)\.(.+)$/i))
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
						else if (cats[type] && type.match(/^(?:divinggoggles)\.(.+)$/i))
						{
							pois_target_id = [
								'DivingGoggles',
							];

							type_new = cats[type].name_id.split('.');
						}
						else if (cats[type] && type.match(/^(?:jumpingpuzzle)\.(.+)$/i))
						{
							pois_target_id = [
								'JumpingPuzzle',
							];

							type_new = cats[type].name_id.split('.');
						}
						else if (type.match(/^(?:temp\.path_of_fire)\.(.+)$/i))
						{
							pois_target_id = [
								'Achievement',
								'Path of Fire',
							];

							let k = RegExp.$1;

							switch (k)
							{
								case 'elon_riverlands.ghostly_trio':
								case 'elon_riverlands.ghostly_trio.path':

									pois_target_id = pois_target_id
										.concat([
											'Elon Riverlands',
											'Ghostly Trio',
										])
									;

									type_new = pois_target_id.slice(0);

									if (k == 'elon_riverlands.ghostly_trio.path')
									{
										type_new.push('Path');
									}

									break;
								case 'the_desolation.shadows_provisions':

									pois_target_id = pois_target_id
										.concat([
											'The Desolation',
											'Shadows Provisions',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'griffon':
								case 'open_skies__sunspear_sanctuary.open_skies__crystal_oasis':
								case 'open_skies__sunspear_sanctuary.open_skies__elon_riverlands':
								case 'open_skies__sunspear_sanctuary.open_skies__desert_highlands':
								case 'open_skies__sunspear_sanctuary.open_skies__the_desolation':
								case 'open_skies__sunspear_sanctuary':
								case 'open_skies__sunspear_sanctuary.open_skies__sunspear_vvrsdom':
								case 'open_skies__sunspear_sanctuary.open_skies__on_wings_and_a_prayer':

									pois_target_id = pois_target_id
										.concat([
											'Open Skies',
										])
									;

									type_new = pois_target_id.slice(0);

									switch (k)
									{
										case 'griffon':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
													'Domain of Vabbi',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary.open_skies__crystal_oasis':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
													'Crystal Oasis',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary.open_skies__elon_riverlands':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
													'Elon Riverlands',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary.open_skies__desert_highlands':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
													'Desert Highlands',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary.open_skies__the_desolation':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
													'The Desolation',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary.open_skies__sunspear_vvrsdom':

											type_new = type_new
												.concat([
													'Sunspear Sanctuary',
													'Sunspear Wisdom',
												])
											;

											break;
										case 'open_skies__sunspear_sanctuary.open_skies__on_wings_and_a_prayer':

											type_new = type_new
												.concat([
													'On Wings and a Prayer',
												])
											;

											break;
										default:
											break POIS;
									}

									break;
								case 'desert_highlands.hidden_carrot_hunt':

									pois_target_id = pois_target_id
										.concat([
											'Desert Highlands',
											'Hidden Carrot Hunt',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'desert_highlands.carrot_collector':

									pois_target_id = pois_target_id
										.concat([
											'Desert Highlands',
											'Carrot Collector',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'glorify_the_golden_heart':

									pois_target_id = pois_target_id
										.concat([
											'Glorify the Golden Heart',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case '2.facing_the_truth.seeker_of_truth_and_knowledge':

									pois_target_id = [
										'LS',
										'Path of Fire',
									];

									pois_target_id = pois_target_id
										.concat([
											'Act 2',
											'Facing the Truth',
											'Seeker of Truth and Knowledge',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case '2.facing_the_truth.goddess_of_secrets':

									pois_target_id = [
										'LS',
										'Path of Fire',
									];

									pois_target_id = pois_target_id
										.concat([
											'Act 2',
											'Facing the Truth',
											'Goddess of Secrets',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case '2.facing_the_truth.wedge_symbol':

									pois_target_id = [
										'LS',
										'Path of Fire',
									];

									pois_target_id = pois_target_id
										.concat([
											'Act 2',
											'Facing the Truth',
											'Wedge Symbol',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'the_desolation.lost_lore_of_the_desolation':

									pois_target_id = pois_target_id
										.concat([
											'The Desolation',
											'Lost Lore of the Desolation',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'domain_of_vabbi.lost_lore_of_the_domain_of_vabbi':

									pois_target_id = pois_target_id
										.concat([
											'Domain of Vabbi',
											'Lost Lore of the Domain of Vabbi',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'elon_riverlands.lost_lore_of_elon_riverlands':

									pois_target_id = pois_target_id
										.concat([
											'Elon Riverlands',
											'Lost Lore of Elon Riverlands',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'crystal_oasis.lost_lore_of_crystal_oasis':

									pois_target_id = pois_target_id
										.concat([
											'Crystal Oasis',
											'Lost Lore of Crystal Oasis',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'desert_highlands.lost_lore_of_desert_highlands':

									pois_target_id = pois_target_id
										.concat([
											'Desert Highlands',
											'Lost Lore of Desert Highlands',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'the_desolation.acrid_springs_recovery':

									pois_target_id = pois_target_id
										.concat([
											'The Desolation',
											'Acrid Springs Recovery',
										])
									;

									type_new = pois_target_id.slice(0);

									break;
								case 'crystal_oasis.casino_blits.1':
								case 'crystal_oasis.casino_blits.2':
								case 'crystal_oasis.casino_blits.3':
								case 'crystal_oasis.casino_blits.boss':

									pois_target_id = [
										'Tactical',
										'Path of Fire',
									];

									pois_target_id = pois_target_id
										.concat([
											'Casino Blits',
										])
									;

									type_new = pois_target_id.slice(0);

									switch (k)
									{
										case 'crystal_oasis.casino_blits.1':

											type_new = type_new
												.concat([
													'Round 1',
												])
											;

											break;
										case 'crystal_oasis.casino_blits.2':

											type_new = type_new
												.concat([
													'Round 2',
												])
											;

											break;
										case 'crystal_oasis.casino_blits.3':

											type_new = type_new
												.concat([
													'Round 3',
												])
											;

											break;
										case 'crystal_oasis.casino_blits.boss':

											type_new = type_new
												.concat([
													'Boss',
												])
											;

											break;
										default:
											break POIS;
									}

									break;
								case '2.the_way_forward.walk_a_fine_line':
								case '2.the_way_forward.walk_a_fine_line.point':

									pois_target_id = [
										'LS',
										'Path of Fire',
									];

									pois_target_id = pois_target_id
										.concat([
											'Act 2',
											'The Way Forward',
											'Walk a Fine Line',
										])
									;

									type_new = pois_target_id.slice(0);

									if (k == '2.the_way_forward.walk_a_fine_line.point')
									{
										type_new = type_new
											.concat([
												'Point',
											])
										;
									}

									break;
								default:
									break POIS;
								//break;
							}
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
								case 'mapspecific.keyrequired':

									type_new = type_new
										.concat([
											'MapSpecific',
											'KeyRequired',
										])
									;

									break;
								case 'mapspecific.undefined':

									type_new = type_new
										.concat([
											'MapSpecific',
											'undefined',
										])
									;

									console.log(k);

									break;
								case 'meta':
								case 'permanent':

									type_new = cats[type] ? cats[type].name_id : type;

									break;
								case 'mapspecific.auricbasin':
								case 'mapspecific.tangleddepths':
								case 'mapspecific.verdantbrink':

									type_new = cats[type] ? cats[type].name_id : type;

									break;
								default:
									break POIS;
								//break;
							}

							let map_id = elem.attr('MapID');

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

								case 'ore.currency':

									pois_target_id[2] = 'Ore';
									type_new = pois_target_id.slice(0);

									if (_cache_[map_id])
									{
										map_id += '_' + _cache_[map_id].name;
									}

									pois_target_id[pois_target_id.length - 1] = 'Currency_' + map_id;

									break;
								case 'plant.currency':

									pois_target_id[2] = 'Plant';
									type_new = pois_target_id.slice(0);

									if (_cache_[map_id])
									{
										map_id += '_' + _cache_[map_id].name;
									}

									pois_target_id[pois_target_id.length - 1] = 'Currency_' + map_id;

									break;
								case 'wood.currency':

									pois_target_id[2] = 'Wood';
									type_new = pois_target_id.slice(0);

									if (_cache_[map_id])
									{
										map_id += '_' + _cache_[map_id].name;
									}

									pois_target_id[pois_target_id.length - 1] = 'Currency_' + map_id;

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
				let name = pois_target_id;

				let pois_target = get_pois_new(pois_target_id, pois_new);

				//await fs.outputFile(path.join(temp_root, `temp/${name}.poi.xml`), pois_target.poi.dump());
				//await fs.outputFile(path.join(temp_root, `temp/${name}.cat.xml`), pois_target.cat.dump());

				pois_target.cat_root.append(pois_target.poi_root);
				await fs.outputFile(pois_target.file, pois_target.cat.dump());
			}

			await fs.outputFile(path.join(gw2taco_path, 'poidata.xml'), pois.dump());
		}
	}
});

function get_pois_new(id, pois_new = {})
{
	if (!pois_new[id])
	{
		pois_new[id] = {};

		let name = id;

		pois_new[id].file_src = path.join(project_root, 'assets/gw2taco/POIs', `${name}.xml` + (/_bak$/.test(name)
			? '.bak'
			: ''));
		pois_new[id].file = path.join(temp_root, `runtime/${name}.xml` + (/_bak$/.test(name) ? '.bak' : ''));

		if (fs.existsSync(pois_new[id].file_src) && !/_bak$/.test(name))
		{
			pois_new[id].poi = Poi.loadSync(pois_new[id].file_src);
			pois_new[id].cat = Category.loadSync(pois_new[id].file_src);

			pois_new[id].cat.find('OverlayData > POIs').remove();
		}
		else
		{
			pois_new[id].poi = Poi.init();
			pois_new[id].cat = Category.init();

			pois_new[id].cat.filter().remove();
		}

		pois_new[id].poi_root = pois_new[id].poi.root();
		pois_new[id].cat_root = pois_new[id].cat.root();
	}

	return pois_new[id];
}
