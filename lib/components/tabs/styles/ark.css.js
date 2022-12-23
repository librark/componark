const css = String.raw; export default css`  
  .ark-tabs {
    background: var(--canvas, white);
    color: var(--ink, black);
    display: grid;
    grid-auto-flow: column;
    width: 100%;
    height: auto;
    overflow-x: scroll;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    user-select: none;
  }

  /* THEME  */

  .ark-tabs[background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-tabs.ark-tabs[color=primary] {
    color: rgb(var(--primary));
  }

  .ark-tabs[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-tabs.ark-tabs[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-tabs[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-tabs.ark-tabs[color=success] {
    color: rgb(var(--success));
  }

  .ark-tabs[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-tabs.ark-tabs[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-tabs[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-tabs.ark-tabs[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-tabs[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-tabs.ark-tabs[color=info] {
    color: rgb(var(--info));
  }

  .ark-tabs[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-tabs.ark-tabs[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-tabs[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-tabs.ark-tabs[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-tabs[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-tabs.ark-tabs[color=light] {
    color: rgb(var(--light));
  }

  .ark-tabs::-webkit-scrollbar {
    display: none;
  }

  .ark-tabs-item {
    cursor: pointer;
    padding: 0.5rem;
    text-align: center;
  }

  .ark-tabs-item[active] {
    background: var(--canvas, white);
    color: var(--ink, black);
  }

  .ark-tabs-item[active][background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=primary] {
    color: rgb(var(--primary));
  }

  .ark-tabs-item[active][background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-tabs-item[active][background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=success] {
    color: rgb(var(--success));
  }

  .ark-tabs-item[active][background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=danger] {
    color: rgb(var(--danger));
  }

  .ark-tabs-item[active][background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=warning] {
    color: rgb(var(--warning));
  }

  .ark-tabs-item[active][background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=info] {
    color: rgb(var(--info));
  }

  .ark-tabs-item[active][background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=dark] {
    color: rgb(var(--dark));
  }

  .ark-tabs-item[active][background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=muted] {
    color: rgb(var(--muted));
  }

  .ark-tabs-item[active][background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-tabs-item[active].ark-tabs-item[active][color=light] {
    color: rgb(var(--light));
  }

  /*--------------------------------*/

  .ark-tabs-item:hover {
    opacity: 0.8;
  }

  .ark-tabs-item button,
  .ark-tabs-item a {
    all: unset;
    padding: 0.3rem;
    margin: inherit;
    padding: inherit;
    width: auto;
    text-align: center;
    outline: 0;
  }

  .ark-tabs-item button ark-icon,
  .ark-tabs-item a ark-icon {
    font-size: 24px;
  }
`  