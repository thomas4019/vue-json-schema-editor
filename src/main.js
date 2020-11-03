import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import SchemaArray from './components/schema-array'
Vue.component('schema-array', SchemaArray)
import SchemaObject from './components/schema-object'
Vue.component('schema-object', SchemaObject)
import JSONSchemaEditor from './components/json-schema-editor'
Vue.component('json-schema-editor', JSONSchemaEditor)

Vue.component('textarea-array', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
          // We add all the listeners from the parent
          this.$listeners,
          // Then we can add custom listeners or override the
          // behavior of some listeners.
          {
            // This ensures that the component works with v-model
            input: function (event) {
              vm.$emit('input', event.target.value.split('\n'))
            }
          }
      )
    }
  },
  methods:{
    joined(arr) {
      if (arr && Array.isArray(arr))
        return arr.join('\n')
      else
        return arr
    }
  },
  template: `
    <label>
      {{ label }}
       <textarea
        v-bind="$attrs"
        v-bind:value="joined(value)"
        v-on="inputListeners"
      />
    </label>
  `
})


new Vue({
  render: h => h(App),
}).$mount('#app')
