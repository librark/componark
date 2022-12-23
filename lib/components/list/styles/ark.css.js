const css = String.raw; export default css`
  .ark-list {
    background: var(--canvas, white);
    color: var(--ink, black);
    display: grid;
    user-select: none;
  }

  /* THEME */
  .ark-list[background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-list.ark-list[color=primary] {
    color: var(--primary, white);
  }

  .ark-list[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-list.ark-list[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-list[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-list.ark-list[color=success] {
    color: var(--success, white);
  }

  .ark-list[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-list.ark-list[color=danger] {
    color: var(--danger, white);
  }

  .ark-list[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-list.ark-list[color=warning] {
    color: var(--warning, white);
  }

  .ark-list[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-list.ark-list[color=info] {
    color: var(--info, white);
  }

  .ark-list[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-list.ark-list[color=dark] {
    color: var(--dark, white);
  }

  .ark-list[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-list.ark-list[color=muted] {
    color: var(--muted, white);
  }

  .ark-list[background=light] {
    background: rgb(var(--light));
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