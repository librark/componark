import { main } from './screens/main'

window.onload = () => {
  setInterval(_ => {
    document.body.style.display = 'block'
  }, 1500)
}

// @ts-ignore
// eslint-disable-next-line no-undef
const target = TARGET
main(target)
