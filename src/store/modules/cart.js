import common from "@/utils/commont";

const state = () => ({
    cartMap: new Map(JSON.parse(localStorage.getItem('cart'))),
    count: common.getCartCount()
})

const getters = {
    getCartMap: state => {
        console.log(state.cartMap)
        return state.cartMap
    },
    getCount: state => {
        return state.count
    }
}

const mutations = {
    addCart(state, product) {
        state.count++
        let cartMap = state.cartMap
        let id = product.id
        let data = product.data
        if (cartMap.has(id)) {
            let product = cartMap.get(id)
            product.count = product.count + 1
            cartMap.set(id, product)
        } else {
            cartMap.set(id, data)
        }
        state.cartMap = cartMap
        common.addToLocalStorage(product)
    },
    changeCart(state, payload) {
        state.count += payload.currentValue - payload.oldValue
        common.changeCart(payload)
    },
    clear(state) {
        state.count = 0
        state.cartMap.clear()
        common.clearCart()
    }
}

export default {
    state,
    getters,
    mutations
}