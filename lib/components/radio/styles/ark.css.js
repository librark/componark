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
    background: (var(--primary));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=primary] {
    color: (var(--primary));
  }

  .ark-radio-group[background=secondary] {
    background: (var(--secondary));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=secondary] {
    color: (var(--secondary));
  }

  .ark-radio-group[background=success] {
    background: (var(--success));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=success] {
    color: (var(--success));
  }

  .ark-radio-group[background=danger] {
    background: (var(--danger));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=danger] {
    color: (var(--danger));
  }

  .ark-radio-group[background=warning] {
    background: (var(--warning));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=warning] {
    color: (var(--warning));
  }

  .ark-radio-group[background=info] {
    background: (var(--info));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=info] {
    color: (var(--info));
  }

  .ark-radio-group[background=dark] {
    background: (var(--dark));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=dark] {
    color: (var(--dark));
  }

  .ark-radio-group[background=muted] {
    background: (var(--muted));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=muted] {
    color: (var(--muted));
  }

  .ark-radio-group[background=light] {
    background: (var(--light));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=light] {
    color: (var(--light));
  }

  /*---------------------------------*/

  .ark-radio-group__list {
    color: (var(--primary));
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
    background: (var(--primary));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=primary] {
    color: (var(--primary));
  }

  .ark-radio-button[background=secondary] {
    background: (var(--secondary));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=secondary] {
    color: (var(--secondary));
  }

  .ark-radio-button[background=success] {
    background: (var(--success));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=success] {
    color: (var(--success));
  }

  .ark-radio-button[background=danger] {
    background: (var(--danger));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=danger] {
    color: (var(--danger));
  }

  .ark-radio-button[background=warning] {
    background: (var(--warning));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=warning] {
    color: (var(--warning));
  }

  .ark-radio-button[background=info] {
    background: (var(--info));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=info] {
    color: (var(--info));
  }

  .ark-radio-button[background=dark] {
    background: (var(--dark));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=dark] {
    color: (var(--dark));
  }

  .ark-radio-button[background=muted] {
    background: (var(--muted));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=muted] {
    color: (var(--muted));
  }

  .ark-radio-button[background=light] {
    background: (var(--light));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=light] {
    color: (var(--light));
  }

  .ark-radio-button__button {
    margin: 0 5px;
  }

  .ark-radio-button__button input[type=radio] {
    width: 20px;
    height: 20px;
  }
`