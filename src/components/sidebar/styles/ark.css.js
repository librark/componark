const css = String.raw; export default css`
  :root {
    --compact-width: 30%;
    --normal-width: 45%;
    --wide-width: 60%;
    --border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .ark-sidebar {
    display: none;
    z-index: 4096;
    width: 100vw;

    /* Responsive height*/
    height: 100%;
    height: -moz-available;
    height: -webkit-fill-available;
    height: fill-available;
    height: stretch;
    /* Latest specification */

    position: fixed;
    top: 0;
    left: 0;
    user-select: none;
  }

  .ark-sidebar__menu {
    min-width: 280px;
    width: var(--wide-width);
    height: 100%;
    display: grid;
    grid-template-rows: 0.15fr 1fr 0.15fr;
    position: absolute;
    background: var(--canvas, white);
    color: var(--ink, black);
  }

  .ark-sidebar__menu[side=left] {
    left: 0;
  }

  .ark-sidebar__menu[side=right] {
    right: 0;
  }

  /*-------------  THEME------------------ */

  .ark-sidebar__menu[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=primary] {
    color: var(--primary, white);
  }

  .ark-sidebar__menu[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-sidebar__menu[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=success] {
    color: var(--success, white);
  }

  .ark-sidebar__menu[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=danger] {
    color: var(--danger, white);
  }

  .ark-sidebar__menu[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=warning] {
    color: var(--warning, white);
  }

  .ark-sidebar__menu[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=info] {
    color: var(--info, white);
  }

  .ark-sidebar__menu[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=dark] {
    color: var(--dark, white);
  }

  .ark-sidebar__menu[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=muted] {
    color: var(--muted, white);
  }

  .ark-sidebar__menu[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-sidebar__menu.ark-sidebar__menu[color=light] {
    color: var(--light, white);
  }

  /*--------------------------------------*/

  .ark-sidebar[width=compact] .ark-sidebar__menu {
    width: var(--compact-width);
  }

  .ark-sidebar[width=normal] .ark-sidebar__menu {
    width: var(--normal-width);
  }

  .ark-sidebar[width=wide] .ark-sidebar__menu {
    width: var(--wide-width);
  }

  .ark-sidebar__body {
    box-sizing: border-box;
    display: grid;
    overflow-y: auto;
    height: 100%;
  }

  .ark-sidebar[gap] .ark-sidebar__body {
    grid-gap: 1rem;
  }

  .ark-sidebar[padded] .ark-sidebar__body {
    padding: 1rem;
  }

  .ark-sidebar__header,
  .ark-sidebar__footer {
    padding: 15px;
  }

  .ark-sidebar__header {
    border-bottom: var(--border);
  }

  .ark-sidebar__footer {
    border-top: var(--border);
  }

  .ark-sidebar__scrim {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .ark-sidebar[opened] {
    display: block;
  }

  .ark-sidebar__menu {
    box-shadow: 4px 3px 5px 3px rgba(0, 0, 0, 0.25);
  }

  .ark-sidebar[opened][side=left] .ark-sidebar__menu {
    animation: swipe-left;
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
  }

  @keyframes swipe-left {
    from {
      opacity: 0;
      transform: translateX(-280px);
    }

    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .ark-sidebar[opened][side=right] .ark-sidebar__menu {
    animation: swipe-right;
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
  }

  @keyframes swipe-right {
    from {
      opacity: 0;
      transform: translateX(280px);
    }

    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .ark-sidebar__header {
    background: var(--primary);
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    border-bottom: 4px solid rgba(128, 128, 128, 0.87);
  }

  .ark-sidebar__footer {
    background: var(--primary);
    color: white;
    border-top: 4px solid rgba(128, 128, 128, 0.87);
  }
`