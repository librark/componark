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
    background: var(--primary, black);
    color: white;
  }

  .ark-input__input[border-color=primary] {
    border-color: var(--primary, white);
  }

  .ark-input__input[border-color=primary]:focus,
  .ark-input__input[border-color=primary]:hover {
    border-color: var(--dark);
  }

  .ark-input__input[color=primary] {
    color: var(--primary, white);
  }

  .ark-input__input[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-input__input[border-color=secondary] {
    border-color: var(--secondary, white);
  }

  .ark-input__input[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-input__input[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-input__input[border-color=success] {
    border-color: var(--success, white);
  }

  .ark-input__input[color=success] {
    color: var(--success, white);
  }

  .ark-input__input[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-input__input[border-color=danger] {
    border-color: var(--danger, white);
  }

  .ark-input__input[color=danger] {
    color: var(--danger, white);
  }

  .ark-input__input[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-input__input[border-color=warning] {
    border-color: var(--warning, white);
  }

  .ark-input__input[color=warning] {
    color: var(--warning, white);
  }

  .ark-input__input[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-input__input[border-color=info] {
    border-color: var(--info, white);
  }

  .ark-input__input[color=info] {
    color: var(--info, white);
  }

  .ark-input__input[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-input__input[border-color=dark] {
    border-color: var(--dark, white);
  }

  .ark-input__input[color=dark] {
    color: var(--dark, white);
  }

  .ark-input__input[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-input__input[border-color=muted] {
    border-color: var(--muted, white);
  }

  .ark-input__input[color=muted] {
    color: var(--muted, white);
  }

  .ark-input__input[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-input__input[border-color=light] {
    border-color: var(--light, white);
  }

  .ark-input__input[color=light] {
    color: var(--light, white);
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