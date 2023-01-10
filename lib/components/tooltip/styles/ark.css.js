const css = String.raw; export default css`
  .ark-tooltip {
    position: relative;
    display: grid;
    background: transparent;
  }

  .ark-tooltip:hover .ark-tooltip__text {
    visibility: visible;
    border: 1px solid rgb(158, 158, 158);
    opacity: 1;
  }


  .ark-tooltip .ark-tooltip__text {
    background: var(--canvas, white);
    color: var(--ink, black);
    visibility: hidden;
    width: 120px;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
    user-select: none;
  }

  .ark-tooltip .ark-tooltip__text[background=primary] {
    background: (var(--primary));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=primary] {
    color: (var(--primary));
  }

  .ark-tooltip .ark-tooltip__text[background=secondary] {
    background: (var(--secondary));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=secondary] {
    color: (var(--secondary));
  }

  .ark-tooltip .ark-tooltip__text[background=success] {
    background: (var(--success));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=success] {
    color: (var(--success));
  }

  .ark-tooltip .ark-tooltip__text[background=danger] {
    background: (var(--danger));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=danger] {
    color: (var(--danger));
  }

  .ark-tooltip .ark-tooltip__text[background=warning] {
    background: (var(--warning));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=warning] {
    color: (var(--warning));
  }

  .ark-tooltip .ark-tooltip__text[background=info] {
    background: (var(--info));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=info] {
    color: (var(--info));
  }

  .ark-tooltip .ark-tooltip__text[background=dark] {
    background: (var(--dark));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=dark] {
    color: (var(--dark));
  }

  .ark-tooltip .ark-tooltip__text[background=muted] {
    background: (var(--muted));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=muted] {
    color: (var(--muted));
  }

  .ark-tooltip .ark-tooltip__text[background=light] {
    background: (var(--light));
    color: white;
  }

  .ark-tooltip .ark-tooltip__text.ark-tooltip .ark-tooltip__text[color=light] {
    color: (var(--light));
  }

  .ark-tooltip .ark-tooltip__top {
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
  }

  .ark-tooltip .ark-tooltip__right {
    top: -5px;
    left: 125%;
  }

  .ark-tooltip .ark-tooltip__bottom {
    top: 135%;
    left: 50%;
    margin-left: -60px;
  }

  .ark-tooltip .ark-tooltip__left {
    top: -5px;
    bottom: auto;
    right: 128%;
  }
`  