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

function service(url) {
    return fetch(url).then((res) => res.json());
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
    filteredItems = [];
    fetchData() {
        service(GOODS).then((data) => {
            this.items = data;
            this.filteredItems = data;
            return this.render();
        });
    }

    filterItems(value) {
        this.filteredItems = this.items.filter(({ product_name }) => {
            return product_name.match(new RegExp(value, 'i'));
        })
    }

    calculatePrice() {
        return this.items.reduce((acc, { price }) => acc + price, 0);
    }

    render() {
        const goodsList = this.filteredItems.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        })
        document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }
}

class BasketGoods {
    items = [];
    fetchDataBasket(callback) {
        service(GOODS_BASKET).then((data) => {
            this.items = data.contents;
            return callback();
        });
    }
}

const goodsList = new GoodsList();
goodsList.fetchData();

const basketGoods = new BasketGoods();
basketGoods.fetchDataBasket(() =>
    console.log(goodsList.calculatePrice.call(basketGoods)));

document.querySelector('.search-button').addEventListener('click', () => {
    const value = document.querySelector('.goods-search').value;
    goodsList.filterItems(value);
    goodsList.render();
})