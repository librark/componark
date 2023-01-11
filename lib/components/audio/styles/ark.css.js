const css = String.raw; export default css`
.ark-audio {
  display: grid;
  align-items: center;
  width: fit-content;
  height: auto;
  overflow: hidden;
  padding: 0 0.5rem;
  user-select: none;
  background: white;
  border: 2px solid rgba(190, 189, 189, 0.856);
  min-width: 150px;
}

.ark-audio ark-button {
  border: 0;
  outline: 0;
  background: transparent;
  text-align: center;
  margin: 0;
  padding: 0;
}

.ark-audio__recording {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 15rem;
}

.ark-audio__recording label {
  font-weight: 700;
}

.ark-audio__timer {
  display: grid;
  justify-items: center;
  background: var(--light);
  color: var(--dark);
  align-items: center;
  padding: 0.8rem 0.5rem;
}

.ark-audio__idle {
  display: grid;
}

.ark-audio__idle::before {
  content: "Grabar";
  padding-right: 0.25em;
}

.ark-audio__done {
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  border-radius: 2rem;
}

.ark-audio__done audio {
  width: 220px;
  height: 54px;
  outline: none;
}

.ark-audio:hover {
  border: 2px solid var(--primary);
}

.ark-audio ark-button {
  text-align: center;
  margin: 0;
  padding: 0;
}

.ark-audio__idle {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  text-align: center;
  align-items: center;
}
`