import { Component } from 'base/component/index.js'

const tag = 'demo-accordion'
export class AccordionDemo extends Component {
  render() {
    this.innerHTML = /* html */ `
    <h2>Normal</h2>  
    <ark-accordion>
      
        <ark-accordion-tab color="black" header="Header I" >
          <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
        <ark-accordion-tab header="Header II">
          <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
        <ark-accordion-tab header="Header III">
          <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
        <ark-accordion-tab header="Header IV" disabled>
        <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
      </ark-accordion>

      <h2>Multiple</h2>

      <ark-accordion multiple>
        <ark-accordion-tab header="Header I" >
          <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>content tab A</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="Header II">
          <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>content tab B</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="Header III">
          <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>content tab C</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="Header IV" disabled>
         <ark-icon slot='icon' name="fas fa-angle-right"></ark-icon>
          <span>content tab D</span>
        </ark-accordion-tab>
      </ark-accordion>
      
      <br>
      
      <a 
        target="_blank"
        href="https://github.com/knowark/componark/blob/master/lib/components/accordion/README.md">
      * Reference
      </a>
    `
    return super.render()
  }
}

const styles = /* css */ `
  :root{
    --primary: #ffffff;
  }
  .demo-accordion{
    margin: 0 auto;
    padding: 1rem;
    display: block;
    width: 70vw;
    box-shadow: 1px -1px 0px 1px #0000000d;
    border-radius: 6px;
    background-color:white;
  }

  .demo-accordion h2 {
      color: #001e3d;
  }
`

Component.define(tag, AccordionDemo, styles)
