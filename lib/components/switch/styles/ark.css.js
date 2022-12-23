const css = String.raw; export default css`
  .ark-switch {
    --switch-width: 3.6em;
    --switch-height: 1.8em;
    --switch-padding: 0.2em;
    --switch-bgcolor-on: #29f;
    --switch-bgcolor-off: #ccc;
    --switch-bgcolor-disabled-on: #666;
    --switch-bgcolor-disabled-off: #666;
    --switch-ball-color: #fff;
    --switch-animation-duration: 0.5s;
    --switch-outline-mouse-focus: none;
    
    position: relative;
    display: inline-block;
    min-width: var(--switch-width);
    min-height: var(--switch-height);
  }

  .ark-switch__slider {
    background: var(--canvas, white);
    color: var(--ink, black);
    --switch-bgcolor: var(--switch-bgcolor-off);
    border-radius: var(--switch-height);
    position: absolute;
    inset: 0;
    background: var(--switch-bgcolor);
    transition: background var(--switch-animation-duration);
  }

  .ark-switch__slider[background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=primary] {
    color: rgb(var(--primary));
  }

  .ark-switch__slider[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-switch__slider[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=success] {
    color: rgb(var(--success));
  }

  .ark-switch__slider[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-switch__slider[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-switch__slider[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=info] {
    color: rgb(var(--info));
  }

  .ark-switch__slider[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-switch__slider[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-switch__slider[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-switch__slider.ark-switch__slider[color=light] {
    color: rgb(var(--light));
  }

  .ark-switch__slider::before {
    --switch-ball-diameter: calc(var(--switch-height) - var(--switch-padding) * 2);
    --switch-ball-transform: translateX(0);
    border-radius: 50%;
    content: "";
    width: var(--switch-ball-diameter);
    height: var(--switch-ball-diameter);
    position: absolute;
    inset: var(--switch-padding);
    background: var(--switch-ball-color);
    transform: var(--switch-ball-transform);
    transition: transform var(--switch-animation-duration);
  }

  @supports not (inset: 0) {
    .ark-switch__slider {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  @supports not (inset: 0) {
    .ark-switch__slider::before {
      top: var(--switch-padding);
      left: var(--switch-padding);
    }
  }

  .ark-switch__slider[checked] {
    --switch-bgcolor: var(--switch-bgcolor-on);
  }

  .ark-switch__slider[checked]::before {
    --switch-ball-transform: translateX(calc(var(--switch-width) - var(--switch-height)));
  }

  .ark-switch__slider[disabled] {
    --switch-bgcolor: var(--switch-bgcolor-disabled-off);
  }

  .ark-switch__slider[disabled][checked] {
    --switch-bgcolor: var(--switch-bgcolor-disabled-on);
  }
`