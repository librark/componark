const css = String.raw; export default css`
  .ark-select {
    background: var(--canvas, white);
    color: var(--ink, black);
    display: grid;
  }

  /* THEME */
  .ark-select[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-select.ark-select[color=primary] {
    color: var(--primary, white);
  }

  .ark-select[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-select.ark-select[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-select[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-select.ark-select[color=success] {
    color: var(--success, white);
  }

  .ark-select[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-select.ark-select[color=danger] {
    color: var(--danger, white);
  }

  .ark-select[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-select.ark-select[color=warning] {
    color: var(--warning, white);
  }

  .ark-select[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-select.ark-select[color=info] {
    color: var(--info, white);
  }

  .ark-select[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-select.ark-select[color=dark] {
    color: var(--dark, white);
  }

  .ark-select[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-select.ark-select[color=muted] {
    color: var(--muted, white);
  }

  .ark-select[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-select.ark-select[color=light] {
    color: var(--light, white);
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