/** utility typescript type and interface definitions
 * @module
*/

/// GENERIC INTERFACE AND TYPE MANIPULATORS

/** get the constructor function of type `T` */
export type ConstructorOf<T, Args extends any[] = any[]> = new (...args: Args) => T

/** turn optional properties `K` of interface `I` into required */
export type Require<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>
//export type Require<I, K extends keyof I> = I & Required<Pick<I, K>>

/** extract all optional fields from type `T` */
export type OptionalKeysOf<T> = { [K in keyof T as (undefined extends T[K] ? K : never)]: T[K] }

/** get all non-method class-instance members (aka data members) */
export type ClassFieldsOf<T> = { [K in keyof T as (T[K] extends Function ? never : K)]: T[K] }

/** represents a typical javasctipt object, something that pairs `keys` with `values` */
export type Obj = { [key: PropertyKey]: any }

/** represents an empty javasctipt object */
export type EmptyObj = { [key: PropertyKey]: never }

/** `DecrementNumber[N]` returns `N-1`, for up to `N = 10` */
export type DecrementNumber = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/// TYPED NUMERICS

/** unsigned integer, signed integer, or IEEE-754 float */
export type NumericFormatType = "u" | "i" | "f"

/** little-endian, big-endian, clamped 1-byte, or 1-byte */
export type NumericEndianType = "l" | "b"

/** specify 1-byte, 2-bytes, 4-bytes, or 8-bytes of numeric data*/
export type DByteSize = "1" | "2" | "4" | "8"

/** indicates the name of a numeric type. <br>
 * the collection of possible valid numeric types is:
 * - `"u1"`, `"u2"`, `"u4"`, `"u8"`, `"i1"`, `"i2"`, `"i4"`, `"i8"`, `"f4"`, `"f8"`, `"u1c"`
 * 
 * the first character specifies the format:
 * - `u` = unsigned integer
 * - `i` = signed integer
 * - `f` = float IEEE-754
 * 
 * the second character specifies the byte-size:
 * - `1` = one byte
 * - `2` = two bytes (short)
 * - `4` = four bytes (word)
 * - `8` = eight bytes (long)
*/
export type NumericDType = Exclude<`${NumericFormatType}${DByteSize}` | "u1c", "f1" | "f2" | "u8" | "i8">

/** abstract constructor of any typed array, such as `new Uint8Array(...)`
 * you can narrow down the constructor through the use of a  {@link NumericDType} string annotation
 * @example
 * ```ts
 * const clamp_arr_constructor: TypedArrayConstructor<"u1c"> = Uint8ClampedArray
 * ```
*/
export type TypedArrayConstructor<DType extends NumericDType = NumericDType> = {
	"u1": Uint8ArrayConstructor
	"u1c": Uint8ClampedArrayConstructor
	"u2": Uint16ArrayConstructor
	"u4": Uint32ArrayConstructor
	// "u8": BigUint64ArrayConstructor
	"i1": Int8ArrayConstructor
	"i2": Int16ArrayConstructor
	"i4": Int32ArrayConstructor
	// "i8": BigInt64ArrayConstructor
	"f4": Float32ArrayConstructor
	"f8": Float64ArrayConstructor
}[DType]

/** an instance of any typed array, such as `Uint8Array`
 * you can narrow down the type through the use of a  {@link NumericDType} string annotation
 * @example
 * ```ts
 * const clammped_bytes_arr: TypedArray<"u1c"> = new Uint8ClampedArray(42)
 * ```
*/
export type TypedArray<DType extends NumericDType = NumericDType> = {
	"u1": Uint8Array
	"u1c": Uint8ClampedArray
	"u2": Uint16Array
	"u4": Uint32Array
	// "u8": BigUint64Array
	"i1": Int8Array
	"i2": Int16Array
	"i4": Int32Array
	// "i8": BigInt64Array
	"f4": Float32Array
	"f8": Float64Array
}[DType]

/** specify 1-byte, 2-bytes, 4-bytes, 8-bytes, or variable number of bytes */
export type ByteSize = DByteSize | "v"

/** indicates the name of a numeric type with required endian information, or the use of a variable-sized integer. <br>
 * the collection of possible valid numeric types is:
 * - `"uv"`,  `"u1"`, `"iv"`, `"i1"`, `"u2l"`, `"u2b"`, `"i2l"`, `"i2b"`, `"u4l"`, `"u4b"`, `"u8l"`, `"u8b"`, `"i4l"`, `"i4b"`, `"i8l"`, `"i8b"`, `"f4l"`, `"f4b"`, `"f8l"`, `"f8b"`, `"u1c"`,
 * 
 * the first character specifies the format:
 * - `u` = unsigned integer
 * - `i` = signed integer
 * - `f` = float IEEE-754
 * 
 * the second character specifies the byte-size:
 * - `v` = variable bytes (see [wikipedia](https://en.wikipedia.org/wiki/Variable-length_quantity))
 * - `1` = one byte
 * - `2` = two bytes (short)
 * - `4` = four bytes (word)
 * - `8` = eight bytes (long)
 * 
 * the third character specifies the endianess. but in the case of unsigned one byte integers, the `c` character specifies if the value is clamped to 255:
 * - `l` = little endian
 * - `b` = big endian
 * - `c` = clamped (only valid for `"u1c"` type)
*/
export type NumericType = Exclude<`${NumericDType}${NumericEndianType}` | "uv" | "iv" | "u1" | "u1c" | "i1", `${"u1" | "u1c" | "i1"}${NumericEndianType}`>

/** an array (regular javascript array) of numbers can be interpreted as an array of formated binary numbers. `NumericType`s `uv` and `iv` are excluded here */
export type NumericArrayType = `${NumericType}[]`

/// STRUCTURE DEFINITIONS
