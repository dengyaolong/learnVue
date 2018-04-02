Vue.prototype.$on = function(event, fn) {
    const vm = this
    
    if(Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
            this.$on(event[i], fn)
        }
    } else {
        (vm._events[event] || vm.events[event] = []).push(fn)
    }
    return vm
}

Vue.prototype.$once = function(event, fn) {
    const vm = this
    function on () {
        vm.$off(event, on)
        fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
}
