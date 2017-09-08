/**
 * Created by user on 2017/8/6/006.
 */

//import * as Node from './node';
import Poi = require('./poi');

import * as cheerio from 'cheerio';
import { overwrite } from 'core-decorators';

import { objectReduce } from '../lib/object';

class Route extends Poi
{
	static defaultContext = '<OverlayData><POIs><Route/></POIs></OverlayData>';
	static defaultFilter = 'Route > POI';
	static defaultRoot: string = 'POIs > Route';
	static defaultTagName: string = 'POI';
}

export = Route;
