import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';
import { type } from "os";


const BASKET = './public/basket_goods.json'
const GOODS = './public/goods.json'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readBasket = () => readFile(BASKET, 'utf-8').then((basketFile) => {
    return JSON.parse(basketFile)
})

const readGoods = () => readFile(GOODS, 'utf-8').then((basketFile) => {
    return JSON.parse(basketFile)
})

app.post('/goods', (req, res) => {
    console.log(res.body),
    req.send()
})

app.get('/basket', (req, res) => {
    Promise.all([
        readBasket(),
        readGoods()
    ]).then(([basketList, goodsList]) => {
        return basketList.map((basketItem) => {
            const goodsItem = goodsList.find(({ id_product: _goodsId }) => {
                return _goodsId === basketItem.id_product
            });
            return {
                ...basketItem,
                ...goodsItem
            }
        })
    }).then((result) => {
        res.send(JSON.stringify(result))
    })
});

app.listen('8000', () => {
    console.log('server is starting!');
});
