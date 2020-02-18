import { Component } from "../component"

export class Location extends Component {
  start ()
  stop ()
  getCurrentPosition (): Promise<{
    coords: {
      latitude,
      longitude,
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      speed
    },
    timestamp
  }>
}

