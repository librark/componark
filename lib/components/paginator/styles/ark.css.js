const css = String.raw; export default css`
  .ark-paginator {
    background: var(--canvas, white);
    color: var(--ink, black);
  }

  /*-------------- THEME-------------- */

  .ark-paginator[background=primary] {
    background: var(--primary);
    color: white;
  }

  .ark-paginator.ark-paginator[color=primary] {
    color: var(--primary);
  }

  .ark-paginator[background=secondary] {
    background: var(--secondary);
    color: white;
  }

  .ark-paginator.ark-paginator[color=secondary] {
    color: var(--secondary);
  }

  .ark-paginator[background=success] {
    background: var(--success);
    color: white;
  }

  .ark-paginator.ark-paginator[color=success] {
    color: var(--success);
  }

  .ark-paginator[background=danger] {
    background: var(--danger);
    color: white;
  }

  .ark-paginator.ark-paginator[color=danger] {
    color: var(--danger);
  }

  .ark-paginator[background=warning] {
    background: var(--warning);
    color: white;
  }

  .ark-paginator.ark-paginator[color=warning] {
    color: var(--warning);
  }

  .ark-paginator[background=info] {
    background: var(--info);
    color: white;
  }

  .ark-paginator.ark-paginator[color=info] {
    color: var(--info);
  }

  .ark-paginator[background=dark] {
    background: var(--dark);
    color: white;
  }

  .ark-paginator.ark-paginator[color=dark] {
    color: var(--dark);
  }

  .ark-paginator[background=muted] {
    background: var(--muted);
    color: white;
  }

  .ark-paginator.ark-paginator[color=muted] {
    color: var(--muted);
  }

  .ark-paginator[background=light] {
    background: var(--light);
    color: white;
  }

  .ark-paginator.ark-paginator[color=light] {
    color: var(--light);
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
    border: 1px solid var(--primary);
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
