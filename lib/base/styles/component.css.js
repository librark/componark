const fonts = [
  'tiny', 'small', 'normal',
  'large', 'huge', 'giant'
]

const colors = [
  'primary', 'secondary', 'success',
  'danger', 'warning', 'info',
  'dark', 'muted', 'light'
]

const positions = [
  'left', 'center', 'right', 'justify'
]

const sides = [
  'top', 'right', 'bottom', 'left',
]

const filters = [
  'blur', 'brightness', 'contrast', 'grayscale',
  'invert', 'opacity', 'saturate', 'sepia'
]

const factors = {
  none: 0,
  tiny: 0.25,
  small: 0.5,
  normal: 1,
  large: 1.5,
  huge: 2.25,
  giant: 3
}

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

  /* TYPOGRAPHY */

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
  --column: 320px;

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
`).join('\n')}

${colors.map(color => css`
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
`).join('\n')

}

${fonts.map(font => css`
.font-${font} {
  font-size: var(--font-${font}); 
}
`).join('\n')}

/* SPACING */

${Object.entries(factors).map(([size, factor]) => css`
.margin-${size} {
  margin: calc(var(--spacer) * ${factor});
}

.margin-horizontal-${size} {
  margin: 0 calc(var(--spacer) * ${factor});
}

.margin-vertical-${size} {
  margin: calc(var(--spacer) * ${factor}) 0;
}

.padding-${size} {
  margin: calc(var(--spacer) * ${factor});
}

.padding-horizontal-${size} {
  margin: 0 calc(var(--spacer) * ${factor});
}

.padding-vertical-${size} {
  margin: calc(var(--spacer) * ${factor}) 0;
}
`).join('\n')}

${Object.entries(factors).map(([size, factor]) => sides.map(side => css`
.margin-${side}-${size} {
  margin-${side}: calc(var(--spacer) * ${factor});
}

.padding-${side}-${size} {
  margin-${side}: calc(var(--spacer) * ${factor});
}
`).flat()).join('\n')}

/* LAYOUT */

.center {
  margin: auto;
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
