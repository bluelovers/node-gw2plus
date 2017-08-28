/**
 * Created by user on 2017/8/6/006.
 */

import * as cheerio from 'cheerio';

import * as Node from './node';
import * as Poi from './poi';
import { overwrite } from 'core-decorators';

import { getClassStatic } from '../lib/util';
import { objectReduce } from '../lib/object';

import * as path from 'path';

export interface toListObject
{
	name: string;
	name_id: string;
	name_id_lc: string;
	parent_name: string;
	elem: cheerio;
}

class Category extends Node
{
	static defaultContext = '<OverlayData><MarkerCategory/></OverlayData>';
	static defaultFilter = 'OverlayData > MarkerCategory';
	static defaultTagName: string = 'MarkerCategory';

	toList(): toListObject
	{
		let self = this;

		let top = this.filter();

		let list = {};

		let fn = function (dom, parent_name, list)
		{
			dom.each(function (index, element)
			{
				let _this = self.$(this);

				let name = _this.attr('name');

				let name_id = `${parent_name}.${name}`.replace(/^\./, '');
				let name_id_lc = name_id.toLowerCase();

				let id = Poi.normalize(name_id_lc);

				list[id] = {
					name: name,
					name_id: name_id,
					name_id_lc: name_id_lc,
					parent_name: parent_name,
					elem: _this,
				};

				//console.log(999, name_id, Object.keys(list).length);

				let c = _this.children();

				if (c.length)
				{
					list = fn(c, name_id, list);
				}
			});

			return list;
		};

		list = fn(top, '', list);

		//console.log('list', Object.keys(list).length);

		return list as toListObject;
	}

	makeTree(list, skip = [], options?: object)
	{
		let tagName = getClassStatic(this).defaultTagName;
		let root = this.root();

		for (let name of list)
		{
			if (skip.includes(name))
			{
				break;
			}

			let name_id = getClassStatic(this).normalize2(name, options);

			let p = root.find(` > ${tagName}[name="${name_id}"]`);

			if (!p.length)
			{
				let elem = this.makeTagNode(name_id, options);

				root.append(elem);

				p = root.find(` > ${tagName}[name="${name_id}"]`);
			}

			root = p;
		}

		return root;
	}

	@overwrite
	makeTagNode(callback?, options?)
	{
		let elem = super.makeTagNode(callback, options);

		if (typeof callback == 'string' && elem.attr('name') != callback)
		{
			elem.attr('DisplayName', callback);
		}

		return elem;
	}

	@overwrite
	static handleAttr(attr: object)
	{
		return objectReduce(attr, function(a, b)
		{
			let skip;
			let value = this[b];

			switch (b.toLowerCase())
			{
				case 'iconfile':
					b = 'iconFile';
					value = value.replace(/\\/g, '/');
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
	static normalize(name: string, options?)
	{
		options = Object.assign({
			lc: false,
		}, options);

		return super.normalize(name, options);
	}

	@overwrite
	static normalize2(name: string, options: object)
	{
		options = Object.assign({
			space: false,
			lc: false,
		}, options);

		return super.normalize2(name, options);
	}
}

export = Category;
