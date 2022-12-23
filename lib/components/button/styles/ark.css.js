const css = String.raw; export default css`
:root {
  --fab-size-small: 2rem;
  --fab-size-medium: 2.5rem;
  --fab-size-big: 3rem;
}

.ark-button {
  border-radius: var(--roundness, 4px);
  user-select: none;
  cursor: pointer;
  display: inline-grid;
  transition: background 0.5s;
  box-sizing: border-box;
  padding: 0.3rem 0.8rem;
  font-size: 1.05rem;
  vertical-align: middle;
}

.ark-button[background=primary] {
  background: rgb(var(--primary)) radial-gradient(circle, transparent 1%, rgb(var(--primary)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=primary] {
  border: 2px solid rgb(var(--primary));
}

.ark-button.ark-button[color=primary] {
  color: rgb(var(--primary));
}

.ark-button[background=secondary] {
  background: rgb(var(--secondary)) radial-gradient(circle, transparent 1%, rgb(var(--secondary)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=secondary] {
  border: 2px solid rgb(var(--secondary));
}

.ark-button.ark-button[color=secondary] {
  color: rgb(var(--secondary));
}

.ark-button[background=success] {
  background: rgb(var(--success)) radial-gradient(circle, transparent 1%, rgb(var(--success)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=success] {
  border: 2px solid rgb(var(--success));
}

.ark-button.ark-button[color=success] {
  color: rgb(var(--success));
}

.ark-button[background=danger] {
  background: rgb(var(--danger)) radial-gradient(circle, transparent 1%, rgb(var(--danger)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=danger] {
  border: 2px solid rgb(var(--danger));
}

.ark-button.ark-button[color=danger] {
  color: rgb(var(--danger));
}

.ark-button[background=warning] {
  background: rgb(var(--warning)) radial-gradient(circle, transparent 1%, rgb(var(--warning)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=warning] {
  border: 2px solid rgb(var(--warning));
}

.ark-button.ark-button[color=warning] {
  color: rgb(var(--warning));
}

.ark-button[background=info] {
  background: rgb(var(--info)) radial-gradient(circle, transparent 1%, rgb(var(--info)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=info] {
  border: 2px solid rgb(var(--info));
}

.ark-button.ark-button[color=info] {
  color: rgb(var(--info));
}

.ark-button[background=dark] {
  background: rgb(var(--dark)) radial-gradient(circle, transparent 1%, rgb(var(--dark)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=dark] {
  border: 2px solid rgb(var(--dark));
}

.ark-button.ark-button[color=dark] {
  color: rgb(var(--dark));
}

.ark-button[background=muted] {
  background: rgb(var(--muted)) radial-gradient(circle, transparent 1%, rgb(var(--muted)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=muted] {
  border: 2px solid rgb(var(--muted));
}

.ark-button.ark-button[color=muted] {
  color: rgb(var(--muted));
}

.ark-button[background=light] {
  background: rgb(var(--light)) radial-gradient(circle, transparent 1%, rgb(var(--light)) 1%) center/15000%;
  color: white;
}

.ark-button[outline=light] {
  border: 2px solid rgb(var(--light));
}

.ark-button.ark-button[color=light] {
  color: rgb(var(--light));
}

.ark-button:active {
  background-color: silver;
  background-size: 100%;
  transition: background 0s;
}

.ark-button__button {
  position: absolute;
  all: unset;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: inherit;
  background: inherit;
  border-radius: inherit;
  -webkit-border-radius: inherit;
  -moz-border-radius: inherit;
  -ms-border-radius: inherit;
  -o-border-radius: inherit;
}

.ark-button__button[fab] {
  display: grid;
  justify-content: center;
}

.ark-button ark-icon {
  font-size: 1.2rem;
  padding: 0.3rem;
}

.ark-button:hover {
  filter: contrast(120%) brightness(80%);
}

.ark-button[fab] {
  position: relative;
  border-radius: 50%;
  width: var(--fab-size-big);
  height: var(--fab-size-big);
  padding: 0.2rem;
  margin: 0;
  min-width: var(--fab-size-big);
  min-height: var(--fab-size-big);
}

.ark-button[fab] ark-icon {
  padding: 0;
  display: grid;
}

.ark-button[fab] ark-icon i {
  vertical-align: middle;
}

.ark-button[horizontal=center] {
  left: calc(50% - (var(--fab-size-big) / 2));
}

.ark-button[horizontal=start] {
  left: calc(var(--fab-size-big) / 3);
}

.ark-button[horizontal=end] {
  right: calc(var(--fab-size-big) / 3);
}

.ark-button[vertical=center] {
  top: calc(50% - (var(--fab-size-big) / 2));
}

.ark-button[vertical=start] {
  top: calc(var(--fab-size-big) / 3);
}

.ark-button[vertical=end] {
  bottom: calc(var(--fab-size-big) / 3);
}

.ark-button[disabled] {
  cursor: default;
  pointer-events: none;
  color: gray;
  background: rgba(128, 128, 128, 0.1);
}

.ark-button[size=small] {
  width: var(--fab-size-small);
  height: var(--fab-size-small);
  min-width: var(--fab-size-small);
  min-height: var(--fab-size-small);
}

.ark-button[size=small] ark-icon {
  padding: 0;
  display: grid;
}

.ark-button[size=small] ark-icon i {
  vertical-align: middle;
  font-size: medium;
}

.ark-button[size=medium] {
  width: var(--fab-size-medium);
  height: var(--fab-size-medium);
  min-width: var(--fab-size-medium);
  min-height: var(--fab-size-medium);
}

.ark-button[size=medium] ark-icon {
  padding: 0;
  display: grid;
}

.ark-button[size=medium] ark-icon i {
  vertical-align: middle;
  font-size: large;
}

.ark-button[size=big] {
  width: var(--fab-size-big);
  height: var(--fab-size-big);
  min-width: var(--fab-size-big);
  min-height: var(--fab-size-big);
}

.ark-button[fab] {
  position: absolute;
}
`