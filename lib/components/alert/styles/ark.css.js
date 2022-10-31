const css = String.raw; export default css`
:root {
  --margin: var(--margin, 15px);
  --background: var(--background, blue);
}

.ark-alert {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4096;
  display: grid;
}

.ark-alert[hidden] {
  display: none;
}

.ark-alert[horizontal~=center] {
  justify-content: center;
}

.ark-alert[horizontal~=start] {
  justify-content: start;
}

.ark-alert[horizontal~=end] {
  justify-content: end;
}

.ark-alert[vertical~=center] {
  align-items: center;
}

.ark-alert[vertical~=start] {
  align-items: start;
}

.ark-alert[vertical~=end] {
  align-items: end;
}

.ark-alert__content {
  background: var(--canvas, white);
  color: var(--ink, black);
  z-index: inherit;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  margin: 0.5rem;
  max-width: calc(100vw - 3rem);
  max-height: calc(100vh - 3rem);
  overflow: hidden;
}

.ark-alert__content .ark-button {
  transform: scale(0.9);
  margin: 0.1rem 0.6rem;
}

.ark-alert__header {
  display: grid;
  justify-items: center;
  overflow: hidden;
  user-select: none;
}

.ark-alert__header span {
  font-size: 0.9rem;
}

.ark-alert__actions {
  display: grid;
  grid-auto-flow: column;
  user-select: none;
}

.ark-alert__scrim {
  background: rgba(0, 0, 0, 0.5);
  width: inherit;
  height: inherit;
  position: inherit;
  top: inherit;
  left: inherit;
}
`