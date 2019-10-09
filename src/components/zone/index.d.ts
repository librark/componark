import { Component } from "../component";
import { DragZone } from "./components/drag";


export class Zone extends Component {
  setSelectedDrags(query: string, selected: boolean): void
  getSelectedDrags(): DragZone[]
}
