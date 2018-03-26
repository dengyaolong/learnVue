class Vue {
    constructor(options) {
        this._data = options.data
        observe(this._data, options.render)
        proxy.call(this, options.data)
    }
}

function observe(obj, cb) {
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key], cb)
    })
}

function defineReactive(obj, key, value, cb) {
    Object.defineProperty(obj, key, {
        set: newValue => {
            cb()
            return newValue
        },
    })
}

function proxy(data) {
    const that = this
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            set: newVal => {
                that._data[key] = newVal
            },
            get: () => that._data[key]
        })
    })
}

let v = new Vue({data: {a: 1, b: 2}, render: () => console.log('123')})
v.b = 3
v.b = 2
v._data.b = 2
