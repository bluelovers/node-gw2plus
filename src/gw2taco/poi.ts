/**
 * Created by user on 2017/8/6/006.
 */

import * as Node from './node';
import * as cheerio from 'cheerio';
import { overwrite } from 'core-decorators';

import { objectReduce } from '../lib/object';

class Poi extends Node
{
	static defaultContext = '<OverlayData><POIs/></OverlayData>';
	static defaultFilter = 'POI';
	static defaultRoot: string = 'POIs';
	static defaultTagName: string = 'POI';

	@overwrite
	static handleAttr(attr: object)
	{
		return objectReduce(attr, function(a, b)
		{
			let skip;
			let value = this[b];

			switch (b.toLowerCase())
			{
				case 'map':
					b = 'MapID';
					break;
				case 'x':
				case 'y':
				case 'z':
					b += 'pos';
					break;
				case 'guid':
					b = 'GUID';
					break;
				default:
					break;
			}

			if (!skip)
			{
				a[b] = value;
			}

			return a;
		});
	}

	@overwrite
	static normalize(name: string, options: object)
	{
		options = Object.assign({
			space: false,
			lc: true,
		}, options);

		return super.normalize(name, options);
	}

	@overwrite
	static normalize2(name: string, options: object)
	{
		options = Object.assign({
			space: false,
			lc: true,
		}, options);

		return super.normalize2(name, options);
	}
}

export = Poi;
