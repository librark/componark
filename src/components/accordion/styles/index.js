// @ts-nocheck

let styles = null

if (process.env.ARK_THEME === 'ark') {
  styles = require('./ark.scss').default.toString()
} else if (process.env.ARK_THEME === 'material') {
  styles = require('./material.scss').default.toString()
} else if (process.env.ARK_THEME === 'bootstrap') {
  styles = require('./bootstrap.scss').default.toString()
}

export {styles}
