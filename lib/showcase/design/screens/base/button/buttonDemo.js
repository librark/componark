import 'components/tooltip/index.js'
import { Component } from 'base/component/index.js'

const tag = 'demo-button'
export class ButtonDemo extends Component {
  init(context) {
    return super.init(context)
  }
  render() {
    this.content = /* html */ `
      <div class="demo-button">
        <p>This is a button</p>

        <ark-button background="disabled" disabled>DISABLED</ark-button>

        <ark-button class="roundness-giant" no-radius icon-position="right" background="primary">
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
            Primary
        </ark-button>
      
        <ark-button class="roundness-large" background="secondary" color="dark">
        secondary
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>

        <ark-button class="roundness-giant" background="success">success</ark-button>
        <ark-button class="roundness-huge" background="danger">danger</ark-button>
        <ark-button class="roundness-large" background="warning" color="dark">warning</ark-button>
        <ark-button class="roundness-normal" background="info" color="dark">info</ark-button>
        <ark-button class="roundness-small" background="dark">dark</ark-button>
        <ark-button class="roundness-tiny" background="muted">muted</ark-button>
        <ark-button background="light" color="dark">light</ark-button>
        <ark-button background="white">white</ark-button>

        <ark-button background="dark" color="danger">dark, danger</ark-button>
        <ark-button background="light" color="primary">
          lite, primary
        </ark-button>
      </div>

      <div class="demo-button">
        <p>This is a outline button</p>

        <ark-button outline="disabled" disabled>Disabled</ark-button>
        <ark-button outline="primary">primary</ark-button>
        <ark-button outline="secondary">secondary</ark-button>
        <ark-button outline="success">success</ark-button>
        <ark-button outline="danger">danger</ark-button>
        <ark-button outline="warning">warning</ark-button>
        <ark-button outline="info">info</ark-button>
        <ark-button outline="dark">dark</ark-button>
        <ark-button outline="muted">muted</ark-button>
        <ark-button outline="light">light</ark-button>
        <ark-button outline="white">white</ark-button>
      </div>

      <div class="demo-button">
        <p>This is a link</p>
        <ark-button href="a" background="disabled" disabled>
          disabled
        </ark-button>
        <ark-button href="a" background="primary">primary</ark-button>
        <ark-button href="a" background="secondary" color="dark">secondary</ark-button>
        <ark-button href="a" background="success">success</ark-button>
        <ark-button href="a" background="danger">danger</ark-button>
        <ark-button href="a" background="warning" color="dark">warning</ark-button>
        <ark-button href="a" background="info" color="dark">info</ark-button>
        <ark-button href="a" background="dark">dark</ark-button>
        <ark-button href="a" background="muted">muted</ark-button>
        <ark-button href="a" background="light" color="dark">light</ark-button>
        <ark-button href="a" background="white">white</ark-button>
      </div>

      <div class="demo-button">
        <p>This is a outline link</p>
        <ark-button href="a" outline="disabled" disabled>
          disabled
        </ark-button>
        <ark-button href="a" outline="primary">
          primary
        </ark-button>
        <ark-button href="a" outline="secondary">secondary</ark-button>
        <ark-button href="a" outline="success">success</ark-button>
        <ark-button href="a" outline="danger">danger</ark-button>
        <ark-button href="a" outline="warning">warning</ark-button>
        <ark-button href="a" outline="info">info</ark-button>
        <ark-button href="a" outline="dark">dark</ark-button>
        <ark-button href="a" outline="muted">muted</ark-button>
        <ark-button href="a" outline="light">light</ark-button>
        <ark-button href="a" outline="white">white</ark-button>
      </div>


      <p>This is a Fab Button</p>
      <div class="fab-box">
        <ark-button size="small" fab background="primary">
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>

        <ark-button size="medium" horizontal="start" vertical="start" fab background="primary">
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>
        
        <ark-button horitzontal="end" vertical="start" fab background="primary">
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>

         <ark-button horizontal="start" vertical="end" fab background="primary">
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>

        <ark-button horizontal="center" vertical="center" fab background="primary">
          <ark-icon slot='icon' name="fas fa-address-book"></ark-icon>
        </ark-button>
      </div>

      <p>A photo with close button</p>

      <div class="fab-box photo">
        <ark-button class="close-photo" horizontal="end" vertical="start" fab background="primary">
          <ark-tooltip position="bottom" text="remove">
            <ark-icon slot='icon' type="mat" name="close"></ark-icon>
          </ark-tooltip>
        </ark-button>
      </div>

      <div class="demo-button">
        <p>Roundness examples</p>
        <ark-button background="primary" roundness="4px">roundness 4px</ark-button>
        <ark-button background="primary" roundness="6px">roundness 6px</ark-button>
        <ark-button background="primary" roundness="10px">roundness 10px</ark-button>
        <ark-button background="primary" roundness="15px">roundness 15px</ark-button>
      </div>
      
      <a
        target="_blank" 
        href="https://github.com/knowark/componark/blob/master/lib/components/button/README.md">
      * Reference
      </a>
    `

    this.renderPhoto()

    return super.render()
  }

  renderPhoto() {
    this.querySelector('.photo').style.backgroundImage =
      'url("https://picsum.photos/id/237/200/300")'
  }
}
const styles = /* css */ `
.demo-button > .fab-box{
    box-sizing: border-box;
    border: 1px solid var(--primary);
    padding:1rem;
    width:100%;
    height:300px;
}

.photo{
  background-repeat: no-repeat;
  background-size: cover;
  background-position:center;
  min-width: 200px;
  max-width: 400px;
}

.photo > ark-button{
  visibility: hidden;
  transform: scale(0.8);
  opacity: 0.5;
  transition: all 0.2s ease-in-out;
}

.photo:hover > ark-button{
  visibility: visible;
  opacity: 1;
}

.ark-button{
    margin:10px;
  }
`

Component.define(tag, ButtonDemo, styles)
