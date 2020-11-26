<template>
  <div>
    Items Type:
    <select name="itemtype" v-model="value.items.type" @input="selectType($event.target.value)">
      <option v-for="type in types" :value="type" :key="type">{{type}}</option>
    </select>
    minItems: <input class="short-num" name="minItems" type="number" v-model.number="value.minItems" />
    maxItems: <input class="short-num" name="maxItems" type="number" v-model.number="value.maxItems" />
    uniqueItems: <input name="uniqueItems" type="checkbox" v-model="value.uniqueItems" />
    Format:
    <select name="format" v-model="value.format">
      <option v-for="f in formats" :value="f" :key="f">{{f}}</option>
    </select>
    <div class="option-form">
      <json-schema-editor :value="value.items" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { setupType } from '../util'

export default {
  name: 'schema-array',
  props: {
    value: Object
  },
  mounted() {
    this.value.items = this.value.items || {};
  },
  methods: {
    selectType(type) {
      setupType(Vue, this.value.items, type)
    }
  },
  data() {
    return {
      types: util.getTypes(),
      formats: ['', 'table', 'checkbox', 'select', 'tabs'],
    }
  },
}
</script>

<style scoped>
.option-form {
  padding-left: 25px;
  padding-top: 4px;
}

input.short-num {
  width: 50px;
}
</style>
