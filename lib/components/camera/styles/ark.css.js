const css = String.raw; export default css`
.ark-camera {
  display: grid;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  user-select: none;
}

.ark-camera__canvas {
  display: none;
}

.ark-camera__video {
  transform: rotateY(180deg);
}
`
