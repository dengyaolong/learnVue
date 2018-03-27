class Vue {
    constructor(options) {
        this._data = options.data
        observe(this._data, options.render)
        proxy.call(this, this._data)
        let watcher = new Watcher(this, options.render)

    }
}

function observe(obj, cb) {
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, cb)
    })
}

function defineReactive(obj, key, cb) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        set: newValue => {
            dep.notify()
            return newValue
        },
        get: () => {
            if(Dep.target) {
                dep.addSubs(Dep.target)
            }
        },
    })

}

function proxy(data) {
    const that = this
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            get: key => that._data[key],
            set: newValue => that._data[key] = newValue
        })
    })
}

class Dep {
    constructor() {
        // sub is watcher
        this.subs = []
    }
    addSubs(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        if(this.subs.length) {
            const index = this.subs.indexOf(sub)
            if(index > -1) {
                this.subs.splice(index, 1)
            }
        }
    }
    notify() {
        // stabilize the subscriber list
        const subs = this.subs.slice()
        for(let i = 0, l = subs.length; i < l; ++i) {
            subs[i].update()
        }
    }
}

class Watcher {
    constructor(vm, cb) {
        console.log('sb')
        this.vm = vm
        this.cb = cb

        Dep.target = this
        this.cb.call(this.vm)
    }

    update() {
        this.cb.call(this.vm)
    }
}

let v = new Vue({data: {a: 1, b: 2}, render: () => console.log('123')})
// v.b = 3
// v.b = 2
