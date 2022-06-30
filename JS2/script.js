'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GoodsItem {
    constructor({ title = '', price = 0 }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `
        <div class="goods-item">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
        </div>
        `;
    }
}

class GoodsList {
    fetchData() {
        this.list = goods;
    }

    calculatePrice() {
        return this.list.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const goodsList = this.list.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        })
        document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }
}

const goodsList = new GoodsList(goods);
goodsList.fetchData();
goodsList.render();
console.log(goodsList.calculatePrice());

//2 Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
class Hamburger {
    static sizeSmall = { price: 50, calories: 20 };
    static sizeBig = { price: 100, calories: 40 };
    static stuffingfCheese = { price: 10, calories: 20 };
    static stuffingSalad = { price: 20, calories: 5 };
    static stuffingPotato = { price: 15, calories: 10 };
    static toppingSpice = { price: 15, calories: 0 };
    static toppingMayo = { price: 20, calories: 5 };

    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
    }

    addTopping(topping) {
        if (this.topping.includes(topping)) {
            return;
        }
        this.topping.push(topping);
    }

    removeTopping(topping) {
        if (!this.topping.includes(topping)) {
            return;
        }
        const index = this.topping.indexOf(topping);
        this.topping.splice(index, 1);
    }

    getToppings() {
        let toppings = [];
        Object.entries(Hamburger).map(item => {
            if (this.topping.includes(item[1])) {
                toppings.push(item[0]);
            }
        });
        return toppings.join(', ');
    }

    getSize() {
        return Object.entries(Hamburger).find(item => item[1] === this.size)[0];
    }

    getStuffing() {
        return Object.entries(Hamburger)
            .find(item => item[1] === this.stuffing)[0];
    }

    calculatePrice() {
        return this.size.price + this.stuffing.price
            + this.topping.reduce((acc, item) => acc + item.price, 0);
    }

    calculateCalories() {
        return this.size.calories + this.stuffing.calories
            + this.topping.reduce((acc, item) => acc + item.calories, 0);
    }
}


const hamb = new Hamburger(Hamburger.sizeBig, Hamburger.stuffingfCheese);

hamb.addTopping(Hamburger.toppingMayo);
hamb.addTopping(Hamburger.toppingSpice);

console.log(hamb.getToppings());
console.log(`Стоимость гамбургера ${hamb.calculatePrice()} руб.`);
console.log(`Калорийность гамбургера ${hamb.calculateCalories()} калорий.`);

hamb.removeTopping(Hamburger.toppingSpice);

console.log(hamb.getSize());
console.log(hamb.getStuffing());
console.log(hamb.getToppings());
console.log(`Стоимость гамбургера ${hamb.calculatePrice()} руб.`);
console.log(`Калорийность гамбургера ${hamb.calculateCalories()} калорий.`);
console.log(hamb);




