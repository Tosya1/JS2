'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const GET_GOOG_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${GET_GOOG_ITEMS}/catalogData.json`;
const GOODS_BASKET = `${GET_GOOG_ITEMS}/getBasket.json`;

function service(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    const loadHandler = () => {
        callback(JSON.parse(xhr.response))
    }
    xhr.onload = loadHandler;
    xhr.send();
}

class GoodsItem {
    constructor({ product_name = '', price = 0 }) {
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        return `
        <div class="goods-item">
            <h3>${this.product_name}</h3>
            <p>${this.price}</p>
        </div>
        `;
    }
}

class GoodsList {
    items = [];
    fetchData(callback) {
        service(GOODS, data => {
            this.items = data;
            callback()
        });
    }

    calculatePrice() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const goodsList = this.items.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        })
        document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }
}

class BasketGoods {
    items = [];
    fetchDataBasket(callback = () => {}) {
        service(GOODS_BASKET, data => {
            this.items = data;
            callback()
        });
    }
}

const goodsList = new GoodsList();
goodsList.fetchData(() => {
    goodsList.render();
});
goodsList.fetchData(() => {
    console.log(goodsList.calculatePrice());
});

const basketGoods = new BasketGoods();
basketGoods.fetchDataBasket();





