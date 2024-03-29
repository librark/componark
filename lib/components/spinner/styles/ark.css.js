const css = String.raw; export default css`
  .ark-spinner .sk-fading-circle {
    width: 40px;
    height: 40px;
    position: relative;
  }

  .ark-spinner .sk-fading-circle .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .ark-spinner .sk-fading-circle .sk-circle:before {
    content: "";
    display: block;
    margin: auto;
    width: 15%;
    height: 15%;
    border-radius: 100%;
    -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
    animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
    background: var(--spinner-color, var(--primary, #333));
  }

  .ark-spinner .sk-fading-circle .sk-circle2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .ark-spinner .sk-fading-circle .sk-circle3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .ark-spinner .sk-fading-circle .sk-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .ark-spinner .sk-fading-circle .sk-circle5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  .ark-spinner .sk-fading-circle .sk-circle6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }

  .ark-spinner .sk-fading-circle .sk-circle7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }

  .ark-spinner .sk-fading-circle .sk-circle8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .ark-spinner .sk-fading-circle .sk-circle9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .ark-spinner .sk-fading-circle .sk-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  .ark-spinner .sk-fading-circle .sk-circle11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .ark-spinner .sk-fading-circle .sk-circle12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
  }

  .ark-spinner .sk-fading-circle .sk-circle12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  @-webkit-keyframes sk-circleFadeDelay {

    0%,
    39%,
    100% {
      opacity: 0;
    }

    40% {
      opacity: 1;
    }
  }

  @keyframes sk-circleFadeDelay {

    0%,
    39%,
    100% {
      opacity: 0;
    }

    40% {
      opacity: 1;
    }
  }

  .ark-spinner .spinner {
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }

  .ark-spinner .spinner div {
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    background: var(--spinner-color, var(--primary, #333));
  }

  .ark-spinner .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .ark-spinner .spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .ark-spinner .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .ark-spinner .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {

    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }

    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {

    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }

    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }

  .ark-spinner .sk-chase {
    width: 40px;
    height: 40px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
  }

  .ark-spinner .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
  }

  .ark-spinner .sk-chase-dot:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
    background: var(--spinner-color, var(--primary, #333));
  }

  .ark-spinner .sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
  }

  .ark-spinner .sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
  }

  .ark-spinner .sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
  }

  .ark-spinner .sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
  }

  .ark-spinner .sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
  }

  .ark-spinner .sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
  }

  .ark-spinner .sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
  }

  .ark-spinner .sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
  }

  .ark-spinner .sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
  }

  .ark-spinner .sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
  }

  .ark-spinner .sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
  }

  .ark-spinner .sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
  }

  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot {

    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }

    100%,
    0% {
      transform: scale(1);
    }
  }

  .ark-spinner .lds-spinner {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .ark-spinner .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }

  .ark-spinner .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: var(--spinner-color, var(--primary, #333));
  }

  .ark-spinner .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }

  .ark-spinner .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }

  .ark-spinner .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }

  .ark-spinner .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }

  .ark-spinner .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }

  .ark-spinner .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }

  .ark-spinner .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }

  .ark-spinner .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }

  .ark-spinner .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }

  .ark-spinner .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }

  .ark-spinner .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }

  .ark-spinner .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }

  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .ark-spinner .bouncer {
    width: 70px;
    text-align: center;
  }

  .ark-spinner .bouncer div {
    width: 18px;
    height: 18px;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    background: var(--spinner-color, var(--primary, #333));
  }

  .ark-spinner .bouncer div.bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .ark-spinner .bouncer div.bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .ark-spinner .round {
    width: 40px;
    height: 40px;
    position: relative;
  }

  .ark-spinner .round .sk-child {
    position: absolute;
    left: 0;
    top: 0;
  }

  .ark-spinner .round .sk-child:before {
    content: "";
    display: block;
    width: 15%;
    height: 15%;
    border-radius: 100%;
    -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    background: var(--spinner-color, var(--primary, #333));
  }

  .ark-spinner .round2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
  }

  .ark-spinner .round2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .ark-spinner .round3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }

  .ark-spinner .round3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .ark-spinner .round4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .ark-spinner .round4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .ark-spinner .round5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }

  .ark-spinner .round5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  .ark-spinner .round6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
  }

  .ark-spinner .round6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }

  .ark-spinner .round7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .ark-spinner .round7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }

  .ark-spinner .round8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
  }

  .ark-spinner .round8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .ark-spinner .round9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
  }

  .ark-spinner .round9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .ark-spinner .round10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .ark-spinner .round10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  .ark-spinner .round11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
  }

  .ark-spinner .round11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .ark-spinner .round12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
  }

  .ark-spinner .round12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  @-webkit-keyframes sk-circleBounceDelay {

    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes sk-circleBounceDelay {

    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`
