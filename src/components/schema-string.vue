<template>
  <div>
    Format:
    <select name="format" v-model="value.format">
      <option v-for="option in formats" :value="option" :key="option">{{ option }}</option>
    </select>
    UseEnum: <input name="hasEnum" type="checkbox" @change="toggleEnum()" v-model="hasEnum"/>
    <span v-if="hasEnum">
      <label htmlFor="enum">Enum (one value per line):</label>
      <textarea-array v-model="value.enum" />
    </span>

    <input v-if="!hasEnum" placeholder="pattern" name="pattern" type="text" v-model="value.pattern"/>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'schema-string',
  props: {
    value: Object
  },
  methods: {
    toggleEnum() {
      Vue.delete(this.value, 'enum');
    }
  },
  data() {
    return {
      hasEnum: false,
      formats: ['', 'color', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'range', 'tel', 'text', 'textarea', 'time', 'url', 'week'],
    }
  },
}
</script>

<style scoped>
</style>
