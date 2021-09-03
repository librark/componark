import { Component } from 'base/component'

const tag = 'demo-accordion'
export class AccordionDemo extends Component {
  render() {
    this.innerHTML = /* html */ `
    <h1>Normal</h1>  
    <ark-accordion>
        <ark-accordion-tab background="dark" color="danger" header="tab 1" >
          <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 2">
          <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 3">
          <span>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab 4" disabled>
          <span>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, 
          sunt iusto inventore earum molestiae corrupti provident obcaecati vitae 
          tempore quae tenetur incidunt vel unde corporis debitis maiores facilis assumenda et culpa placeat. 
          Perspiciatis dolore iste pariatur error cumque fugiat. Nesciunt libero 
          vero expedita, ipsum repellat quisquam nostrum voluptate tempora dolore!
          </span>
        </ark-accordion-tab>
      </ark-accordion>

      <h1>multiple</h1>

      <ark-accordion multiple>
        <ark-accordion-tab header="tab A" >
          <span>content tab A</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab B">
          <span>content tab B</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab C">
          <span>content tab C</span>
        </ark-accordion-tab>
        <ark-accordion-tab header="tab D" disabled>
          <span>content tab D</span>
        </ark-accordion-tab>
      </ark-accordion>
      
      <br>
      
      <a href="https://github.com/knowark/componark/blob/master/src/components/accordion/README.rst">
      * Reference
      </a>
    `
    return super.render()
  }
}

const styles = /* css */ `

        :root{
          --primary: rgb(41, 31, 177);
        }
        .demo-accordion{
          margin: 0 auto;
          padding: 1rem;
          display: block;
          width: 70vw;
        }
`

Component.define(tag, AccordionDemo, styles)
