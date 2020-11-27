/* global JSONEditor, arrayifyJSONSchema, objectifyJSONSchema */
import Vue from 'vue'

if (typeof JSONEditor !== 'undefined' && JSONEditor) {
  JSONEditor.defaults.resolvers.unshift(function(schema) {
    if (schema.type === "object" && schema.format === "schema") {
      return "schema";
    }

    // If no valid editor is returned, the next resolver function will be used
  });

  JSONEditor.defaults.editors.schema = JSONEditor.AbstractEditor.extend({
    setValue: function(value) {
      this.value = value;
      if (value && Object.keys(value).length > 0) {
        return this.schemaeditor.$data.value = arrayifyJSONSchema(value);
      }
      this.onChange();
    },
    getValue: function() {
        if (typeof this.schemaeditor != 'undefined')
            return objectifyJSONSchema(this.schemaeditor.$data.value);
        else
            return {}
    },
    register: function() {
      this._super();
      if(!this.input) return;
      this.input.setAttribute('name', this.formname);
    },
    unregister: function() {
      this._super();
      if(!this.input) return;
      this.input.removeAttribute('name');
    },
    getNumColumns: function() {
      return 12;
    },
    build: function() {
      var self = this;
      if(!this.options.compact) {
        this.label = this.header = this.theme.getFormInputLabel(this.getTitle());
      }
      if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
      if(this.options.compact) this.container.className += ' compact';

      this.input = document.createElement('div')
      this.input.id = 'json-schema-editor';
      this.input.innerHTML = '<json-schema-editor v-on:change="changed()" :value="value"/>';
      this.control = this.theme.getFormControl(this.label, this.input, this.description);

      if(this.schema.readOnly || this.schema.readonly) {
        this.always_disabled = true;
        this.input.disabled = true;
      }

      this.container.appendChild(this.control);

      this.schemaeditor = new Vue({
        el: '#json-schema-editor',
        data: {
          value: {
            type: 'object'
          }
        },
        methods: {
          changed() {
            self.onChange(true);
          }
        }
      })
    },
    enable: function() {
      if(!this.always_disabled) {
        this.input.disabled = false;
      }
      this._super();
    },
    disable: function() {
      this.input.disabled = true;
      this._super();
    },
    destroy: function() {
      if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
      if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
      if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
      this._super();
    }
  });
}