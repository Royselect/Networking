import Vue from 'nativescript-vue'

import Home from './components/Home'
import Change from './components/Change'
import Test from './components/Test'

new Vue({
  render: (h) => h('frame', [h(Change)]),
}).$start()
