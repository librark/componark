import { it } from 'node:test'
import assert from 'node:assert/strict'
import './camera.js'

const mockGlobal = () => ({
  navigator: {
    mediaDevices: {
      __stops: 0,
      async getUserMedia (_options) {
        const stream = {}
        stream.getTracks = () => [{ stop: () => { this.__stops += 1 } }]
        return stream
      }
    }
  }
})

let container = null

const setup = () => {
  document.body.innerHTML = ''
  container = document.createElement('div')
  document.body.appendChild(container)
}

it('can be instantiated', () => {
  setup()
  container.innerHTML = `
    <ark-camera></ark-camera>
  `
  const camera = container.querySelector('ark-camera')
  assert.ok(camera)

  assert.strictEqual(camera, camera.init())
})

it('sets its dimensions on canplay event', async () => {
  setup()
  container.innerHTML = `
    <ark-camera width="50" height="80"></ark-camera>
  `
  const camera = container.querySelector('ark-camera')
  const video = camera.select('video')
  const canvas = camera.select('canvas')

  video.dispatchEvent(new Event('canplay'))

  assert.deepStrictEqual(video.getAttribute('width'), '50px')
  assert.deepStrictEqual(video.getAttribute('height'), '80px')

  assert.deepStrictEqual(canvas.getAttribute('width'), '50px')
  assert.deepStrictEqual(canvas.getAttribute('height'), '80px')
})

it('can start video recording', async () => {
  setup()
  container.innerHTML = `
    <ark-camera></ark-camera>
  `
  const camera = container.querySelector('ark-camera')
  camera.init({ global: mockGlobal() })

  await camera.start()

  assert.ok(camera.video.srcObject.getTracks())
})

it('can stop video recording', async () => {
  setup()
  container.innerHTML = `
    <ark-camera></ark-camera>
  `
  const camera = container.querySelector('ark-camera')
  const global = mockGlobal()
  camera.init({ global })

  await camera.start()

  camera.stop()

  assert.deepStrictEqual(global.navigator.mediaDevices.__stops, 1)
})

it('can set the camera orientation', async () => {
  setup()
  container.innerHTML = `
    <ark-camera></ark-camera>
  `
  const camera = container.querySelector('ark-camera')
  const global = mockGlobal()
  camera.init({ global })

  await camera.setCameraOrientation('environment')

  assert.deepStrictEqual(camera.facingMode, 'environment')
})

it('gets the dataURL (base64) of its containing canvas', async () => {
  setup()
  container.innerHTML = `
    <ark-camera></ark-camera>
  `
  const camera = container.querySelector('ark-camera')
  camera.init({ global: mockGlobal() })

  const data = camera.dataURL()

  assert.ok(data)
})
