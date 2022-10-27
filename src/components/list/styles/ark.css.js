const css = String.raw; export default css`
  .ark-list {
    background: var(--canvas, white);
    color: var(--ink, black);
    display: grid;
    user-select: none;
  }

  /* THEME */
  .ark-list[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-list.ark-list[color=primary] {
    color: var(--primary, white);
  }

  .ark-list[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-list.ark-list[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-list[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-list.ark-list[color=success] {
    color: var(--success, white);
  }

  .ark-list[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-list.ark-list[color=danger] {
    color: var(--danger, white);
  }

  .ark-list[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-list.ark-list[color=warning] {
    color: var(--warning, white);
  }

  .ark-list[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-list.ark-list[color=info] {
    color: var(--info, white);
  }

  .ark-list[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-list.ark-list[color=dark] {
    color: var(--dark, white);
  }

  .ark-list[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-list.ark-list[color=muted] {
    color: var(--muted, white);
  }

  .ark-list[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-list.ark-list[color=light] {
    color: var(--light, white);
  }

  /*--------------------------  */

  .ark-list-item {
    padding: 5px;
  }

  .ark-list-item[click-disabled] {
    cursor: default;
  }

  .ark-list[action] .ark-list-item {
    padding: 1rem;
    cursor: pointer;
  }
  `