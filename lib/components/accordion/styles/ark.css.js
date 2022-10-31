const css = String.raw; export default css`
  .ark-accordion {
    display: grid;
    width: 100%;
    border-radius: 5px;
  }

  .ark-accordion-tab {
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: inherit;
    min-height: 48px;
    transition: min-height 280ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    position: relative;
    transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow-anchor: none;

    border-bottom: 1px solid #00000014;
  }

  .ark-accordion-tab:first-child {
    border-radius: 6px 6px 0 0;
  }
  ark-accordion-tab.ark-accordion-tab:last-child {
    border-radius: 0 0 6px 6px;
  }
  .ark-accordion-tab[active] {
    margin-bottom: var(--margin, 15px);
    border-radius: 4px 4px 0 0;
    box-shadow: 0;
  }
  .ark-accordion-tab[active] div.ark-accordion-tab__content {
    margin-bottom: 1.5em;
    position: relative;
  }
  .ark-accordion-tab[active] div.ark-accordion-tab__header {
    background: rgb(204 206 207);
  }

  .ark-accordion-tab[active] div.ark-accordion-tab__header small {
    color: black;
  }
  .ark-accordion-tab div.ark-accordion-tab__header small .ark-icon.ark-icon i {
    transform: rotate(0deg);
    transition: 0.2s;
  }

  .ark-accordion-tab[active]
    div.ark-accordion-tab__header
    small
    .ark-icon.ark-icon
    i {
    transform: rotate(90deg);
    transition: 0.2s;
  }

  .ark-accordion-tab:not([active]):hover div.ark-accordion-tab__header {
    color: black;
    background: #f8f9fa;
    transition: box-shadow 0.2s;
  }

  .ark-accordion-tab:hover div.ark-accordion-tab__header small {
    color: black;
  }

  .ark-accordion-tab[active] ~ .ark-accordion-tab[active] {
    margin-top: 0;
  }

  .ark-accordion-tab[active] ~ .ark-accordion-tab:not([active]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  .ark-accordion-tab:not([active]) ~ .ark-accordion-tab[active] {
    margin-top: var(margin, 15px);
  }

  .ark-accordion-tab[disabled] {
    background: rgb(245, 245, 245);
    cursor: auto;
  }
  .ark-accordion-tab[disabled] div.ark-accordion-tab__header:hover {
    background: rgb(245, 245, 245);
    cursor: auto;
  }
  .ark-accordion-tab[disabled] div.ark-accordion-tab__header small {
    color: rgb(183 179 179);
    cursor: auto;
  }

  .ark-accordion-tab__header span {
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: red;
  }

  .ark-accordion-tab__header small {
    all: unset;
    color: #6c757d;
    font-weight: 700;
  }

  .ark-accordion-tab__content {
    box-sizing: border-box;
    display: none;
    width: 100%;
    padding: 1.6em;
    position: relative;
    -webkit-animation-name: appear;
    animation-name: appear;
    -webkit-animation-duration: 0.2s;
    animation-duration: 0.2s;
    -webkit-animation-timing-function: margin 150ms cubic-bezier(0.4, 0, 0.2, 1)
      0ms;
    animation-timing-function: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  @-webkit-keyframes appear {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  [active] .ark-accordion-tab__content {
    display: block;
  }

  .ark-accordion-tab__header {
    border-radius: 4px 4px 0px 0px;
    padding: 1em 1.6em;
    font-size: 1em;
    border-top: 1px solid #e1e5e9;
  }

  .ark-accordion-tab__content {
    word-wrap: break-word;
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }
`