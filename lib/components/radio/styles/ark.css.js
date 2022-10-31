const css = String.raw; export default css`
  .ark-radio-group {
    background: var(--canvas, white);
    color: var(--ink, black);
    user-select: none;
    width: 100%;
    height: fit-content;
  }

  /* THEME */

  .ark-radio-group[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=primary] {
    color: var(--primary, white);
  }

  .ark-radio-group[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-radio-group[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=success] {
    color: var(--success, white);
  }

  .ark-radio-group[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=danger] {
    color: var(--danger, white);
  }

  .ark-radio-group[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=warning] {
    color: var(--warning, white);
  }

  .ark-radio-group[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=info] {
    color: var(--info, white);
  }

  .ark-radio-group[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=dark] {
    color: var(--dark, white);
  }

  .ark-radio-group[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=muted] {
    color: var(--muted, white);
  }

  .ark-radio-group[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=light] {
    color: var(--light, white);
  }

  /*---------------------------------*/

  .ark-radio-group__list {
    color: var(--primary, black);
  }

  .ark-radio-group__label {
    font-size: 1.2;
    margin: 0;
    padding: 5px;
    background: inherit;
  }

  .ark-radio-button {
    background: var(--canvas, white);
    color: var(--ink, black);
    cursor: pointer;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    user-select: none;
  }

  .ark-radio-button[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=primary] {
    color: var(--primary, white);
  }

  .ark-radio-button[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-radio-button[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=success] {
    color: var(--success, white);
  }

  .ark-radio-button[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=danger] {
    color: var(--danger, white);
  }

  .ark-radio-button[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=warning] {
    color: var(--warning, white);
  }

  .ark-radio-button[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=info] {
    color: var(--info, white);
  }

  .ark-radio-button[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=dark] {
    color: var(--dark, white);
  }

  .ark-radio-button[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=muted] {
    color: var(--muted, white);
  }

  .ark-radio-button[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=light] {
    color: var(--light, white);
  }

  .ark-radio-button__button {
    margin: 0 5px;
  }

  .ark-radio-button__button input[type=radio] {
    width: 20px;
    height: 20px;
  }
`