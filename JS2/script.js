'use strict';

const GET_GOOG_ITEMS = 'http://localhost:8000';
const GOODS = `${GET_GOOG_ITEMS}/goods.json`;
const GOODS_BASKET = `${GET_GOOG_ITEMS}/basket`;

function service(url) {
    return fetch(url).then((res) =>
        res.json());
}

window.onload = () => {
    Vue.component('good', {
        props: [
            'item'
        ],
        template: `
        <div class="goods-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        <custom-button>Добавить</custom-button>
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
        data () {
            return {
                basketGoodsItems: [],
            }
        },

        template: `
        <div class="basket">
            <div class="basket-header">
                <div class="close-basket" @click="$emit('close')">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="basket-body">
            <basketGood v-for="item in basketGoodsItems" :item="item"></basketGood>   
            </div>
            <div class="basket-footer">  Всего товаров на сумму  <span>{{ calculatePrice}}</span></div>
        </div>
        `,
        mounted () {
            service(GOODS_BASKET).then((data) => {
                this.basketGoodsItems = data;
            })
        },
        computed: {
            calculatePrice() {
                return this.basketGoodsItems.reduce((acc, { price, count}) => acc + (price * count), 0);
            }
        }
    })

    Vue.component('basketGood', {
        props: [
            'item'
        ],
        template: `
        <div class="goods-item basket-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        <div class="basketGoodsCount">
        <div>+</div>
        <div>{{ item.count }}</div>
        <div>-</div>
        </div>
        </div>
        `
    })

    Vue.component('custom-input', {
        template: `
        <input type="text" class="goods-search"
            :value="this.search"
            @input="$emit('input', $event.target.value)"
        >
        `
    })

    Vue.component('error', {
        template: `
        <div class="error">
        <i class="fa-solid fa-xmark" @click="$emit('close')"></i>
        <div><slot></slot></div>
        </div>
        `
    })

    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            search: '',
            isVisibleCart: false,
            isVisibleError: false,
            err: '',
        },

        methods: {
            changeCartVisibility() {
                return this.isVisibleCart = !this.isVisibleCart;
            },
            changeErrorVisibility() {
                return this.isVisibleError = !this.isVisibleError;
            },
            errorTimeout() {
                let timerId = setInterval(() => this.changeErrorVisibility(), 2500);
                setTimeout(() => { clearInterval(timerId);}, 5000)
            },
        },

            mounted() {
                service(GOODS).then((data) => {
                    this.items = data;
                })
                    .catch((err) => {
                        this.errorTimeout();
                        this.err = err;
                    });
            },

            computed: {
                filteredItems() {
                    return this.items.filter(({ product_name }) => {
                        return product_name.match(new RegExp(this.search, 'i'));
                    })
                },

                calculatePrice() {}
            }
        })
}