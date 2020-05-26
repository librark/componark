import { Component } from '../../component'

export class Location extends Component {
	init () {
		return super.init()
	}

	start () {
		const target = {
			latitude: 0,
			longitude: 0
		}

		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.position = position
				const coords = position.coords

				if (
					target.latitude === coords.latitude &&
          target.longitude === coords.longitude
				) {
					this.stop()
					return
				}

				this.onCurrentPosition()
			},
			(err) => {
				console.warn('ERROR(' + err.code + '): ' + err.message)
			},
			{
				enableHighAccuracy: false,
				timeout: 5000,
				maximumAge: 0
			}
		)
	}

	stop () {
		if (!this.watchId) return
		navigator.geolocation.clearWatch(this.watchId)
	}

	getCurrentPosition () {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			})
		})
	}

	onCurrentPosition () {
		this.dispatchEvent(new CustomEvent('onCurrentPosition', {
			bubbles: true,
			detail: {
				currentPosition: this.position
			}
		}))
	}
}
customElements.define('ark-location', Location)
