const css = String.raw; export default css`
  .ark-select {
    background: var(--canvas, white);
    color: var(--ink, black);
    display: grid;
  }

  /* THEME */
  .ark-select[background=primary] {
    background: var(--primary);
    color: white;
  }

  .ark-select.ark-select[color=primary] {
    color: var(--primary);
  }

  .ark-select[background=secondary] {
    background: var(--secondary);
    color: white;
  }

  .ark-select.ark-select[color=secondary] {
    color: var(--secondary);
  }

  .ark-select[background=success] {
    background: var(--success);
    color: white;
  }

  .ark-select.ark-select[color=success] {
    color: var(--success);
  }

  .ark-select[background=danger] {
    background: var(--danger);
    color: white;
  }

  .ark-select.ark-select[color=danger] {
    color: var(--danger);
  }

  .ark-select[background=warning] {
    background: var(--warning);
    color: white;
  }

  .ark-select.ark-select[color=warning] {
    color: var(--warning);
  }

  .ark-select[background=info] {
    background: var(--info);
    color: white;
  }

  .ark-select.ark-select[color=info] {
    color: var(--info);
  }

  .ark-select[background=dark] {
    background: var(--dark);
    color: white;
  }

  .ark-select.ark-select[color=dark] {
    color: var(--dark);
  }

  .ark-select[background=muted] {
    background: var(--muted);
    color: white;
  }

  .ark-select.ark-select[color=muted] {
    color: var(--muted);
  }

  .ark-select[background=light] {
    background: var(--light);
    color: white;
  }

  .ark-select.ark-select[color=light] {
    color: var(--light);
  }

  .ark-select--label {
    padding: 5px;
    font-weight: 700;
  }

  .ark-select[disabled] {
    pointer-events: none;
    cursor: default;
    color: var(--muted, grey);
    background: rgba(var(--muted), 0.1);
  }

  .ark-select[disabled]:hover {
    background: none;
  }

  .ark-select select {
    font-size: initial;
    color: inherit;
    background: inherit;
    border-color: initial;
    padding: 5px;
    margin: 5px;
  }

  .ark-select select:focus {
    outline: 1px solid var(--primary);
  }

  .ark-select select:hover {
    outline: 1px solid var(--primary);
  }

  .ark-select select,
  .ark-select option {
    cursor: pointer;
  }

  .ark-select::before,
  .ark-select::after {
    all: unset;
  }
`