const css = String.raw; export default css`
  .ark-multiselect {
    display: grid;
    grid-template-columns: repeat(2, 1fr) 0.2fr;
    grid-gap: 0.2rem;
  }

  .ark-multiselect h1 {
    user-select: none;
  }

  .ark-multiselect .ark-multiselect {
    box-sizing: content-box;
    width: 100%;
  }

  .ark-multiselect .ark-multiselect__field {
    background: var(--canvas, white);
    color: var(--ink, black);
    grid-row: 2;
    grid-column: span 2;
    min-width: 0;
    padding: 0.5em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    overflow: hidden;
    border: 1px solid var(--light);
    border-radius: 0.2em;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
  }

  /* THEME */

  .ark-multiselect .ark-multiselect__field[background="primary"] {
    background: var(--primary);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="primary"] {
    color: var(--primary);
  }

  .ark-multiselect .ark-multiselect__field[background="secondary"] {
    background: var(--secondary);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="secondary"] {
    color: var(--secondary);
  }

  .ark-multiselect .ark-multiselect__field[background="success"] {
    background: var(--success);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="success"] {
    color: var(--success);
  }

  .ark-multiselect .ark-multiselect__field[background="danger"] {
    background: var(--danger);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="danger"] {
    color: var(--danger);
  }

  .ark-multiselect .ark-multiselect__field[background="warning"] {
    background: var(--warning);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="warning"] {
    color: var(--warning);
  }

  .ark-multiselect .ark-multiselect__field[background="info"] {
    background: var(--info);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="info"] {
    color: var(--info);
  }

  .ark-multiselect .ark-multiselect__field[background="dark"] {
    background: var(--dark);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="dark"] {
    color: var(--dark);
  }

  .ark-multiselect .ark-multiselect__field[background="muted"] {
    background: var(--muted);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="muted"] {
    color: var(--muted);
  }

  .ark-multiselect .ark-multiselect__field[background="light"] {
    background: var(--light);
    color: white;
  }

  .ark-multiselect .ark-multiselect__field.ark-multiselect .ark-multiselect__field[color="light"] {
    color: var(--light);
  }

  /* ---------------------------------------------- */

  .ark-multiselect .ark-multiselect__field--remove {
    cursor: pointer;
    grid-row: 2;
    grid-column: 3;
    align-self: start;
    font-size: 0.5rem;
    position: relative;
    left: -25px;
    width: fit-content;
    width: -moz-fit-content;
    padding: 0.28rem 0.4rem;
    background: transparent;
    color: black;
    user-select: none;
  }

  .ark-multiselect .ark-multiselect__field--remove:hover {
    background: #fa6e6e;
    color: white;
  }

  .ark-multiselect .ark-multiselect__field--remove:hover:after {
    content: "clear";
    position: absolute;
    top: 20px;
    left: 2px;
    color: black;
  }

  .ark-multiselect .ark-multiselect__field:focus,
  .ark-multiselect .ark-multiselect__field:focus-within {
    border: 2px solid var(--primary);
    outline: none;
  }

  .ark-multiselect .ark-multiselect__field input {
    width: 100%;
    min-width: 100px;
    padding: 0.5em;
    border: none;
    outline: none;
    background: transparent;
    margin: 0.2em 0.2em;
  }

  .ark-multiselect .ark-multiselect__tag {
    position: relative;
    display: inline-grid;
    align-items: center;
    padding: 0.25em 1.5em 0.25em 0.5em;
    border: 1px solid #bdbdbd;
    border-radius: 0.2em;
    margin: 0.2em;
    line-height: 1;
    vertical-align: middle;
  }

  .ark-multiselect .ark-multiselect__tag:last-child {
    margin-right: 0;
  }

  .ark-multiselect .ark-multiselect__tag:hover {
    background: #efefef;
  }

  .ark-multiselect .ark-multiselect__tag-text {
    min-height: 1em;
  }

  .ark-multiselect .ark-multiselect__tag-remove-button {
    position: absolute;
    top: 0.25em;
    right: 0.25em;
    width: 1em;
    height: 1em;
    opacity: 0.3;
  }

  .ark-multiselect .ark-multiselect__tag-remove-button:hover {
    opacity: 1;
  }

  .ark-multiselect .ark-multiselect__tag-remove-button:before,
  .ark-multiselect .ark-multiselect__tag-remove-button:after {
    content: " ";
    position: absolute;
    left: 0.5em;
    width: 2px;
    height: 1em;
    background-color: #333;
  }

  .ark-multiselect .ark-multiselect__tag-remove-button:before {
    transform: rotate(45deg);
  }

  .ark-multiselect .ark-multiselect__tag-remove-button:after {
    transform: rotate(-45deg);
  }

  .ark-multiselect .ark-multiselect__popup {
    display: none;
    grid-row: 3;
    grid-column: span 2;
    overflow-y: auto;
    width: 100%;
    max-height: 300px;
    box-sizing: border-box;
    border: 1px solid var(--light);
    border-radius: 0.2em;
    background: white;
    user-select: none;
  }

  .ark-multiselect .ark-multiselect-list {
    padding: 0;
    margin: 0;
  }

  .ark-multiselect .ark-multiselect-list__no-options {
    pointer-events: none;
    user-select: none;
  }

  .ark-multiselect .ark-multiselect-list ul {
    margin: 0;
    padding: 0;
  }

  .ark-multiselect .ark-multiselect-list li {
    padding: 0.5em 1em;
    min-height: 1em;
    list-style: none;
    cursor: pointer;
  }

  .ark-multiselect .ark-multiselect-list li[selected] {
    background: #ceebcb;
  }

  .ark-multiselect .ark-multiselect-list li[selected]::after {
    content: "✓";
  }

  .ark-multiselect .ark-multiselect-list li:focus,
  .ark-multiselect .ark-multiselect-list li:hover {
    outline: dotted 1px var(--dark);
    background: var(--primary);
    color: var(--light);
  }
`