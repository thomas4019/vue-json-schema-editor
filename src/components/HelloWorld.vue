<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Schema :value="schema" />

    {{ schema }}
  </div>
</template>

<script>
var productSchema = {
  "title": "Product",
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

function processSchema(obj) {
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    for (const key of Object.keys(obj)) {
      processSchema(obj[key]);
    }
  }
  if (obj.type && obj.type === 'object' && obj.properties) {
    obj.properties = Object.entries(obj.properties).map(([key, value]) => ({...value, name: key}))
    if (typeof obj.additionalProperties === 'undefined') {
      obj.additionalProperties = false
    }
  }
  return obj;
}


// import SchemaObject from './SchemaObject'
import Schema from './json-schema-editor'
export default {
  name: 'HelloWorld',
  components: {
//    SchemaObject,
    Schema,
  },
  props: {
    msg: String
  },
  data() {
    return {
      rows: ["a", "b", "c"],
      schema: processSchema(productSchema)
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
