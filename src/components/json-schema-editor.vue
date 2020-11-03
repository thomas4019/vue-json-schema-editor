<template>
  <div class="option-form">
    <SchemaObject v-if="value.type == 'object'" :value="value"/>
    <SchemaString v-if="value.type == 'string'" :value="value"/>
    <SchemaNumber v-if="value.type == 'number'" :value="value"/>
    <SchemaArray v-if="value.type == 'array'" :value="value"/>
  </div>
</template>

<script>
import SchemaString from './schema-string.vue'
import SchemaNumber from './schema-number.vue'
import SchemaArray from './schema-array.vue'
import SchemaObject from './schema-object.vue'

export default {
  name: 'json-schema-editor',
  props: {
    value: Object
  },
  components: {
    SchemaString,
    SchemaNumber,
    SchemaArray,
    SchemaObject,
  },
}
</script>

<style scoped>
/*.option-form {
  padding-left: 25px;
  padding-top: 4px;
}*/
</style>
