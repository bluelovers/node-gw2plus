/**
 * Created by user on 2017/8/8/008.
 */

import * as Category from '../category';
import * as path from 'path';
import fs from '../../lib/fs';
import * as Promise from 'bluebird';

export async function loadAll(ls: Array, options = { cwd : '' }): Promise<Array>
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

export function allCatList(ls: Array, options = {}): object
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

export function listToCat(ls: object, options = [], callback: Function): Category
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
				let parent_name = ls[b].parent_name.toLowerCase();
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

	return cat;
}
