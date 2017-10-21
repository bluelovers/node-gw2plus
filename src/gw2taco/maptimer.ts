/**
 * Created by user on 2017/8/6/006.
 */

import * as Node from './node';

import * as cheerio from 'cheerio';
import { overwrite } from 'core-decorators';

import { objectReduce } from '../lib/object';

class MapTimer extends Node
{
	static defaultContext = '<GW2MapTimer><Map/></GW2MapTimer>';
	static defaultFilter = 'GW2MapTimer > Map';
	static defaultRoot: string = 'GW2MapTimer';
	static defaultTagName: string = 'Map';
	static defaultSubTagName: string = 'Event';

	filterEvent()
	{
		let _self = this;

		let eventTagName = _self.getStatic().defaultSubTagName;

		let es = _self.find(eventTagName);

		return es;
	},

	createPadding(maps)
	{
		let _self = this;

		let eventTagName = _self.getStatic().defaultSubTagName;

		maps.each(function ()
		{
			let _map = _self.$(this);

			let len = _map.attr('Length');
			let pad = len;

			let ev = _map.find(`${eventTagName}[data-class*="auto-pad"]`).remove();
			let es = _map.find(eventTagName);

			if (ev.length == 1)
			{
				es.each(function ()
				{
					let _this = _self.$(this);

					if (_this.attr('Length') == '' || typeof _this.attr('Length') == 'undefined')
					{
						_this.attr('Length', len);
					}

					pad -= _this.attr('Length');
				});
			}
			else
			{
				es.each(function ()
				{
					let _this = _self.$(this);

					pad -= _this.attr('Length');
				});
			}

			if (pad > 0)
			{
				if (!ev.length)
				{
					ev = _self.$(`<${eventTagName}/>`)
						.attr({
							'data-class': 'auto-pad',
						})
					;
				}

				if (ev.attr('Name') === '' || typeof ev.attr('Name') == 'undefined')
				{
					let name = _map.attr('Name');

					if (es.length == 1)
					{
						name = es.attr('Name');
					}

					ev.attr('Name', `Next: ${name}`);
				}

				ev
					.attr('Length', pad)
					.appendTo(_map)
				;
			}
		});

		return maps;
	}

}

export = MapTimer;
