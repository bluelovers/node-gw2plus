/**
 * Created by user on 2017/8/5/005.
 */

import { autobind } from 'core-decorators';

/**
 * configurable：是否可刪除特性或修改特性的 writable、configurable 與 enumerable 屬性。
 */
export function configurable(target, key, descriptor)
{
	return decorate(target, key, {
		configurable: true,
	}, descriptor);
}

/**
 * writable：是否可修改特性值。
 */
export function writable(target, key, descriptor)
{
	return decorate(target, key, {
		writable: true,
	}, descriptor);
}

/**
 * enumerable：是否可使用 for (var prop in obj) 迭代。
 */
export function nonenumerable(target, key, descriptor)
{
	return decorate(target, key, {
		enumerable: false,
	}, descriptor);
}

/**
 * enumerable：是否可使用 for (var prop in obj) 迭代。
 */
export function enumerable(target, key, descriptor)
{
	return decorate(target, key, {
		enumerable: true,
	}, descriptor);
}

export function decorate(target, key, attr, descriptor)
{
	Object.defineProperty(target, key, attr);

	return descriptor;
}
