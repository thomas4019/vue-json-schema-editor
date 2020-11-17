<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Schema :value="schema" />

    {{ objectifySchema(schema) }}
  </div>
</template>

<script>
var productSchema = {
  "type": "object",
  "properties": {
    "id": {
      "description": "The unique identifier for a product",
      "type": "number",
      "links": [
        {
          "rel": "Download",
          "href": "/images/{{self}}"
        }
      ]
    },
    "name": {
      "type": "string",
      "default": "thomas",
      "description": "test description",
    },
    "price": {
      "type": "number",
      "minimum": 0,
      "default": 5,
      "exclusiveMinimum": true
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "dimensions": {
      "type": "object",
      "properties": {
        "length": {"type": "number"},
        "width": {"type": "number"},
        "height": {"type": "number"}
      },
      "required": ["length", "width", "height"]
    },
    "warehouseLocation": {
      "description": "Coordinates of the warehouse with the product",
      "$ref": "http://json-schema.org/geo"
    }
  },
  "required": ["id", "name", "price"]
}

import Schema from './json-schema-editor'
import { arrayifySchema, objectifySchema } from '../util'
export default {
  name: 'HelloWorld',
  components: {
    Schema,
  },
  props: {
    msg: String
  },
  methods: {
    objectifySchema(obj) {
      return objectifySchema(obj)
    }
  },
  data() {
    return {
      rows: ["a", "b", "c"],
      schema: arrayifySchema(productSchema)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
