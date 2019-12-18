import { Component } from "../component"

export class Accordion extends Component {}

export class AccordionTab extends Component {
  open(): void
  close(): void
  toggle(event): void
}
