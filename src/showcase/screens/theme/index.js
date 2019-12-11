export function importStyles (currentStyle) {
  if (currentStyle === 'material') {
    // @ts-ignore
    require('./styles/main-material.scss')
  } else {
    // @ts-ignore
    require('./styles/main-ark.scss')
  }
}