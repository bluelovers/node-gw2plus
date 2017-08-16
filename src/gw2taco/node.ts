/**
 * Created by user on 2017/8/5/005.
 */

import * as cheerio from 'cheerio';
import { nonenumerable, writable } from '../lib/decorators';

import { getClassStatic } from '../lib/util';

import { pd } from 'pretty-data';
import * as prettifyXml from 'prettify-xml';

import fs from '../lib/fs';

import * as shortid from 'shortid';

interface normalizeOptions
{
	gw2taco?: boolean;
	lc?: boolean;
	space?: boolean;
}

interface privateData
{
	context: Buffer|string|any;
	options: object;
	$: cheerio;
}

class Node
{

	static defaultContext: string = '<OverlayData><MarkerCategory/><POIs/></OverlayData>';
	static defaultOptions = {
		xmlMode: true,
		decodeEntities: false,
	};

	static defaultFilter: string = 'OverlayData';
	static defaultRoot: string = 'OverlayData';
	static defaultTagName: string = 'OverlayData';

	@nonenumerable
	@writable
	private _data_ = {} as privateData;

	/**
	 *
	 * @param context
	 * @param {Object} options
	 */
	constructor(context?, options?: object)
	{
		this.xml(context || getClassStatic(this).defaultContext, options);
	}

	static init(...argv)
	{
		return new this(...argv);
	}

	static loadSync(file, options?: object)
	{
		let context = fs.readFileSync(file);

		return this.init(context, options);
	}

	static async load(file, options?: object): Promise<any>
	{
		let context = await fs.readFile(file);

		return this.init(context, options);
	}

	createNode(...argv): this
	{
		return getClassStatic(this).init(...argv);
	}

	/**
	 *
	 * @param {string} selector
	 * @returns {}
	 */
	find(selector: string): cheerio
	{
		return this.$(selector);
	}

	/**
	 *
	 * @param context
	 * @param {Object} options
	 * @returns {string | this}
	 */
	html(...argv): string
	{
		return this.xml(...argv);
	}

	/**
	 *
	 * @param context
	 * @param {Object} options
	 * @returns {string | this}
	 */
	xml(context, options?: object): string | this
	{
		if (typeof context != 'undefined')
		{
			options = Object.assign({}, getClassStatic(this).defaultOptions, options);

			this._data_.context = context;
			this._data_.options = options;

			this._data_.$ = cheerio.load(this._data_.context.toString(), this._data_.options);

			return this;
		}

		return this.$.xml();
	}

	get $(): cheerio
	{
		return this._data_.$;
	}

	/**
	 * pretty print XML
	 * @returns {string}
	 */
	dump(): string
	{
		let out = this.$.xml()
			//.replace(/\/\>/g, `/>\n`)
		;

		return getClassStatic(this).pretty(out);
	}

	pretty(string): string
	{
		return getClassStatic(this).pretty(string);
	}

	/**
	 * pretty print XML
	 * @param string
	 * @returns {string}
	 */
	static pretty(input): string
	{
		const options = {
			indent: 2,
			newline: '\n',
		};

		// for fix <MarkerCategory name="undefined"/></MarkerCategory>
		input = pd.xmlmin(input);

		return prettifyXml(input.toString(), options);
	}

	filter(attr?: object): cheerio
	{
		return getClassStatic(this).filter(this, attr);
	}

	static filter(dom, attr?: object): cheerio
	{
		return dom.find(this.defaultFilter + this.attr2selector(attr));
	}

	root(dom = this): cheerio
	{
		return dom.$.root().find(getClassStatic(this).defaultRoot);
	}

	get tagName(): string
	{
		return getClassStatic(this).defaultTagName;
	}

	makeTagNode(callback?, options?: normalizeOptions): cheerio
	{
		let tagName = this.tagName;

		let elem = this.$(`<${tagName}/>`);

		if (typeof callback == 'function')
		{
			callback(elem, this.$, tagName);
		}
		else if (typeof callback == 'string')
		{
			let n = getClassStatic(this).normalize2(callback, options);

			elem.attr('name', n);
		}

		return elem;
	}

	static normalize(name: string, options: normalizeOptions = {}): string
	{
		let n = name.toString()
			.replace(/[\?]/ig, '_')
		;

		if (options.gw2taco)
		{
			new Map([
				[':', '_'],
				['’', '___'],
			]).forEach((value, key, map) =>
			{
				n = n.replace(key, value);
			});

			n = n
				.replace(/[^a-z0-9_\.\s]/uig, '_')
			;
		}
		else
		{
			n = n
				.replace(/[’'"]+/uig, '')
				.replace(/[^a-z0-9_\.]+/uig, ' ')
				.replace(/[\s\_]*(\.)[\s\_]*/g, '$1')
				.replace(/^[\s\_]+|[\s\_]+$/g, '')
				.trim()
			;
		}

		if (!options.space)
		{
			n = n
				.replace(/\s/ig, '_')
			;
		}
		else
		{
			n = n
				.replace(/\s/ig, ' ')
			;
		}

		if (options.lc || (options.gw2taco && options.lc !== false))
		{
			n = n
				.toLowerCase()
			;
		}

		return n;
	}

	/**
	 * return gw2taco name style
	 *
	 * @param {string} name
	 * @param {Object} options
	 * @returns {string}
	 */
	static normalize2(name: string, options: normalizeOptions)
	{
		options = Object.assign({
			gw2taco: true,
		}, options);

		return this.normalize(name, options);
	}

	getStatic(): this
	{
		return getClassStatic(this);
	}

	static attr(dom, ...argv)
	{
		if (typeof argv[0] == 'object')
		{
			let attr = this.handleAttr(argv[0]);

			//console.log(argv[0], attr);

			for (let k in attr)
			{
				dom.attr(k, attr[k]);
			}

			return dom;
		}

		return dom.attr(...argv);
	}

	static attr2selector(attr: object, callback?: Function): string
	{
		if (!attr) return '';

		attr = this.handleAttr(attr);

		if (typeof callback == 'function')
		{
			let ret = callback(attr);

			if (ret)
			{
				attr = ret;
			}
		}

		return Object.keys(attr)
			.reduce((a, b) =>
			{
				a.push(`[${b}="${attr[b]}"]`);

				return a;
			}, [])
			.join('')
			;
	}

	static handleAttr(attr: object): object
	{
		console.log('handleAttr');

		return attr;
	}

	static newGUID(): string
	{
		return shortid.generate();
	}

}

export = Node;

