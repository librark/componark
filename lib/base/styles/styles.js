const userActions = ['-hover', '-active']

const formActions = ['-focus-within', '-valid', '-invalid', '-checked']

const actions = ['', ...userActions, ...formActions]

const sides = ['', '-top', '-right', '-bottom', '-left']

const mutableProperties = [
  'display', 'background', 'color', 'outline',
  'border-style', 'border-width', 'border-color', 'border-radius']

const effects = [
  'animation', 'filter', 'mix-blend-mode', 'transition', 'transform']

const css = String.raw; export default css`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  /* COLORS (RGB) */

  --primary-rgb: 0, 0, 255; /* blue */
  --secondary-rgb: 255, 165, 0; /* orange */
  --tertiary-rgb: 238, 130, 238; /* violet */
  --success-rgb: 0, 255, 0; /* green */
  --danger-rgb: 255, 0, 0; /* red */
  --warning-rgb: 255, 255, 0; /* yellow */
  --info-rgb: 0, 255, 255; /* cyan */
  --dark-rgb: 0, 0, 0; /* black */
  --muted-rgb: 128, 128, 128; /* gray */
  --light-rgb: 211, 211, 211; /*lightgray */

  --primary: rgb(var(--primary-rgb));
  --secondary: rgb(var(--secondary-rgb));
  --success: rgb(var(--success-rgb));
  --danger: rgb(var(--danger-rgb));
  --warning: rgb(var(--warning-rgb));
  --info: rgb(var(--info-rgb));
  --dark: rgb(var(--dark-rgb));
  --muted: rgb(var(--muted-rgb));
  --light: rgb(var(--light-rgb));

  /* TYPOGRAPHY */

  --font-size-base: 0.5rem;
  --font-size-step: 0.125rem;
  --line-height-step: 0.5;
  --word-spacing-step: 0.1rem;
  --letter-spacing-step: 0.05rem;

  /* SPACING */

  --margin-step: 4px;
  --padding-step: 4px;

  /* LAYOUT */

  --row-step: 80px;
  --column-step: 240px;
  --gap-step: 4px;
  --width-step: 12px;
  --height-step: 12px;
  --position-step: 12px;

  /* BORDERS */

  --border-width-step: 1px;
  --outline-width-step: 1px;
  --border-radius-step: 1px;

  /* SHADOWS */

  --box-shadow-offset-step: 1px;
  --box-shadow-blur-step: 2px;
  --box-shadow-spread-step: -0.25px;
  --box-shadow-color: rgb(var(--dark-rgb), 0.5);
}

[style*='--all:'] {
  all: var(--all);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* COLORS */

${actions.map(action => css`
[style*='--color${action}:']${action.replace('-', ':')} {
  color: var(--color${action});
}
`.trim()).join('\n')}
${actions.map(action => css`
[style*='--background${action}:']${action.replace('-', ':')} {
  background: var(--background${action});
}
`.trim()).join('\n')}

/* TYPOGRAPHY */

[style*='--font-size:'] {
  font-size: calc(var(--font-size-base) + (
    var(--font-size-step) * var(--font-size)));
}
[style*='--line-height:'] {
  line-height: calc(var(--line-height-step) * var(--line-height));
}
[style*='--word-spacing:'] {
  word-spacing: calc(var(--word-spacing-step) * var(--word-spacing));
}
[style*='--letter-spacing:'] {
  letter-spacing: calc(var(--letter-spacing-step) * var(--letter-spacing));
}

[style*='--text-overflow:'] {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: var(--text-overflow);
}
[style*='--overflow:'] {
  overflow: var(--overflow);
}
[style*='--white-space:'] {
  white-space: var(--white-space);
}

/* SPACING */

${sides.map(side => css`
[style*='--margin${side}:'] {
  margin${side}: calc(var(--margin-step) * var(--margin${side}));
}
`.trim()).join('\n')}
[style*='--margin-horizontal:'] {
  margin-left: calc(var(--margin-step) * var(--margin-horizontal));
  margin-right: calc(var(--margin-step) * var(--margin-horizontal));
}
[style*='--margin-vertical:'] {
  margin-top: calc(var(--margin-step) * var(--margin-vertical));
  margin-bottom: calc(var(--margin-step) * var(--margin-vertical));
}

${sides.map(side => css`
[style*='--padding${side}:'] {
  padding${side}: calc(var(--padding-step) * var(--padding${side}));
}
`.trim()).join('\n')}
[style*='--padding-horizontal:'] {
  padding-left: calc(var(--padding-step) * var(--padding-horizontal));
  padding-right: calc(var(--padding-step) * var(--padding-horizontal));
}
[style*='--padding-vertical:'] {
  padding-top: calc(var(--padding-step) * var(--padding-vertical));
  padding-bottom: calc(var(--padding-step) * var(--padding-vertical));
}

/* LAYOUT */

[style*='--grid:'] {
  display: grid;
  grid: var(--grid);
}
[style*='--flow:'] {
  display: grid;
  grid-auto-flow: var(--flow);
  place-items: center;
}
[style*='--row-span:'] {
  grid-row: span var(--row-span);
}
[style*='--column-span:'] {
  grid-column: span var(--column-span);
}
[style*='--rows:'] {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(
    min(100%, max(var(--row-step), 100%/var(--rows))), 1fr));
}
[style*='--columns:'] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(
    min(100%, max(var(--column-step), 100%/var(--columns))), 1fr));
}
[style*='--gap:'] {
  gap: calc(var(--gap-step) * var(--gap));
}
[style*='--display:'] {
  display: var(--display);
}

[style*='--width:'] {
  width: calc(var(--width-step) * var(--width));
}
[style*='--max-width:'] {
  max-width: calc(var(--width-step) * var(--max-width));
}
[style*='--min-width:'] {
  min-width: calc(var(--width-step) * var(--min-width));
}

[style*='--height:'] {
  height: calc(var(--height-step) * var(--height));
}
[style*='--max-height:'] {
  max-height: calc(var(--height-step) * var(--max-height));
}
[style*='--min-height:'] {
  min-height: calc(var(--height-step) * var(--min-height));
}

[style*='--inset:'] {
  inset: calc(var(--position-step) * var(--inset));
}
${sides.filter(Boolean).map(side => css`
[style*='-${side}:'] {
  ${side.replace('-', '')}: calc(var(--position-step) * var(-${side}));
}
`.trim()).join('\n')}

/* BORDERS */

${actions.map(action => css`
[style*='--border-style${action}:']${action.replace('-', ':')} {
  border-style: var(--border-style${action});
}
[style*='--border-width${action}:']${action.replace('-', ':')} {
  border-width: var(--border-width${action});
}
[style*='--border-color${action}:']${action.replace('-', ':')} {
  border-color: var(--border-color${action});
}
[style*='--border-radius${action}:']${action.replace('-', ':')} {
  border-radius: var(--border-radius${action});
}
`.trim()).join('\n')}

${actions.map(action => css`
[style*='--outline${action}:']${action.replace('-', ':')} {
  outline: var(--outline${action});
}
`.trim()).join('\n')}

/* SHADOWS */

${actions.map(action => css`
[style*='--box-shadow${action}:']${action.replace('-', ':')} {
  box-shadow: 0
    calc(var(--box-shadow-offset-step) * var(--box-shadow${action}))
    calc(var(--box-shadow-blur-step) * var(--box-shadow${action}))
    calc(var(--box-shadow-spread-step) * var(--box-shadow${action}))
    var(--box-shadow-color);
}
`.trim()).join('\n')}

/* EFFECTS */

${effects.map(effect => actions.map(action => css`
[style*='--${effect}${action}:']${action.replace('-', ':')} {
  ${effect}: var(--${effect}${action});
}
`.trim())).flat().join('\n')}

/* COMBINATORS */

${[...mutableProperties, ...effects].map(
  effect => userActions.map(action => css`
*${action.replace('-', ':')} > [style*='--${effect}-parent${action}:'] {
  ${effect}: var(--${effect}-parent${action});
}
`.trim())).flat().join('\n')}

${[...mutableProperties, ...effects].map(
  effect => formActions.map(action => css`
*${action.replace('-', ':')} + [style*='--${effect}-sibling${action}:'] {
  ${effect}: var(--${effect}-sibling${action});
}
`.trim())).flat().join('\n')}

${[...mutableProperties, ...effects].map(
  effect => formActions.map(action => css`
*${action.replace('-', ':')} ~ [style*='--${effect}-antecessor${action}:'] {
  ${effect}: var(--${effect}-antecessor${action});
}
`.trim())).flat().join('\n')}

/* MEDIA QUERIES */

@media (min-width: 960px) {             
  [style*='--grid-large:'] {
    display: grid;
    grid: var(--grid-large);
  }

  [style*='--display-large:'] {
    display: var(--display-large);
  }
}

/* PSEUDO-ELEMENTS */

${actions.map(action => css`
[style*='--content-before${action}:']${action.replace('-', ':')}::before {
  content: var(--content-before${action});
}
[style*='--content-after${action}:']${action.replace('-', ':')}::after {
  content: var(--content-after${action});
}
[style*='--background-backdrop${action}:']${action.replace(
  '-', ':')}::backdrop {
  background: var(--background-backdrop${action});
}
`.trim()).join('\n')}

/* ANIMATIONS */

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

`.trim()
