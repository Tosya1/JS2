'use strict';

const GET_GOOG_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${GET_GOOG_ITEMS}/catalogData.json`;
const GOODS_BASKET = `${GET_GOOG_ITEMS}/getBasket.json`;

function service(url) {
    return fetch(url).then((res) => res.json());
}

window.onload = () => {
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