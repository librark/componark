// @ts-nocheck

let styles = null

if (process.env.ARK_THEME === 'ark') {
  styles = require('./_ark.scss').default.toString()
} else if (process.env.ARK_THEME === 'material') {
  styles = require('./_material.scss').default.toString()
} else if (process.env.ARK_THEME === 'bootstrap') {
  styles = require('./_bootstrap.scss').default.toString()
}

export {styles}
