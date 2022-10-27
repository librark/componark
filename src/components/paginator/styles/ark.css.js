const css = String.raw; export default css`
  .ark-paginator {
    background: var(--canvas, white);
    color: var(--ink, black);
  }

  /*-------------- THEME-------------- */

  .ark-paginator[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=primary] {
    color: var(--primary, white);
  }

  .ark-paginator[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-paginator[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=success] {
    color: var(--success, white);
  }

  .ark-paginator[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=danger] {
    color: var(--danger, white);
  }

  .ark-paginator[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=warning] {
    color: var(--warning, white);
  }

  .ark-paginator[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=info] {
    color: var(--info, white);
  }

  .ark-paginator[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=dark] {
    color: var(--dark, white);
  }

  .ark-paginator[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=muted] {
    color: var(--muted, white);
  }

  .ark-paginator[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-paginator.ark-paginator[color=light] {
    color: var(--light, white);
  }

  /*-------------------------------------------*/

  .ark-paginator__body {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
  }

  .ark-paginator__footer {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
  }

  .ark-paginator__footer small[data-info] {
    color: var(--primary);
  }

  .ark-paginator__buttons {
    margin: 10px;
  }

  .ark-paginator__buttons button {
    width: 1.8rem;
    height: 1.8rem;
    border: 0;
    margin: 0.1rem;
    background: inherit;
  }

  .ark-paginator__buttons button:focus {
    outline: none;
  }

  .ark-paginator__buttons button:active {
    border: 1px solid black;
  }

  .ark-paginator__buttons button[on-click=_prev],
  .ark-paginator__buttons button[on-click=_next] {
    border: 2px solid rgba(128, 128, 128, 0.411);
    background: white;
  }

  .ark-paginator__buttons button[on-click=_first],
  .ark-paginator__buttons button[on-click=_last] {
    border: 2px solid rgba(128, 128, 128, 0.411);
    background: white;
  }

  .ark-paginator__pages {
    display: grid;
    grid-auto-flow: column;
  }

  .ark-paginator__pages button {
    min-width: 1.8rem;
    width: 1.8rem;
    min-height: 1.8rem;
    height: 1.8rem;
    border: 1px solid var(--primary, black);
    margin: 0.1rem;
    text-align: center;
  }

  .ark-paginator__pages button:focus {
    outline: none;
  }

  .ark-paginator__pages button[active] {
    background: var(--primary, blue);
    color: white;
  }

  .ark-paginator__buttons button {
    border-radius: 4px;
    transition: transform 0.1s ease-in-out;
  }

  .ark-paginator__buttons button:hover {
    transform: scale(1.05);
  }

  .ark-paginator__pages {
    display: grid;
  }

  .ark-paginator__pages button {
    border-radius: 4px;
    transition: transform 0.1s ease-in-out;
  }

  .ark-paginator__pages button:focus {
    outline: none;
  }

  .ark-paginator__pages button[active] {
    background: var(--primary, blue);
    color: white;
  }

  .ark-paginator__pages button:hover {
    transform: scale(1.05);
  }
`