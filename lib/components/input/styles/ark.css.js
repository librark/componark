const css = String.raw; export default css`  
  .ark-input {
    padding: 10px;
  }

  .ark-input[disabled] {
    pointer-events: none;
    cursor: default;
  }

  .ark-input[disabled] label input:disabled {
    background-color: #f3f0f0;
    border-color: rgba(185, 185, 185, 0.712);
  }

  .ark-input__label {
    display: block;
    text-overflow: ellipsis;
    user-select: none;
  }

  .ark-input__input {
    border-radius: var(--roundness, 4px);
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 2px solid black;
  }

  /* ------------THEME------------ */

  .ark-input__input[background=primary] {
    background: var(--primary);
    color: white;
  }

  .ark-input__input[border-color=primary] {
    border-color: var(--primary);
  }

  .ark-input__input[border-color=primary]:focus,
  .ark-input__input[border-color=primary]:hover {
    border-color: var(--dark);
  }

  .ark-input__input[color=primary] {
    color: var(--primary);
  }

  .ark-input__input[background=secondary] {
    background: var(--secondary);
    color: white;
  }

  .ark-input__input[border-color=secondary] {
    border-color: var(--secondary);
  }

  .ark-input__input[color=secondary] {
    color: var(--secondary);
  }

  .ark-input__input[background=success] {
    background: var(--success);
    color: white;
  }

  .ark-input__input[border-color=success] {
    border-color: var(--success);
  }

  .ark-input__input[color=success] {
    color: var(--success);
  }

  .ark-input__input[background=danger] {
    background: var(--danger);
    color: white;
  }

  .ark-input__input[border-color=danger] {
    border-color: var(--danger);
  }

  .ark-input__input[color=danger] {
    color: var(--danger);
  }

  .ark-input__input[background=warning] {
    background: var(--warning);
    color: white;
  }

  .ark-input__input[border-color=warning] {
    border-color: var(--warning);
  }

  .ark-input__input[color=warning] {
    color: var(--warning);
  }

  .ark-input__input[background=info] {
    background: var(--info);
    color: white;
  }

  .ark-input__input[border-color=info] {
    border-color: var(--info);
  }

  .ark-input__input[color=info] {
    color: var(--info);
  }

  .ark-input__input[background=dark] {
    background: var(--dark);
    color: white;
  }

  .ark-input__input[border-color=dark] {
    border-color: var(--dark);
  }

  .ark-input__input[color=dark] {
    color: var(--dark);
  }

  .ark-input__input[background=muted] {
    background: var(--muted);
    color: white;
  }

  .ark-input__input[border-color=muted] {
    border-color: var(--muted);
  }

  .ark-input__input[color=muted] {
    color: var(--muted);
  }

  .ark-input__input[background=light] {
    background: var(--light);
    color: white;
  }

  .ark-input__input[border-color=light] {
    border-color: var(--light);
  }

  .ark-input__input[color=light] {
    color: var(--light);
  }

  /* ------------------------------ */

  .ark-input[inline] label {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 0.1fr 1fr;
    white-space: nowrap;
    align-items: center;
    width: 100%;
  }

  .ark-input[inline] label input {
    display: initial;
    margin-left: 0.5rem;
  }

  .ark-input__input {
    padding: 0.8rem;
    border: 2px solid #aaa7a7;
    outline: none;
  }

  .ark-input__input:focus,
  .ark-input__input:hover {
    box-shadow: 0 0 3pt 1pt rgba(0, 0, 255, 0.4);
    outline: none;
  }
`