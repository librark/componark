const css = String.raw; export default css` 
 .ark-checkbox {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    justify-items: start;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    width: fit-content;
    user-select: none;
    font-size: 1.2rem;
  }

  .ark-checkbox-group {
    user-select: none;
    width: 100%;
    height: fit-content;
  }

  .ark-checkbox-group__label {
    background: inherit;
    font-size: 1.2;
    margin: 0;
    padding: 5px;
  }

  .ark-checkbox__input {
    background: var(--canvas, white);
    color: var(--ink, black);

    display: grid;
    margin: 0;
  }

  /*Theme applying*/
  .ark-checkbox__input[background=primary] {
    background: var(--primary);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=primary] {
    color: var(--primary);
  }

  .ark-checkbox__input[background=secondary] {
    background: var(--secondary);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=secondary] {
    color: var(--secondary);
  }

  .ark-checkbox__input[background=success] {
    background: var(--success);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=success] {
    color: var(--success);
  }

  .ark-checkbox__input[background=danger] {
    background: var(--danger);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=danger] {
    color: var(--danger);
  }

  .ark-checkbox__input[background=warning] {
    background: var(--warning);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=warning] {
    color: var(--warning);
  }

  .ark-checkbox__input[background=info] {
    background: var(--info);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=info] {
    color: var(--info);
  }

  .ark-checkbox__input[background=dark] {
    background: var(--dark);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=dark] {
    color: var(--dark);
  }

  .ark-checkbox__input[background=muted] {
    background: var(--muted);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=muted] {
    color: var(--muted);
  }

  .ark-checkbox__input[background=light] {
    background: var(--light);
    color: white;
  }

  .ark-checkbox__input.ark-checkbox__input[color=light] {
    color: var(--light);
  }


  .ark-checkbox__input input[type=checkbox] {
    display: grid;
    place-content: center;

    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    width: 1.2em;
    height: 1.2em;
    color: currentColor;
    border: 1px solid currentColor;
    border-radius: 0.15em;
  }

  .ark-checkbox__input input[type=checkbox]:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }

  .ark-checkbox__input input[type=checkbox]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em currentColor;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  .ark-checkbox__input input[type=checkbox]:checked::before {
    transform: scale(1);
  }

  .ark-checkbox__input input[type=checkbox]:disabled {
    color: #959495;
    cursor: not-allowed;
  }
`