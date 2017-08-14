/**
 * Created by user on 2017/8/15/015.
 */

import * as request from 'request';
import * as rp from 'request-promise';

export async function getMapAll(lang)
{
	return rp({
		uri: `https://api.guildwars2.com/v2/maps`,
		qs: {
			ids: 'all',
			lang: lang,
		},
		json: true,
	})
		.then(ls =>
		{
			return ls.reduce((a, b) =>
			{
				a[b.id.toString()] = b;

				return a;
			}, {});
		})
		;
}

export async function getMapInfo(map_id, lang)
{
	map_id = parseInt(map_id);

	return rp({
		uri: `https://api.guildwars2.com/v2/maps/${map_id}`,
		qs: {
			lang: lang,
		},
		json: true,
	});
}

export default module.exports;
