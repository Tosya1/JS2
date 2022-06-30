'use strict';

const GET_GOOG_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${GET_GOOG_ITEMS}/catalogData.json`;
const GOODS_BASKET = `${GET_GOOG_ITEMS}/getBasket.json`;

function service(url) {
    return fetch(url).then((res) => res.json());
}

window.onload = () => {
    Vue.component('good', {
        props: [
            'item'
        ],
        template: `
        <div class=" goods-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        </div>
        `
    })

    Vue.component('custom-button', {
        template: `
        <button class="cart-button" type="button" @click="$emit('click')">
        <slot></slot>
        </button>
        `
    })

    Vue.component('basket', {
        props: [
            'calculatePrice'
        ],
        template: `
        <div class="basket">
            <div class="basket-header">
                <div class="close-basket" @click="$emit('close')">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="basket-body"></div>
            <div class="basket-footer">  Всего товаров на сумму  <span>{{ calculatePrice}}</span></div>
        </div>
        `
    })

    Vue.component('custom-input', {
        props: ['value'],
        template: `
        <input type="text" class="goods-search"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
        >
        `
    })

    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            search: '',
            isVisibleCart: false,
            dataOnload: true,
        },

        methods: {
            changeCartVisibility() {
                return this.isVisibleCart = !this.isVisibleCart;
            },
        },


        mounted() {
            service(GOODS).then((data) => {
                this.items = data;
            })
        },
        created() {

        },

        computed: {
            filteredItems() {
                return this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.search, 'i'));
                })
            },

            calculatePrice() {
                return this.items.reduce((acc, { price }) => acc + price, 0);
            }

        }
    })
}