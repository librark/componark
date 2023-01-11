const css = String.raw; export default css`
/*
 * GENERAL VARIABLES
 *
 * --roundness
 *
 * SPECIFIC VARIABLES
 *
 * --canvas
 * --ink
*/

.ark-card {
  background: var(--canvas, white);
  color: var(--ink, black);

  border-radius: var(--roundness, 4px);

  display: block;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 7px 5px 5px -2px rgba(0, 0, 0, 0.1);
  border: 2px solid #d5d4d4;
}

/* ALIGN ALL*/

${['center', 'justify', 'left', 'right'].map(position => css`
.ark-card[align-all=${position}] {
  text-align: ${position};
}
`).join('\n')}

/* ALIGN HEADER */

${['center', 'justify', 'left', 'right'].map(position => css`
.ark-card__header[header-align=${position}] {
  text-align: ${position};
}
`).join('\n')}

/* APPLY COLOR THEME */
.ark-card[background=primary] {
  background: var(--primary);
  color: white;
}

.ark-card.ark-card[color=primary] {
  color: var(--primary);
}

.ark-card[background=secondary] {
  background: var(--secondary);
  color: white;
}

.ark-card.ark-card[color=secondary] {
  color: var(--secondary);
}

.ark-card[background=success] {
  background: var(--success);
  color: white;
}

.ark-card.ark-card[color=success] {
  color: var(--success);
}

.ark-card[background=danger] {
  background: var(--danger);
  color: white;
}

.ark-card.ark-card[color=danger] {
  color: var(--danger);
}

.ark-card[background=warning] {
  background: var(--warning);
  color: white;
}

.ark-card.ark-card[color=warning] {
  color: var(--warning);
}

.ark-card[background=info] {
  background: var(--info);
  color: white;
}

.ark-card.ark-card[color=info] {
  color: var(--info);
}

.ark-card[background=dark] {
  background: var(--dark);
  color: white;
}

.ark-card.ark-card[color=dark] {
  color: var(--dark);
}

.ark-card[background=muted] {
  background: var(--muted);
  color: white;
}

.ark-card.ark-card[color=muted] {
  color: var(--muted);
}

.ark-card[background=light] {
  background: var(--light);
  color: white;
}

.ark-card.ark-card[color=light] {
  color: var(--light);
}


.ark-card__media {
  display: grid;
  overflow: hidden;
  user-select: none;
}

.ark-card__media img {
  max-width: 100%;
}

.ark-card__header,
.ark-card__body,
.ark-card__actions {
  box-sizing: border-box;
  padding: 1rem;
  user-select: none;
}

.ark-card__body {
  letter-spacing: 0.02em;
  line-height: 1.5em;
  font-size: 0.9rem;
  word-wrap: break-word;
}

.ark-card__title {
  font-weight: 700;
  letter-spacing: 0.0125em;
  text-decoration: inherit;
  text-transform: inherit;
}

.ark-card__subtitle {
  font-size: 0.875rem;
  line-height: 1.25 rem;
  font-weight: 400;
  letter-spacing: 0.0125em;
  text-decoration: inherit;
  text-transform: inherit;
}

.ark-card__actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;
  justify-content: end;
}

.ark-card[animated] {
  transition: transform 0.1s ease-in-out;
}

.ark-card[animated]:hover {
  transform: scale(1.01);
  box-shadow: 7px 5px 5px -2px rgba(0, 0, 0, 0.23);
}

.ark-card[animated] .ark-card__actions .ark-button {
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
  transform: scale(1.12);
  transition: filter 0.1s ease, transform 0.2s ease-in-out;
}

.ark-card[animated] .ark-card__actions .ark-button:hover {
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  transform: scale(1.17);
  transition: transform 0.1s ease-in-out;
}

.ark-card[animated] .ark-card__actions .ark-button:active {
  transform: scale(1.12);
}

.ark-card[no-borders] {
  border: none;
  box-shadow: none;
}

.ark-card__header {
  border-top: 2px solid rgba(212, 212, 212, 0.178);
  padding: 0.5rem 1rem 0.2rem 1rem;
}
`
