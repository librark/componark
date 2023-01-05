const colors = [
  'primary', 'secondary', 'success',
  'danger', 'warning', 'info',
  'dark', 'muted', 'light'
]

const factors = [
  'none', 'tiny', 'small', 'normal',
  'large', 'huge', 'giant'
]

const alignments = [
  'left', 'center', 'right', 'justify'
]

const displays = [
  'none', 'contents', 'block', 'inline', 'grid', 'flex',
  'inline-block', 'inline-grid', 'inline-flex'
]

const sides = [
  'top', 'right', 'bottom', 'left',
]

const positions = [
  'static', 'absolute', 'relative', 'fixed', 'sticky'
]

const borders = [
  'dashed', 'double', 'dotted', 'groove', 'hidden',
  'inset', 'none', 'outset', 'ridge', 'solid'
]

const filters = [
  'blur', 'brightness', 'contrast', 'drop-shadow', 'grayscale',
  'hue-rotate', 'invert', 'opacity', 'saturate', 'sepia'
]

const actions = [
  '', ':hover', ':active', ':focus'
]

const levels = [
  'low', 'normal', 'high'
]

const cursors = [
  'auto', 'default', 'auto',
  'context-menu', 'help', 'pointer', 'progress', 'wait'
]

const css = String.raw; export default css`
* {
  margin: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  /* COLORS (RGB) */

  --primary: 0, 0, 255; /* blue */
  --secondary: 255, 165, 0; /* orange */
  --success: 0, 255, 0; /* green */
  --danger: 255, 0, 0; /* red */
  --warning: 255, 255, 0; /* yellow */
  --info: 0, 255, 255; /* cyan */
  --dark: 0, 0, 0; /* black */
  --muted: 128, 128, 128; /* gray */
  --light: 211, 211, 211; /*lightgray */

  --alpha-low: 20%;
  --alpha-normal: 100%;
  --alpha-high: 80%;

  /* FACTORS */

  --factor-none: 0;
  --factor-tiny: 0.25;
  --factor-small: 0.5;
  --factor-normal: 1;
  --factor-large: 1.5;
  --factor-huge: 2.25;
  --factor-giant: 3;

  /* TYPOGRAPHY */

  --line-height: 1;

  --font-sans: Arial, Helvetica, sans-serif;
  --font-serif: "Times New Roman", Times, serif;
  --font-family: var(--font-sans);

  --font-none: 0;
  --font-tiny: 0.5rem;
  --font-small: 0.75rem;
  --font-normal: 1rem;
  --font-large: 1.5rem;
  --font-huge: 2.25rem;
  --font-giant: 3.375rem;

  /* SPACING */

  --spacer: 16px;
  --positioner: 16px;

  /* LAYOUT */

  --gap: 16px 16px;
  --container: 16px;
  --column: 240px;

  --span-none: 0;
  --span-tiny: 2;
  --span-small: 4;
  --span-normal: 6;
  --span-large: 8;
  --span-huge: 10;
  --span-giant: 12;

  /* BORDERS */

  --border: 4px;
  --outline: 4px;
  --roundness: 8px;

  /* SHADOWS */

  --shadow-color: rgb(var(--dark));

  --shadow-none: 0 0 var(--shadow-color);
  --shadow-tiny: 0 1px 2px 0 var(--shadow-color);
  --shadow-small: 0 2px 4px -1px var(--shadow-color);
  --shadow-normal: 0 4px 8px -2px var(--shadow-color);
  --shadow-large: 0 8px 16px -4px var(--shadow-color);
  --shadow-huge: 0 16px 32px -8px var(--shadow-color);
  --shadow-giant: 0 24px 48px -12px var(--shadow-color);

  /* TRANSITIONS */

  --transition-property: all;
  --transition-duration: 1s;

  /* TRANSFORMS */

  --rotate-none: 0;
  --rotate-tiny: 5deg;
  --rotate-small: 15deg;
  --rotate-normal: 45deg;
  --rotate-large: 90deg;
  --rotate-huge: 180deg;
  --rotate-giant: 360deg;

  --scale-factor: 1;
  --scale-none: 100%;
  --scale-tiny: 25%;
  --scale-small: 50%;
  --scale-normal: 110%;
  --scale-large: 125%;
  --scale-huge: 150%;
  --scale-giant: 200%;

  /* FILTERS */

  --blur-normal: 0;
  --blur: var(--blur-normal);
  --blur-low: 2px;
  --blur-high: 8px;

  --brightness-normal: 100%;
  --brightness: var(--brightness-normal);
  --brightness-low: 50%;
  --brightness-high: 150%;

  --contrast-normal: 100%;
  --contrast: var(--contrast-normal);
  --contrast-low: 50%;
  --contrast-high: 150%;

  --drop-shadow-normal: 0 0 var(--shadow-color);
  --drop-shadow: var(--drop-shadow-normal);
  --drop-shadow-low: 0 2px 4px var(--shadow-color);
  --drop-shadow-high: 0 8px 16px var(--shadow-color);

  --grayscale-normal: 0%;
  --grayscale: var(--grayscale-normal);
  --grayscale-low: 50%;
  --grayscale-high: 100%;

  --hue-rotate-normal: 0;
  --hue-rotate: var(--hue-rotate-normal);
  --hue-rotate-low: 90deg;
  --hue-rotate-high: 180deg;

  --invert-normal: 0%;
  --invert: var(--invert-normal);
  --invert-low: 75%;
  --invert-high: 100%;

  --opacity-normal: 100%;
  --opacity: var(--opacity-normal);
  --opacity-low: 25%;
  --opacity-high: 50%;

  --saturate-normal: 100%;
  --saturate: var(--saturate-normal);
  --saturate-low: 50%;
  --saturate-high: 150%;

  --sepia-normal: 0%;
  --sepia: var(--sepia-normal);
  --sepia-low: 50%;
  --sepia-high: 100%;

  /* MISCELANEOUS */

  --screen-mobile: 480px;
  --screen-mobile-landscape: 960px;
  --screen-tablet: 960px;
  --screen-tablet-landscape: 1200px;
  --screen-desktop: 1200px;

  --layer-none: 0;
  --layer-tiny: -2;
  --layer-small: -1;
  --layer-normal: 0;
  --layer-large: 1;
  --layer-huge: 2;
  --layer-giant: 3;
}

html, body {
  height: 100%;
  font-family: var(--font-family);
}

/*****************
 * UTILITY CLASSES
 *****************/

/* COLORS */

${colors.map(color => css`
${actions.map(action => `.background-${color}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  --background-color: var(--${color});
  background: rgb(var(--background-color));
}

${actions.map(action => `.color-${color}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  --color: var(--${color});
  color: rgb(var(--color));
}
`).join('\n')}

${levels.map(level => css`
${actions.map(action => `.background-alpha-${level}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  background: rgba(var(--background-color), var(--alpha-${level}));
}

${actions.map(action => `.color-alpha-${level}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  color: rgba(var(--color), var(--alpha-${level}));
}
`).join('\n')}

/* TYPOGRAPHY */

.sans {
  font-family: var(--font-sans);
}

.serif {
  font-family: var(--font-serif);
}

.normal {
  font-weight: normal;
  font-style: normal;
}

.bold {
  font-weight: bolder;
}

.light {
  font-weight: lighter;
}

.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}

.lowercase {
  text-transform: lowercase;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.underline {
  text-decoration: underline;
}

.strike {
  text-decoration: line-through;
}

.undecorate {
  text-decoration: none;
}

.unstyle {
  list-style: none;
}

${alignments.map(alignment => css`
.text-align-${alignment} {
  text-align: ${alignment};
}
`).join('\n')}

${factors.map(factor => css`
.font-${factor} {
  font-size: var(--font-${factor});
}
`).join('\n')}

${factors.map(factor => css`
.line-${factor} {
  line-height: calc(var(--line-height) * var(--factor-${factor}));
}
`).join('\n')}

/* SPACING */

.center {
  margin: auto;
}

${factors.map(factor => css`
.margin-${factor} {
  margin: calc(var(--spacer) * var(--factor-${factor}));
}

.margin-horizontal-${factor} {
  margin-left: calc(var(--spacer) * var(--factor-${factor}));
  margin-right: calc(var(--spacer) * var(--factor-${factor}));
}

.margin-vertical-${factor} {
  margin-top: calc(var(--spacer) * var(--factor-${factor}));
  margin-bottom: calc(var(--spacer) * var(--factor-${factor}));
}

.padding-${factor} {
  padding: calc(var(--spacer) * var(--factor-${factor}));
}

.padding-horizontal-${factor} {
  padding-left: calc(var(--spacer) * var(--factor-${factor}));
  padding-right: calc(var(--spacer) * var(--factor-${factor}));
}

.padding-vertical-${factor} {
  padding-top: calc(var(--spacer) * var(--factor-${factor}));
  padding-bottom: calc(var(--spacer) * var(--factor-${factor}));
}
`).join('\n')}

${factors.map(factor => sides.map(side => css`
.margin-${side}-${factor} {
  margin-${side}: calc(var(--spacer) * var(--factor-${factor}));
}

.padding-${side}-${factor} {
  padding-${side}: calc(var(--spacer) * var(--factor-${factor}));
}
`)).flat().join('\n')}

/* LAYOUT */

.full-size {
  width: 100%;
  height: 100%;
}

.responsive {
  max-width: 100%;
  height: auto;
}

${displays.map(display => css`
${actions.map(action => `.${display}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  display: ${display};
}

${actions.map(action => `.child-${display}${
  action.replace(':', '-')}${action} > *:last-child`).join(',\n')} {
  display: ${display};
}
`).join('\n')}

${positions.map(position => css`
.position-${position} {
  position: ${position};
}
`).join('\n')}

${sides.map(side => factors.map(factor => css`
.${side}-${factor} {
  ${side}: calc(var(--positioner) * var(--factor-${factor}));
}
`)).flat().join('\n')}

${['visible', 'hidden', 'scroll', 'auto'].map(overflow => css`
.overflow-${overflow} {
  overflow: ${overflow};
}
`).join('\n')}

.container {
  padding: var(--container);
}

.row {
  display: grid;
  grid-auto-flow: column;
}

.column {
  display: grid;
  grid-auto-flow: row;
}

${factors.map(factor => css`
.row-span-${factor} {
  grid-row: span var(--span-${factor});
}

.column-span-${factor} {
  grid-column: span var(--span-${factor});
}
`).join('\n')}

${['space-between', 'space-around', 'space-evenly',
  'start', 'center', 'end'].map(
  place => ['content', 'items', 'self'].map(target => css`
.justify-${target}-${place} {
  justify-${target}: ${place};
}

.align-${target}-${place} {
  align-${target}: ${place};
}
`)).flat().join('\n')}

.gap {
  gap: var(--gap);
}

.fit {
  grid-template-columns: repeat(auto-fit, minmax(
    var(--column), 1fr));
}

.duplet {
  grid-template-columns: repeat(auto-fit, minmax(
    min(100%, max(var(--column), 100%/2)), 1fr));
}

.triplet {
  grid-template-columns: repeat(auto-fit, minmax(
    min(100%, max(var(--column), 100%/3)), 1fr));
}

.quadruplet {
  grid-template-columns: repeat(auto-fit, minmax(
    min(100%, max(var(--column), 100%/4)), 1fr));
}

.flex {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

/* BORDERS */

.circular {
  border-radius: 50%;
}

${borders.map(border => css`
${actions.map(action => `.border-${border}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  border-style: ${border};
}

${actions.map(action => `.outline-${border}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  outline-style: ${border};
}
`).join('\n')}

${borders.map(border => sides.map(side => css`
.border-${side}-${border} {
  border-${side}-style: ${border};
}

.outline-${side}-${border} {
  outline-${side}-style: ${border};
}
`)).flat().join('\n')}

${factors.map(factor => css`
.border-${factor} {
  border-width: calc(var(--border) * var(--factor-${factor}));
}

.outline-${factor} {
  outline-width: calc(var(--outline) * var(--factor-${factor}));
}

.roundness-${factor} {
  border-radius: calc(var(--roundness) * var(--factor-${factor}));
}
`).join('\n')}

${colors.map(color => css`
.border-${color} {
  --border-color: var(--${color});
  border-color: rgb(var(--border-color));
}

.outline-${color} {
  --outline-color: var(--${color});
  outline-color: rgb(var(--outline-color));
}
`).join('\n')}

${levels.map(level => css`
${actions.map(action => `.border-alpha-${level}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  border-color: rgba(var(--border-color), var(--alpha-${level}));
}

${actions.map(action => `.outline-alpha-${level}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  outline-color: rgba(var(--outline-color), var(--alpha-${level}));
}
`).join('\n')}

/* SHADOWS */

${factors.map(factor => css`
${actions.map(action => `.shadow-${factor}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  box-shadow: var(--shadow-${factor});
}
`).join('\n')}

/* FILTERS */

${['filter', 'backdrop-filter'].map(property => css`
${actions.map(action => `.${property}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  ${property}:
    blur(var(--blur))
    brightness(var(--brightness))
    contrast(var(--contrast))
    drop-shadow(var(--drop-shadow))
    grayscale(var(--grayscale))
    hue-rotate(var(--hue-rotate))
    invert(var(--invert))
    opacity(var(--opacity))
    saturate(var(--saturate))
    sepia(var(--sepia));
}
`).join('\n')}

${filters.map(filter => levels.map(level => css`
.${filter}-${level} {
  --${filter}: var(--${filter}-${level});
}
`)).flat().join('\n')}

/* TRANSITIONS */

${factors.map(factor => css`
.transition-${factor} {
  transition: var(--transition-property)
    calc(var(--transition-duration) * var(--factor-${factor}));
}
`).join('\n')}

/* TRANSFORMS */

${factors.map(factor => css`
${actions.map(action => `.rotate-${factor}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  rotate: var(--degree-${factor});
}

${actions.map(action => `.rotate-inverse-${factor}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  rotate: calc(var(--rotate-${factor}) * -1);
}
`).join('\n')}

${factors.map(factor => css`
${actions.map(action => `.scale-${factor}${
  action.replace(':', '-')}${action}`).join(',\n')} {
  scale: calc(var(--scale-${factor}) * var(--scale-factor));
}
`).join('\n')}

/* MISCELANEOUS */

${cursors.map(cursor => css`
.cursor-${cursor} {
  cursor: ${cursor};
}
`).join('\n')}

${factors.map(factor => css`
.layer-${factor} {
  z-index: var(--layer-${factor});
}
`).join('\n')}

`
