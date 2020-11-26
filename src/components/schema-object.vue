<template>
  <div class="schema-object">
    <div class="field" v-for="(svalue, index) in value.properties" :key="index">
      <span class="more-options-btn"></span>
      <input name="field" type="string" :value="svalue.name" @input="updateKey(svalue, $event.target.value)"/>
      <select class="type-select" name="type" v-model="svalue.type" @input="selectType(svalue, $event.target.value)">
        <option v-for="type in types" :value="type" :key="type">{{type}}</option>
      </select>
      <input class="description" placeholder="description" name="description" type="text" v-model="svalue.description"/>
      <span class="required-icon">*</span>
      <input name="name" v-bind:checked="(value.required || []).includes(svalue.name)" @input="toggleRequired(svalue.name, $event.target.checked)" type="checkbox"/>
      <span @click="deleteItem(index)" class="delete-prop">x</span>
      <div class="option-form">
        <json-schema-editor :value="svalue" />
      </div>
    </div>
    <div>
      Allow additional properties: <input name="additionalProperties" type="checkbox" v-model="value.additionalProperties"/>
      Format:
      <select name="format" v-model="value.format">
        <option v-for="f in formats" :value="f" :key="f">{{f}}</option>
      </select>
    </div>

    <button @click="add()">Add another field</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { setupType, getTypes } from '../util'

export default {
  name: 'schema-object',
  props: {
    value: Object
  },
  data() {
    return {
      //properties: Object.entries(this.value.properties).map(([key, value]) => ({ ...value, name: key }))
      types: getTypes(),
      formats: ['', 'grid', 'schema'],
    }
  },
  methods: {
    selectType(svalue, type) {
      setupType(Vue, svalue, type)
    },
    updateKey(svalue, newKey) {
      const oldKey = svalue.name
      this.toggleRequired(oldKey, false);
      this.toggleRequired(newKey, true);
      svalue.name = newKey
    },
    toggleRequired(name, checked) {
      if (!this.value.required) {
        Vue.set(this.value, 'required', []);
      }
      if (checked) {
        if (name)
          this.value.required.push(name);
      } else {
        var index = this.value.required.indexOf(name);
        if (index !== -1)
          this.value.required.splice(index, 1)
      }
    },
    add() {
      // Vue.set(this.properties, '', {})
      this.value.properties.push({});
    },
    deleteItem(index) {
      this.toggleRequired(this.value.required[index]);
      this.value.properties.splice(index, 1);
      // Vue.delete(this.properties, index)
    }
  }
}
</script>

<style scoped>
.option-form {
  padding-left: 25px;
  padding-top: 4px;
}

.schema-object {
  border-left: 2px dotted gray;
  padding-left: 8px;
  padding-top: 10px;
  text-align: left;
}

.type-select {
  margin-left: 5px;
}

.required-icon {
  font-size: 1em;
  color: red;
  font-weight: bold;
  padding-left: 5px;
}

.field {
  padding-bottom: 5px;
}

.description {
  margin-left: 6px;
  width: 350px;
}

.delete-prop {
  border: 1px solid black;
  padding: 0px 4px 0px 4px;
  pointer: cursor;
}

.more-options-btn {
  font-size: 20px;
  padding-right: 6px;
}
</style>
