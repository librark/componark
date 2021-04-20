import {Component} from 'base/component';

const tag = 'demo-droparea'

export class DropareaDemo extends Component {
    init(context) {
        return super.init(context)
    }

    render() {
        this.innerHTML = /* html */ `
        <h1 class="title">
            This is a drop area
        </h1>

        <ark-droparea></ark-droparea>
        
        `

        return super.render()
    }
}

const styles = /* css */ `
    .title{
        color: var(--primary);
    }
`

Component.define(tag, DropareaDemo, styles);