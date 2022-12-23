const css = String.raw; export default css` 
  .ark-droparea__form {
    background: var(--canvas, white);
    color: var(--ink, black);
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    border: 2px dashed black;
    transition: all 0.1s ease-in-out;
  }

  /* THEME */
  .ark-droparea__form[background=primary] {
    background: rgb(var(--primary));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=primary] {
    color: rgb(var(--primary));
  }

  .ark-droparea__form[background=secondary] {
    background: rgb(var(--secondary));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=secondary] {
    color: rgb(var(--secondary));
  }

  .ark-droparea__form[background=success] {
    background: rgb(var(--success));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=success] {
    color: rgb(var(--success));
  }

  .ark-droparea__form[background=danger] {
    background: rgb(var(--danger));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=danger] {
    color: rgb(var(--danger));
  }

  .ark-droparea__form[background=warning] {
    background: rgb(var(--warning));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=warning] {
    color: rgb(var(--warning));
  }

  .ark-droparea__form[background=info] {
    background: rgb(var(--info));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=info] {
    color: rgb(var(--info));
  }

  .ark-droparea__form[background=dark] {
    background: rgb(var(--dark));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=dark] {
    color: rgb(var(--dark));
  }

  .ark-droparea__form[background=muted] {
    background: rgb(var(--muted));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=muted] {
    color: rgb(var(--muted));
  }

  .ark-droparea__form[background=light] {
    background: rgb(var(--light));
    color: white;
  }

  .ark-droparea__form.ark-droparea__form[color=light] {
    color: rgb(var(--light));
  }

  .ark-droparea__form [data-message] {
    color: red;
    font-size: 1rem;
  }

  .ark-droparea__form>* {
    margin: 0;
  }

  .ark-droparea__form input {
    position: absolute;
    visibility: hidden;
  }

  .ark-droparea__form.highlight {
    border: 2px solid black;
    opacity: 0.5;
  }

  .ark-droparea__header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }

  .ark-droparea__message {
    font-size: 1.5rem;
    user-select: none;
  }

  .ark-droparea-preview__list {
    display: none;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
    user-select: none;
    padding: 1.2rem;
    gap: 0.8rem;
  }

  .ark-droparea-preview__list::-webkit-scrollbar {
    height: 10px;
    width: 0.2rem;
    border-radius: 15px;
    background-color: rgba(89, 34, 114, 0.137);
  }

  .ark-droparea-preview__list::-webkit-scrollbar-thumb {
    height: 10px;
    background-color: white;
    border: 1px solid #aaaaaa;
    border-radius: 15px;
  }

  .ark-droparea-preview__frame {
    box-sizing: border-box;
    display: grid;
    width: 110px;
    height: 110px;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgb(var(--primary));
    border-radius: 4px;
    box-shadow: -3px 4px 6px -4px rgba(1, 31, 255, 0.71);
    transition: all 0.1s ease-in-out;
  }

  .ark-droparea-preview__frame:hover,
  .ark-droparea-preview__frame:active {
    cursor: pointer;
    box-shadow: -3px 4px 15px -4px rgba(120, 10, 255, 0.71);
    transform: scale(1.05);
  }

  .ark-droparea-preview__frame:hover .ark-droparea__remove,
  .ark-droparea-preview__frame:active .ark-droparea__remove {
    visibility: visible;
  }

  .ark-droparea-preview__frame:after {
    content: "";
    background-color: transparent;
    display: block;
    position: relative;
    right: -3rem;
    width: 5rem;
    height: 1px;
  }

  .ark-droparea-preview__frame p {
    box-sizing: border-box;
    overflow: hidden;
    white-space: pre-wrap;
    width: inherit;
    font-size: 0.6rem;
    padding: 0.2rem;
    line-height: 1.2;
    text-align: center;
    color: white;
  }

  .ark-droparea__remove {
    visibility: hidden;
    position: absolute;
    top: 6px;
    right: 6px;
    width: 30px;
    height: 30px;
    border: 1px solid white;
    border-radius: 50%;
    color: black;
    outline: none;
    font-size: 1rem;
    opacity: 0.8;
    transition: all 0.1s ease-in-out;
  }

  .ark-droparea__remove:hover {
    background: black;
    color: #ff7676;
    transform: scale(1);
    cursor: pointer;
    opacity: 1;
  }

  .ark-droparea__open {
    user-select: none;
    border: 2px solid black;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .ark-droparea__open:hover {
    box-shadow: 2px 4px 13px -3px rgba(0, 0, 0, 0.56);
    background-color: white;
  }

  .ark-droparea__open:active {
    transform: scale(0.95);
  }
` 