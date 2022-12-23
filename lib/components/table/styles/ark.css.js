const css = String.raw; export default css`
  .ark-table {
    background: var(--canvas, white);
    color: var(--ink, black);
    width: 100%;
    height: auto;
    display: block;
  }

  .ark-table[background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-table.ark-table[color=primary] {
    color: var(--primary, white);
  }

  .ark-table[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-table.ark-table[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-table[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-table.ark-table[color=success] {
    color: var(--success, white);
  }

  .ark-table[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-table.ark-table[color=danger] {
    color: var(--danger, white);
  }

  .ark-table[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-table.ark-table[color=warning] {
    color: var(--warning, white);
  }

  .ark-table[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-table.ark-table[color=info] {
    color: var(--info, white);
  }

  .ark-table[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-table.ark-table[color=dark] {
    color: var(--dark, white);
  }

  .ark-table[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-table.ark-table[color=muted] {
    color: var(--muted, white);
  }

  .ark-table[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-table.ark-table[color=light] {
    color: var(--light, white);
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