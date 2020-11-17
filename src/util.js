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

export function objectifySchema(obj2) {
    const obj = JSON.parse(JSON.stringify(obj2))
    if (obj.type === 'object' && obj.properties) {
        obj.properties = Object.fromEntries(obj.properties.map((value) => [value.name, value]))
    }
    if (obj.type === 'number') {
        if (obj.minimum === "")
            delete obj.minimum
        if (obj.maximum === "")
            delete obj.maximum
    }
    if (obj.type === 'array') {
        if (obj.minItems === "")
            delete obj.minItems
        if (obj.maxItems === "")
            delete obj.maxItems
    }
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        Object.keys(obj).forEach((key) => {
            obj[key] = objectifySchema(obj[key]);
        });
    }
    return obj;
}