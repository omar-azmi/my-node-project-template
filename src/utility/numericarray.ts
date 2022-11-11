/** utility functions for numeric array manipulation and array math functions
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

/// ARITHMETIC OPERATIONS ON ARRAYS

export type unaryOperator = "abs" | "neg" | "comp"
export type scalarOperator = "add" | "sub" | "mult" | "div" | "pow" | "rem" | "mod" | "and" | "or" | "xor" | "<<" | ">>" | ">>>"
export type elementwiseOperator = scalarOperator

/** conduct in-place unary arithmatic operations on numeric arrays
 * @inplace
*/
const unaryArithmetic = <A extends TypedArray | Array<number> = any>(operation: unaryOperator, arr: A, start?: number, end?: number): A => {
	const [xs, xe] = resolveRange(start, end, arr.length)
	switch (operation) {
		case "abs": return abs(arr, xs, xe)
		case "neg": return neg(arr, xs, xe)
		case "comp": return bcomp(arr, xs, xe)
	}
}

/** conduct in-place scalar arithmatic operations on numeric arrays
 * @inplace
*/
const scalarArithmetic = <A extends TypedArray | Array<number> = any>(operation: scalarOperator, arr: A, value: number, start?: number, end?: number): A => {
	const [xs, xe] = resolveRange(start, end, arr.length)
	switch (operation) {
		case "add": return add(arr, value, xs, xe)
		case "sub": return sub(arr, value, xs, xe)
		case "mult": return mult(arr, value, xs, xe)
		case "div": return div(arr, value, xs, xe)
		case "pow": return pow(arr, value, xs, xe)
		case "rem": return rem(arr, value, xs, xe)
		case "mod": return mod(arr, value, xs, xe)
		case "and": return band(arr, value, xs, xe)
		case "or": return bor(arr, value, xs, xe)
		case "xor": return bxor(arr, value, xs, xe)
		case "<<": return blsh(arr, value, xs, xe)
		case ">>": return brsh(arr, value, xs, xe)
		case ">>>": return bursh(arr, value, xs, xe)
	}
}

/// UNARY OPERATIONS

/** mutate array in-place to get **absolute** value of elements <br>
 * @unaryOperator
 * @inplace
 */
export const abs = <A extends TypedArray | Array<number> = any>(arr: A, start: number = 0, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] *= arr[i] < 0 ? -1 : 1
	return arr
}

/** mutate array in-place to get **negative** value of elements <br>
 * @unaryOperator
 * @inplace
 */
export const neg = <A extends TypedArray | Array<number> = any>(arr: A, start: number = 0, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] *= -1
	return arr
}

/** mutate array in-place to get **bitwise complement** value of elements <br>
 * @unaryOperator
 * @inplace
*/
export const bcomp = <A extends TypedArray | Array<number> = any>(arr: A, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] = ~arr[i]
	return arr
}

/// SCALAR OPERATIONS
/// TODO consider replacing some functions entirely with a linear function `y = ax + b`.

/** mutate array in-place to get **bitwise and** against a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const band = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] &= value
	return arr
}

/** mutate array in-place to get **bitwise or** against a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const bor = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] |= value
	return arr
}

/** mutate array in-place to get **bitwise xor** against a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const bxor = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] ^= value
	return arr
}

/** mutate array in-place to get **bitwise left-shift** (`<<`) against a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const blsh = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] <<= value
	return arr
}

/** mutate array in-place to get **bitwise right-shift** (`>>`) against a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const brsh = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] >>= value
	return arr
}

/** mutate array in-place to get **bitwise unsinged right-shift** (`>>>`) against a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const bursh = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] >>>= value
	return arr
}

/** mutate array in-place to **add** a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const add = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] += value
	return arr
}

/** mutate array in-place to **subtract** a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const sub = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] -= value
	return arr
}

/** mutate array in-place to **multiply** by a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const mult = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] *= value
	return arr
}

/** mutate array in-place to **divide** by a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const div = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] /= value
	return arr
}

/** mutate array in-place to raise it to the **power** of a scalar `value` <br>
 * @scalarOperator
 * @inplace
*/
export const pow = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] **= value
	return arr
}

/** mutate array in-place to get the **remainder** (`%`) when divided by scalar `value` <br>
 * note that this is slightly different from the modulo {@link mod} operator, as this can have a negative sign <br>
 * @scalarOperator
 * @inplace
*/
export const rem = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] %= value
	return arr
}

/** mutate array in-place to get the **modulo** when divided by scalar `value` <br>
 * note that this is slightly different from the remainder {@link rem} operator, as this always returns a positive number <br>
 * @scalarOperator
 * @inplace
*/
export const mod = <A extends TypedArray | Array<number> = any>(arr: A, value: number, start?: number, end?: number): A => {
	start = start ?? 0
	end = end ?? arr.length
	for (let i = start; i < end; i++) arr[i] = ((arr[i] % value) + value) % value
	return arr
}

