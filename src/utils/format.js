/**
 * Taken from: https://gist.github.com/dtomasi/9327f704398be8d8ff5d0ab560b95641
 * */

/**
 * Convert Strings from camelCase to kebab-case
 * @param {string} input @returns {string} */
export function camelToKebab (input) {
	return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Convert Strings from kebab-case to camelCase
 * @param {string} input @returns {string} */
export function kebabToCamel (input) {
	return input.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
}

/**
 * Convert Strings from snake to camelCase
 * @param {string} input @returns {string} */
export function snakeToCamel (input) {
	return input.replace(/_([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
}
