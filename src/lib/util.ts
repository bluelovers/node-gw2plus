/**
 * Created by user on 2017/8/6/006.
 */

export function getClassStatic(obj)
{
	return obj.__proto__.constructor;
}

export function upperCamelCase(...argv)
{
	return argv.join('-')
		.replace(/(?:^|[\-\s]+)([a-z0-9])/ugi, function (...argv)
		{
			//console.log(argv);

			return argv[1].toUpperCase();
		})
		;
}
