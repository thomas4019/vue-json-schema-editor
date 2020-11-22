export function arrayifySchema(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        Object.keys(obj).forEach((key) => {
            arrayifySchema(obj[key]);
        });
    }
    if (obj.type && obj.type === 'object' && obj.properties) {
        obj.properties = Object.entries(obj.properties).map(([key, value]) => (Object.assign({}, value, { name: key })))
        if (typeof obj.additionalProperties === 'undefined') {
            obj.additionalProperties = false
        }
    }
    return obj;
}

function cleanKeys(obj, keys) {
    keys.forEach((key) => {
       if (obj[key] === "") {
           delete obj[key]
       }
   })
}

export function setupType(Vue, svalue, type) {
    if (type === 'array') {
        Vue.set(svalue, 'items', svalue.items || {})
    } else {
        Vue.delete(svalue, 'items')
    }

    if (type === 'object') {
        Vue.set(svalue, 'properties', svalue.properties || [])
        Vue.set(svalue, 'required', svalue.required || [])
    } else {
        Vue.delete(svalue, 'properties')
        Vue.delete(svalue, 'required')
    }

    Vue.set(svalue, 'type', type)
}

export function objectifySchema(obj2) {
    const obj = JSON.parse(JSON.stringify(obj2))
    if (obj.type === 'object' && obj.properties) {
        obj.properties = Object.fromEntries(obj.properties
                                                .filter(value => value.name)
                                                .map((value) => {
                                                    const { name, ...withoutName } = value
                                                    return [value.name, withoutName]
                                                }))
    }
    if (obj.type === 'string') {
        cleanKeys(obj, ['format'])
    }
    if (obj.type === 'number') {
        cleanKeys(obj, ['minimum', 'maximum'])
    }
    if (obj.type === 'array') {
        cleanKeys(obj, ['minItems', 'maxItems'])
    }
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        Object.keys(obj).forEach((key) => {
            obj[key] = objectifySchema(obj[key]);
        });
    }
    return obj;
}