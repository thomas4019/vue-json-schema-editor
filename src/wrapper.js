// Import vue component
import component from './components/json-schema-editor.vue';
import './json-editor-plugin.js';
import { arrayifySchema, objectifySchema } from './util'

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('json-schema-editor', component);

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
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

window.arrayifyJSONSchema = arrayifySchema;
window.objectifyJSONSchema = objectifySchema;

// To allow use as module (npm/webpack/etc.) export component
export default component;