const css = String.raw; export default css`
  .ark-gallery {
    user-select: none;
    background: transparent;
    display: grid;
    justify-items: center;
    width: 100%;
  }

  .ark-gallery__thumbnails {
    display: grid;
    align-self: start;
    justify-items: center;
    grid-auto-flow: column;
    width: 90%;
    height: 75px;
    grid-row: 2;
    padding: 0;
    overflow: auto hidden;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
  }

  .ark-gallery__thumbnails::-webkit-scrollbar {
    height: 10px;
    width: 0.2rem;
    border-radius: 15px;
    background-color: rgba(89, 34, 114, 0.137);
  }

  .ark-gallery__thumbnails::-webkit-scrollbar-thumb {
    height: 10px;
    background-color: white;
    border: 1px solid #aaaaaa;
    border-radius: 15px;
  }

  .ark-gallery__thumbnail div {
    user-select: none;
    width: 3rem;
    height: 3rem;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    transition: all 0.15s ease-in-out;
  }

  .ark-gallery__thumbnail div:hover {
    transform: scale(1.05);
    cursor: pointer;
    box-shadow: -3px 4px 15px -4px rgba(120, 10, 255, 0.71);
  }

  .ark-gallery__thumbnail div::after {
    content: "";
    position: relative;
    display: block;
    width: 4rem;
    height: 1rem;
  }

  .ark-gallery__images {
    align-self: center;
    width: 100%;
  }

  .ark-gallery__images [data-image] {
    max-width: 100%;
    height: 400px;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .ark-gallery__images [data-image][cover] {
    background-size: cover;
  }

  .ark-gallery__images [data-image][contain] {
    background-size: contain;
  }

  .ark-gallery__images {
    display: grid;
    user-select: none;
    background: transparent;
  }

  .ark-gallery__images[single] {
    grid-row: span 2;
  }

  .ark-gallery__images[single][cover] {
    background-size: cover;
  }

  .ark-gallery__images[single][contain] {
    background-size: contain;
  }
`