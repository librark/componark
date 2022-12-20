const colors = [
  'primary', 'secondary', 'success',
  'danger', 'warning', 'info',
  'dark', 'muted', 'light'
]

const factors = [
  'none', 'tiny', 'small', 'normal',
  'large', 'huge', 'giant'
]

const positions = [
  'left', 'center', 'right', 'justify'
]

const sides = [
  'top', 'right', 'bottom', 'left',
]

const borders = [
  'dashed', 'double', 'dotted', 'groove', 'hidden',
  'inset', 'none', 'outset', 'ridge', 'solid' 
]

const filters = [
  'blur', 'brightness', 'contrast', 'grayscale',
  'invert', 'opacity', 'saturate', 'sepia'
]

const css = String.raw; export default css`
* {
  margin: 0; 
  box-sizing: border-box;
}

html {
  /* COLORS */

  --primary: blue;
  --secondary: orange;
  --success: green;
  --danger: red;
  --warning: yellow;
  --info: cyan;
  --dark: black;
  --muted: gray;
  --light: lightgray;

  /* FACTORS */

  --factor-none: 0;
  --factor-tiny: 0.25;
  --factor-small: 0.5;
  --factor-normal: 1;
  --factor-large: 1.5;
  --factor-huge: 2.25;
  --factor-giant: 3;

  /* TYPOGRAPHY */

  --font-none: 0;
  --font-tiny: 0.5rem;
  --font-small: 0.75rem;
  --font-normal: 1rem;
  --font-large: 1.5rem;
  --font-huge: 2.25rem;
  --font-giant: 3.375rem;

  /* TODO: change for font-size */
  --xs: 0.3rem;
  --sm: 0.8rem;
  --md: 1rem;
  --lg: 2rem;
  --xl: 3rem;

  /* SPACING */

  --spacer: 16px;

  /* LAYOUT */

  --gap: 16px 16px;
  --container: 0 16px;
  --column: 240px;

  /* BORDERS */

  --border:240x; 
  --outline: 4px; 
  --roundness: 8px; 

  /* FILTERS */

  --blur: 0px;
  --blur-low: 2px;
  --blur-high: 8px;

  --brightness: 100%;
  --brightness-low: 50%;
  --brightness-high: 150%;

  --contrast: 100%;
  --contrast-low: 50%;
  --contrast-high: 150%;

  --grayscale: 0%;
  --grayscale-low: 50%;
  --grayscale-high: 100%;

  --invert: 0%;
  --invert-low: 75%;
  --invert-high: 100%;

  --opacity: 100%;
  --opacity-low: 25%;
  --opacity-high: 50%;

  --saturate: 100%;
  --saturate-low: 50%;
  --saturate-high: 150%;

  --sepia: 0%;
  --sepia-low: 50%;
  --sepia-high: 100%;
}

/*****************
 * UTILITY CLASSES
 *****************/

/* COLORS */

${colors.map(color => css`
.background-${color} {
  background: var(--${color});
}

.color-${color} {
  color: var(--${color}); 
}
`).join('\n')}

/* TYPOGRAPHY */

.normal {
  font-weight: normal;
  font-style: normal;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}

${positions.map(position => css`
.align-${position} {
  text-align: ${position};
}
`).join('\n')}

${factors.map(factor => css`
.font-${factor} {
  font-size: var(--font-${factor}); 
}
`).join('\n')}

/* SPACING */

${factors.map(factor => css`
.margin-${factor} {
  margin: calc(var(--spacer) * var(--factor-${factor}));
}

.margin-horizontal-${factor} {
  margin: 0 calc(var(--spacer) * var(--factor-${factor}));
}

.margin-vertical-${factor} {
  margin: calc(var(--spacer) * var(--factor-${factor})) 0;
}

.padding-${factor} {
  margin: calc(var(--spacer) * var(--factor-${factor}));
}

.padding-horizontal-${factor} {
  margin: 0 calc(var(--spacer) * var(--factor-${factor}));
}

.padding-vertical-${factor} {
  margin: calc(var(--spacer) * var(--factor-${factor})) 0;
}
`).join('\n')}

${factors.map(factor => sides.map(side => css`
.margin-${side}-${factor} {
  margin-${side}: calc(var(--spacer) * var(--factor-${factor}));
}

.padding-${side}-${factor} {
  margin-${side}: calc(var(--spacer) * var(--factor-${factor}));
}
`)).flat().join('\n')}

/* LAYOUT */

.center {
  margin: auto;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.inline-block {
  display: inline-block;
}

.container {
  padding: var(--container);
}

.grid {
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(var(--column), 1fr));
}

.gap {
  gap(--gap);
}

.duplet {
  grid-template-columns: repeat(2, minmax(var(--column), 1fr));
}

.triplet {
  grid-template-columns: repeat(3, minmax(var(--column), 1fr));
}

/* BORDERS */

.circular {
  border-radius: 50%;
}

${borders.map(border => css`
.border-${border} {
  border-style: ${border};
}

.outline-${border} {
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
  border-color: var(--${color});
}

.outline-${color} {
  outline-color: var(--${color});
}
`).join('\n')}

/* FILTERS */

${['filter', 'backdrop-filter'].map(property => css`
.${property} {
  ${property}:
    blur(var(--blur))
    brightness(var(--brightness))
    contrast(var(--contrast))
    grayscale(var(--grayscale))
    invert(var(--invert))
    opacity(var(--opacity))
    saturate(var(--saturate))
    sepia(var(--sepia));
}
`).join('\n')}

${filters.map(filter => css`
.${filter}-low {
  --${filter}: var(--${filter}-low); 
}

.${filter}-high {
  --${filter}: var(--${filter}-high); 
}
`).join('\n')}

`
