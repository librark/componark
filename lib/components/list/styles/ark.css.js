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
    color: rgb(var(--primary));
  }

  .ark-list[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-list.ark-list[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-list[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-list.ark-list[color=success] {
    color: rgb(var(--success));
  }

  .ark-list[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-list.ark-list[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-list[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-list.ark-list[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-list[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-list.ark-list[color=info] {
    color: rgb(var(--info));
  }

  .ark-list[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-list.ark-list[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-list[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-list.ark-list[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-list[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-list.ark-list[color=light] {
    color: rgb(var(--light));
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