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
    background: rgb(var(--primary));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=primary] {
    color: rgb(var(--primary));
  }

  .ark-radio-group[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-radio-group[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=success] {
    color: rgb(var(--success));
  }

  .ark-radio-group[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-radio-group[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-radio-group[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=info] {
    color: rgb(var(--info));
  }

  .ark-radio-group[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-radio-group[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-radio-group[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-radio-group.ark-radio-group[color=light] {
    color: rgb(var(--light));
  }

  /*---------------------------------*/

  .ark-radio-group__list {
    color: rgb(var(--primary));
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
    background: rgb(var(--primary));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=primary] {
    color: rgb(var(--primary));
  }

  .ark-radio-button[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-radio-button[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=success] {
    color: rgb(var(--success));
  }

  .ark-radio-button[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-radio-button[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-radio-button[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=info] {
    color: rgb(var(--info));
  }

  .ark-radio-button[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-radio-button[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-radio-button[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-radio-button.ark-radio-button[color=light] {
    color: rgb(var(--light));
  }

  .ark-radio-button__button {
    margin: 0 5px;
  }

  .ark-radio-button__button input[type=radio] {
    width: 20px;
    height: 20px;
  }
`