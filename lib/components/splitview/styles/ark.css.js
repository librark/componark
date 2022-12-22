const css = String.raw; export default css`
  .ark-splitview {
    background: var(--light, black);
    color: dark;
    display: grid;
    grid-template-columns: none;
    width: 100%;
    height: 100%;
  }

  /* THEME */

  .ark-splitview[background=primary] {
    background: var(--primary, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=primary] {
    color: var(--primary, white);
  }

  .ark-splitview[background=secondary] {
    background: var(--secondary, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=secondary] {
    color: var(--secondary, white);
  }

  .ark-splitview[background=success] {
    background: var(--success, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=success] {
    color: var(--success, white);
  }

  .ark-splitview[background=danger] {
    background: var(--danger, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=danger] {
    color: var(--danger, white);
  }

  .ark-splitview[background=warning] {
    background: var(--warning, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=warning] {
    color: var(--warning, white);
  }

  .ark-splitview[background=info] {
    background: var(--info, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=info] {
    color: var(--info, white);
  }

  .ark-splitview[background=dark] {
    background: var(--dark, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=dark] {
    color: var(--dark, white);
  }

  .ark-splitview[background=muted] {
    background: var(--muted, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=muted] {
    color: var(--muted, white);
  }

  .ark-splitview[background=light] {
    background: var(--light, black);
    color: white;
  }

  .ark-splitview.ark-splitview[color=light] {
    color: var(--light, white);
  }

  /*---------------------------------*/

  @media (min-width: 960px) {
    .ark-splitview {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .ark-splitview>*:first-child {
    border-right: 2px solid rgba(128, 128, 128, 0.3);
  }

  .ark-splitview-master {
    position: relative;
    width: 100%;
    overflow: auto;
    height: inherit;
  }

  @media (min-width: 960px) {
    .ark-splitview-master[resize] {
      resize: horizontal;
    }
  }

  .ark-splitview-detail {
    background: inherit;
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    width: 100vw;
    height: 100vh;
  }

  .ark-splitview-detail[hidden] {
    display: none;
    visibility: hidden;
  }

  .ark-splitview-detail>* {
    overflow: auto;
  }

  .ark-splitview-detail__header {
    background: inherit;
    color: inherit;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    width: 100%;
    height: fit-content;
    font-size: initial;
    padding: 0.5rem;
    border-bottom: 2px solid #cecccc;
    user-select: none;
  }

  .ark-splitview-detail__header button {
    margin-right: 0.5rem;
  }

  .ark-splitview-detail__header button:hover {
    background: #dedfe4;
  }

  .ark-splitview-detail__close {
    display: block;
    padding: 0 19px;
    border: 0;
    outline: 0;
    background: inherit;
    color: inherit;
    cursor: pointer;
  }

  .ark-splitview-detail__title {
    display: grid;
    align-items: center;
    font-size: larger;
  }

  .ark-splitview-detail__body {
    height: 100%;
    padding: 1rem;
    overflow: auto;
  }

  .ark-splitview-detail__main {
    height: 100%;
    padding: 1rem;
  }

  .ark-splitview-detail__default-template {
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    color: gray;
    background: rgba(128, 128, 128, 0.1);
  }

  @media (min-width: 960px) {
    .ark-splitview-detail .ark-splitview {
      grid-template-columns: none;
    }

    .ark-splitview-detail {
      overflow: auto;
      position: initial;
      width: 100%;
      height: auto;
      height: initial;
      padding-top: 0;
    }

    .ark-splitview-detail[hidden] {
      display: block;
      visibility: visible;
    }

    .ark-splitview-detail__header {
      display: none;
    }

    .ark-splitview-detail__button--close {
      display: none;
    }

    .ark-splitview-detail__title {
      margin-left: 20px;
    }
  }
` 
