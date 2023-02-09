import { Plugin } from 'vue'

/*
Detect if the browser has a hidden scrollbar like macOS or iOS and add a class
to the document if it does. This is used to conditionally style the scrollbar
in assets/index.css
*/

export default {
  install(_, { detectedClass = 'feat-hidden-scrollbar' } = {}) {
    // create an offscreen element with a scrollbar
    const el = document.createElement('div')
    el.setAttribute(
      'style',
      'position: fixed; top: -100; left: 100; z-index: -1; width: 100px; height: 100px; overflow: scroll;'
    )

    document.body.appendChild(el)

    // if the scrollbar does not take up space, it's hidden
    if (el.offsetWidth === el.clientWidth) {
      document.documentElement.classList.add(detectedClass)
    }

    // cleanup
    el.remove()
  },
} as Plugin
