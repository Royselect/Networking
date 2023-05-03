import Vue from 'nativescript-vue'

import Home from './components/Home'
import Change from './components/Change'

new Vue({
  render: (h) => h('frame', [h(Change)]),
}).$start()
