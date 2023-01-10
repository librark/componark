const actions = [
  '', '-hover',  '-active', '-focus-within', '-valid', '-invalid']

const sides = ['', '-top', '-right', '-bottom', '-left']

const css = String.raw; export default css`
* {
  margin: 0;
  box-sizing: border-box;
}

html {
  /* COLORS (RGB) */

  --primary-rgb: 0, 0, 255; /* blue */
  --secondary-rgb: 255, 165, 0; /* orange */
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

  --font-size-step: 0.25rem;
  --line-height-step: 0.5;
  --word-spacing-step: 0.1rem;
  --letter-spacing-step: 0.05rem;

  /* SPACING */

  --margin-step: 4px;
  --padding-step: 4px;

  /* LAYOUT */

  --column-step: 240px;
  --gap-step: 4px;
  --width-step: 8px;
  --height-step: 8px;
  --position-step: 8px;

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
${actions.map(action => css`
[style*='--opacity${action}:']${action.replace('-', ':')} {
  opacity: var(--opacity${action});
}
`.trim()).join('\n')}

/* TYPOGRAPHY */

[style*='--font-size:'] {
  font-size: calc(var(--font-size-step) * var(--font-size));
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

${actions.map(action => css`
[style*='--child-display${action}:']${
  action.replace('-', ':')} > *:last-child {
  display: var(--child-display${action});
}
[style*='--adjacent-display${action}']${
  action.replace('-', ':')} + * {
  display: var(--adjacent-display${action});
}
`.trim()).join('\n')}

[style*='--child-display:'] > *:last-child {
  display: var(--child-display);
}
[style*='--adjacent-display:'] + * {
  display: var(--adjacent-display);
}

[style*='--flow:'] {
  display: grid;
  grid-auto-flow: var(--flow);
  place-items: center;
}
[style*='--column-span:'] {
  grid-column: span var(--column-span);
}
[style*='--row-span:'] {
  grid-row: span var(--row-span);
}
[style*='--gap:'] {
  gap: calc(var(--gap-step) * var(--gap));
}
[style*='--columns:'] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(
    min(100%, max(var(--column-step), 100%/var(--columns))), 1fr));
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

${sides.map(side => actions.map(action => css`
[style*='--border${side}${action}:']${action.replace('-', ':')} {
  border${side}: var(--border${side}${action});
}
`.trim())).flat().join('\n')}
[style*='--border-width:'] {
  border-width: calc(var(--border-width-step) * var(--border-width));
}
[style*='--border-radius:'] {
  border-radius: calc(var(--border-radius-step) * var(--border-radius));
}

${actions.map(action => css`
[style*='--outline${action}:']${action.replace('-', ':')} {
  outline: var(--outline${action});
}
`.trim()).join('\n')}
[style*='--outline-width:'] {
  outline-width: calc(var(--outline-width-step) * var(--outline-width));
}

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

/* FILTERS */

${actions.map(action => css`
[style*='--filter${action}:']${action.replace('-', ':')} {
  filter: var(--filter${action});
}
`.trim()).join('\n')}

/* TRANSITIONS */

${actions.map(action => css`
[style*='--transition${action}:']${action.replace('-', ':')} {
  transition: var(--transition${action});
}
`.trim()).join('\n')}

/* TRANSFORMS */

${actions.map(action => css`
[style*='--transform${action}:']${action.replace('-', ':')} {
  transform: var(--transform${action});
}
`.trim()).join('\n')}

/* BLENDS */

${actions.map(action => css`
[style*='--mix-blend-mode${action}:']${action.replace('-', ':')} {
  mix-blend-mode: var(--mix-blend-mode${action});
}
`.trim()).join('\n')}

`
