const css = String.raw; export default css`
  .ark-table {
    background: var(--canvas, white);
    color: var(--ink, black);
    width: 100%;
    height: auto;
    display: block;
  }

  .ark-table[background=primary] {
    background: var(--primary);
    color: white;
  }

  .ark-table.ark-table[color=primary] {
    color: var(--primary);
  }

  .ark-table[background=secondary] {
    background: var(--secondary);
    color: white;
  }

  .ark-table.ark-table[color=secondary] {
    color: var(--secondary);
  }

  .ark-table[background=success] {
    background: var(--success);
    color: white;
  }

  .ark-table.ark-table[color=success] {
    color: var(--success);
  }

  .ark-table[background=danger] {
    background: var(--danger);
    color: white;
  }

  .ark-table.ark-table[color=danger] {
    color: var(--danger);
  }

  .ark-table[background=warning] {
    background: var(--warning);
    color: white;
  }

  .ark-table.ark-table[color=warning] {
    color: var(--warning);
  }

  .ark-table[background=info] {
    background: var(--info);
    color: white;
  }

  .ark-table.ark-table[color=info] {
    color: var(--info);
  }

  .ark-table[background=dark] {
    background: var(--dark);
    color: white;
  }

  .ark-table.ark-table[color=dark] {
    color: var(--dark);
  }

  .ark-table[background=muted] {
    background: var(--muted);
    color: white;
  }

  .ark-table.ark-table[color=muted] {
    color: var(--muted);
  }

  .ark-table[background=light] {
    background: var(--light);
    color: white;
  }

  .ark-table.ark-table[color=light] {
    color: var(--light);
  }

  .ark-table table {
    width: 100%;
    max-width: -webkit-fill-available;
    border-collapse: collapse;
    border-style: hidden;
    border: 1px solid #ddd;
    margin: 0.5em 0em;
  }

  .ark-table table th,
  .ark-table table td {
    padding: 15px;
    text-align: left;
    border: 1px solid #ddd;
    padding: 8px;
    display: table-cell;
    vertical-align: inherit;
  }

  .ark-table table tr th:first-of-type,
  .ark-table table tr td:first-of-type {
    padding-left: 24px;
  }

  .ark-table table tr th:last-of-type,
  .ark-table table tr td:last-of-type {
    padding-right: 24px;
  }

  .ark-table table tr th:hover,
  .ark-table table tr td:hover {
    background-color: var(--light);
    color: var(--dark);
    cursor: pointer;
  }
` 