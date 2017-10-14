/**
 * Created by user on 2017/8/8/008.
 */

import * as Category from '../category';
import * as path from 'path';
import fs from '../../lib/fs';
import * as Promise from 'bluebird';
import * as Node from '../node';

export interface allCatListOptions
{
	merge?: boolean;
	overwite?: boolean;
}

export interface listToCatOptions extends Node.normalizeOptions
{
	skip?: Array<string>;
}

export async function loadAll(ls: Array<Category>, options = { cwd: '' }): Promise<Array<Category>>
{
	let a = [];

	for (let b of ls)
	{
		if (b instanceof Category)
		{
			a.push(b);
		}
		else if (typeof b == 'string')
		{
			let p = Category.load(path.isAbsolute(b) ? b : path.join(options.cwd || '', b), options);

			a.push(p);
		}
	}

	return Promise.all(a);
}

export function allCatList(ls: Array<Category>, options: allCatListOptions = {})
{
	if (ls instanceof Category)
	{
		return ls.toList();
	}

	return ls.reduce((a, b) =>
	{
		let d = b.toList();

		if (options.merge)
		{
			for (let id in d)
			{
				if (a[id])
				{
					for (let attr in d[id].elem[0].attribs)
					{
						if (attr != 'name')
						{
							if (options.overwite || (a[id].elem[0].attribs[attr] === '' || typeof a[id].elem[0].attribs[attr] == 'undefined'))
							{
								a[id].elem[0].attribs[attr] = d[id].elem[0].attribs[attr];
							}
						}
					}
				}
				else
				{
					a[id] = d[id];
				}
			}
		}
		else
		{
			Object.assign(a, d);
		}

		return a;
	}, {});
}

export function listToCat(ls: object, options: listToCatOptions | Function = {}, callback?: Function): Category
{
	let cat = Category.init();
	cat.filter().remove();

	let a = cat.root();

	if (typeof options == 'function')
	{
		callback = options;
		options = {};
	}

	if (typeof callback == 'undefined')
	{
		callback = function (a, b, cat, ls)
		{
			let name_id = ls[b].name_id.substr(0);

			if (ls[b].parent_name)
			{
				let parent_name = Category.normalize2(ls[b].parent_name, {
					lc: true,
				});
				//console.log(parent_name);
				parent_name = ls[parent_name].name_id;

				name_id = `${parent_name}.${ls[b].name}`;
			}

			let d = name_id;
			let p = cat.makeTree(d.split('.'), options.skip || [], options);

			return a;
		};
	}

	for (let b in ls)
	{
		let ret = callback(a, b, cat, ls);

		if (ret === false)
		{
			break;
		}
	}

	return cat as Category;
}

export function sortByArray(elem, arr: string[], attr: string = 'name')
{
	if (!elem.children || !elem.children.length)
	{
		return elem;
	}

	let compareFn = function (a, b)
	{
		let nameA = a;
		let nameB = b;

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

	let isUndef = function (v)
	{
		if (typeof v == 'undefined' || v == -1 || v === '')
		{
			return true;
		}

		return false;
	};

	let cs = elem.children
		.filter(function (value)
		{
			return value.type == 'tag';
		})
	;

	cs
		.sort(function (a, b)
		{
			let a1 = (arr && arr.length) ? arr.indexOf(a.attribs[attr]) : a.attribs[attr];
			let b1 = (arr && arr.length) ? arr.indexOf(b.attribs[attr]) : b.attribs[attr];

			if (isUndef(b1))
			{
				return 0;
			}
			else if (isUndef(a1))
			{
				if (isUndef(b1))
				{
					return 0;
				}
				else
				{
					return 1;
				}
			}

			return compareFn(a1, b1);
		})
	;

	for (let i = 0; i < cs.length; i++)
	{
		cs[i].prev = cs[i - 1] || null;
		cs[i].next = cs[i + 1] || null;
	}

	elem.children = cs;

	return elem;
}
