const css = String.raw; export default css`
  .ark-modal {
    display: none;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .ark-modal__content {
    background: var(--canvas, white);
    color: var(--ink, black);
    border-radius: var(--roundness, 4px);
    display: grid;
    position: relative;
    left: 0;
    z-index: inherit;
    max-width: calc(100vw - 3vmin);
    max-height: calc(100vh - 3vmin);
    overflow: hidden;
  }

  /* THEME */

  .ark-modal__content[background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=primary] {
    color: rgb(var(--primary));
  }

  .ark-modal__content[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-modal__content[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=success] {
    color: rgb(var(--success));
  }

  .ark-modal__content[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-modal__content[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-modal__content[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=info] {
    color: rgb(var(--info));
  }

  .ark-modal__content[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-modal__content[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-modal__content[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-modal__content.ark-modal__content[color=light] {
    color: rgb(var(--light));
  }

  /* ----------------- */

  .ark-modal[show] {
    display: grid;
  }

  .ark-modal__scrim {
    background: rgba(0, 0, 0, 0.5);
    position: inherit;
    width: inherit;
    height: inherit;
    top: inherit;
    left: inherit;
  }

  .ark-modal[horizontal~=center] {
    justify-content: center;
  }

  .ark-modal[horizontal~=start] {
    justify-content: start;
  }

  .ark-modal[horizontal~=end] {
    justify-content: end;
  }

  .ark-modal[vertical~=center] {
    align-items: center;
  }

  .ark-modal[vertical~=start] {
    align-items: start;
  }

  .ark-modal[vertical~=end] {
    align-items: end;
  }

  .ark-modal__header {
    display: grid;
    user-select: none;
    padding: 0.5rem;
  }

  .ark-modal__body {
    overflow: auto;
    height: 100%;
  }

  .ark-modal__actions {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    padding: 0.3rem;
    gap: 1rem;
  }

  .ark-modal__header {
    padding: 1rem;
  }

  .ark-modal__body {
    background: white;
    color: var(--dark);
  }

  .ark-modal__content {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), -7px -3px 4px rgba(0, 0, 0, 0.06);
  }

  .ark-modal__title {
    font-size: 1.5rem;
  }

  .ark-modal__actions {
    padding: 0.5rem 0.8rem;
  }
`