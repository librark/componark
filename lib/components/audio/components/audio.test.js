import { it, mock } from 'node:test'
import assert from 'node:assert/strict'
import './audio.js'

const mockGlobal = {
  navigator: {
    mediaDevices: {
      getUserMedia: async (options) => {}
    }
  },
  MediaRecorder: function (stream) {
    this.stream = stream
    this.start = () => {}
    this.addEventListener = (type, callback) => {}
    this.stop = () => {}
    this.stream = { getTracks: () => [{ stop: () => null }] }
  },
  FileReader: function () {
    const self = this
    this.readAsDataURL = (data) => setTimeout(
      () => self.onloadend(), 1000)
    this.result = 'base64::data::result'
  },
  URL: { createObjectURL: (data) => 'mock://data/url' }
}

let container = null

const setup = () => {
  document.body.innerHTML = ''
  mock.timers.reset()
  mock.timers.enable({
    apis: ['setInterval', 'setTimeout']
  })
  container = document.createElement('div')
  document.body.appendChild(container)
}

it('can be instantiated', () => {
  setup()
  container.innerHTML = `
    <ark-audio></ark-audio>
  `
  const audio = container.querySelector('ark-audio')
  audio.init()
  assert.ok(audio)
})

it('can start recording', async () => {
  setup()
  container.innerHTML = `
    <ark-audio></ark-audio>
  `
  const audio = container.querySelector('ark-audio')
  audio.init({ global: mockGlobal })

  assert.deepStrictEqual(audio.status, 'idle')
  await audio.start(new Event('click'))
  assert.deepStrictEqual(audio.status, 'recording')
  assert.ok(audio.recorder)
})

it('can stop recording', async () => {
  setup()
  container.innerHTML = `
    <ark-audio></ark-audio>
  `
  const audio = container.querySelector('ark-audio')
  audio.init({ global: mockGlobal })

  assert.deepStrictEqual(audio.status, 'idle')
  await audio.start(new Event('click'))
  assert.deepStrictEqual(audio.status, 'recording')
  audio.stop(new Event('click'))
  assert.deepStrictEqual(audio.status, 'done')
})

it('can reset recording', async () => {
  setup()
  container.innerHTML = `
    <ark-audio></ark-audio>
  `
  const audio = container.querySelector('ark-audio')
  audio.init({ global: mockGlobal })

  assert.deepStrictEqual(audio.status, 'idle')
  await audio.start(new Event('click'))
  assert.deepStrictEqual(audio.status, 'recording')
  audio.stop(new Event('click'))
  assert.deepStrictEqual(audio.status, 'done')
  audio.reset(new Event('click'))
  assert.deepStrictEqual(audio.status, 'idle')
  assert.strictEqual(audio.recorder, null)
})

it('counts the ellapsed time of the recording', async () => {
  setup()
  container.innerHTML = `
    <ark-audio></ark-audio>
  `
  const audio = container.querySelector('ark-audio')
  audio.init({ global: mockGlobal })

  await audio.start(new Event('click'))
  mock.timers.tick(1000)

  const timer = audio.select('.ark-audio__timer')
  assert.deepStrictEqual(timer.textContent, '00:01')
  mock.timers.tick(623000)
  assert.deepStrictEqual(timer.textContent, '10:24')
})

it('sets the dataURL (base64) property when stopped', async () => {
  setup()
  container.innerHTML = `
    <ark-audio></ark-audio>
  `
  const audio = container.querySelector('ark-audio')
  audio.init({ global: mockGlobal })

  await audio.start(new Event('click'))
  audio.stop(new Event('click'))

  audio._onData({
    data: new globalThis.Blob(['Hello'], { type: 'text/plain' })
  })
  mock.timers.tick(1000)

  assert.deepStrictEqual(audio.dataURL, 'base64::data::result')
  assert.deepStrictEqual(audio.querySelector('.ark-audio__audio').src, 'mock://data/url')
})
