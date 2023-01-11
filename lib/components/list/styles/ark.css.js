const css = String.raw; export default css`
  .ark-list {
    background: var(--canvas, white);
    color: var(--ink, black);
    display: grid;
    user-select: none;
  }

  /* THEME */
  .ark-list[background=primary] {
    background: var(--primary);
    color: white;
  }

  .ark-list.ark-list[color=primary] {
    color: var(--primary);
  }

  .ark-list[background=secondary] {
    background: var(--secondary);
    color: white;
  }

  .ark-list.ark-list[color=secondary] {
    color: var(--secondary);
  }

  .ark-list[background=success] {
    background: var(--success);
    color: white;
  }

  .ark-list.ark-list[color=success] {
    color: var(--success);
  }

  .ark-list[background=danger] {
    background: var(--danger);
    color: white;
  }

  .ark-list.ark-list[color=danger] {
    color: var(--danger);
  }

  .ark-list[background=warning] {
    background: var(--warning);
    color: white;
  }

  .ark-list.ark-list[color=warning] {
    color: var(--warning);
  }

  .ark-list[background=info] {
    background: var(--info);
    color: white;
  }

  .ark-list.ark-list[color=info] {
    color: var(--info);
  }

  .ark-list[background=dark] {
    background: var(--dark);
    color: white;
  }

  .ark-list.ark-list[color=dark] {
    color: var(--dark);
  }

  .ark-list[background=muted] {
    background: var(--muted);
    color: white;
  }

  .ark-list.ark-list[color=muted] {
    color: var(--muted);
  }

  .ark-list[background=light] {
    background: var(--light);
    color: white;
  }

  .ark-list.ark-list[color=light] {
    color: var(--light);
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