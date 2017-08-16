/**
 * Created by user on 2017/8/10/010.
 */

import { describe } from 'mocha';
import { expect } from'chai';

import local_dev, { path_relative } from './_local-dev';
import lib, { Node } from '../src/gw2taco';



//console.log(describe);

describe(path_relative(__filename), function ()
{
	describe('normalize:gw2taco', function ()
		{
			const fn = Node.normalize;

			let map = [
				[
					[`temp.One Path Ends.Storyteller: Abaddon`],
					'temp.One_Path_Ends.Storyteller__Abaddon',
				],

				[
					[`temp.Where’s Balthazar?.King Crab`],
					'temp.Where___s_Balthazar_.King_Crab',
				],

				[
					[`temp.Where's Balthazar?.King Crab`],
					'temp.Where_s_Balthazar_.King_Crab',
				],

				[
					[`temp.Where's Balthazar?.King Crab_`],
					'temp.Where_s_Balthazar_.King_Crab_',
				],
			];

			map.reduce((a, b) =>
			{
				/*
				b[0][1] = Object.assign({}, b[0][1], {
					gw2taco: true,
				});

				a.push(b);
				*/

				{
					let c = b.slice(0);
					c[0] = c[0].slice(0);

					c[0][1] = Object.assign({}, c[0][1], {
						gw2taco: true,
						lc: false,
					});

					a.push(c);
				}

				{
					let c = b.slice(0);
					c[0] = c[0].slice(0);

					c[0][1] = Object.assign({}, c[0][1], {
						gw2taco: true,
						lc: true,
					});

					c[1] = c[1].toLowerCase();

					a.push(c);
				}

				return a;
			}, []).forEach(function (v)
				{
					it(`${v[1]} <= ${v[0][0]}`, () =>
						{
							expect(fn(...v[0])).to.deep.equal(v[1]);
						}
					);
				}
			)
		}
	);

	describe('normalize', function ()
		{
			const fn = Node.normalize;

			let map = [
				[
					[`temp.One Path Ends.Storyteller: Abaddon`],
					'temp.One_Path_Ends.Storyteller_Abaddon',
				],

				[
					[`temp.One Path Ends.Storyteller:                  Abaddon`],
					'temp.One_Path_Ends.Storyteller_Abaddon',
				],

				[
					[`temp.Where’s Balthazar?.King Crab`],
					'temp.Wheres_Balthazar.King_Crab',
				],

				[
					[`temp.Where's Balthazar?.King Crab`],
					'temp.Wheres_Balthazar.King_Crab',
				],

				[
					[`temp.Where's Balthazar?.King Crab_`],
					'temp.Wheres_Balthazar.King_Crab',
				],
			];

			map.reduce((a, b) =>
			{
				b[0][1] = Object.assign({}, b[0][1], {
					gw2taco: false,
					lc: false,
				});

				a.push(b);

				{
					let c = b.slice(0);
					c[0] = c[0].slice(0);

					c[0][1] = Object.assign({}, c[0][1], {
						gw2taco: false,
						lc: true,
					});

					c[1] = (c[1] as string).toLowerCase();

					a.push(c);
				}

				return a;
			}, []).forEach(function (v)
				{
					it(`${v[1]} <= ${v[0][0]}`, () =>
						{
							expect(fn(...v[0])).to.deep.equal(v[1]);
						}
					);
				}
			)
		}
	);
});
