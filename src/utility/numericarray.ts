/** utility function for numeric array manipulation and array math functions
 * @module
*/

import { resolveRange } from "./typedbuffer"
import { TypedArray } from "./typedefs"


/** compute the left-to-right running difference between successive elements <br>
 * the returned array's length is decremented by one. as a result, a single element array will turn into an empty array <br>
 * becareful when using with unsigned typed arrays <br>
 * @copy
*/
export const diff = <A extends TypedArray | Array<number> = any>(arr: A, start?: number, end?: number): A => {
	[start, end] = resolveRange(start, end, arr.length)
	const d = arr.slice(start + 1, end) as A
	for (let i = 0; i < d.length; i++) d[i] -= arr[start + i - 1]
	return d
}

/** compute the right-to-left (ie reverse) running difference between preceding elements <br>
 * the returned array's length is decremented by one. as a result, a single element array will turn into an empty array <br>
 * becareful when using with unsigned typed arrays <br>
 * @copy
*/
export const diff_right = <A extends TypedArray | Array<number> = any>(arr: A, start?: number, end?: number): A => {
	[start, end] = resolveRange(start, end, arr.length)
	const d = arr.slice(start, end - 1) as A
	for (let i = 0; i < d.length; i++) d[i] -= arr[start + i + 1]
	return d
}

/** substitute array elements inplace with their absolute value <br>
 * do not use with `BigUint64Array | BigInt64Array` typed arrays <br>
 * @inplace
*/
export const abs = <A extends TypedArray | Array<number> = any>(arr: A): A => {
	for (let i = 0; i < arr.length; i++) arr *= arr < 0 ? -1 : 1
	return arr
}

