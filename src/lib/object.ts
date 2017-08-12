/**
 * Created by user on 2017/8/8/008.
 */

export function objectReduce(obj: object, callback: Function, init = {})
{
	return Object.keys(obj)
		.reduce(callback.bind(obj), init)
	;
}
