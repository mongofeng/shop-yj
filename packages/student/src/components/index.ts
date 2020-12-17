import Message from '@/components/message.vue'
import { App, Plugin } from 'vue'

const components = {
  [Message.name]: Message
}

const plugins: Plugin = {
  install: (app, options) => {
    Object.keys(components).forEach(name => {
      app.component(name, components[name])
    })
  }
}

export default plugins
