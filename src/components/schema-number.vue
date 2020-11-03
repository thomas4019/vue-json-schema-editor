<template>
  <div>
    Min: <input class="short-num" name="minimum" type="number" v-model.number="value.minimum" />
    Max: <input class="short-num" name="maximum" type="number" v-model.number="value.maximum" />
  </div>
</template>

<script>
export default {
  name: 'schema-number',
  props: {
    value: Object
  },
}
</script>

<style scoped>
input.short-num {
  width: 50px;
}
</style>
