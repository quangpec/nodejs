const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};
module.exports = class Cart {
    static addTocart(id, price) {
        fs.readFile(p, (err, fileConten) => {
            let cart = { product: [], totalprice: 0 };
            if (!err) {
                cart = JSON.parse(fileConten);
                const exitingProductIndex = cart.product.findIndex(product => product.id === id);
                const exitingProduct = cart.product[exitingProductIndex];

                let updateProduct;
                if (exitingProduct) {
                    updateProduct = { ...exitingProduct };
                    updateProduct.qty = updateProduct.qty + 1;
                    cart.product[exitingProductIndex] = updateProduct;
                } else {
                    updateProduct = { id: id, qty: 1, price: price };
                    cart.product = [...cart.product, updateProduct];
                }
                cart.totalprice = cart.totalprice + +price;
                fs.writeFile(p, JSON.stringify(cart), err => {
                    console.log(err);
                })
            } else
                console.log(err);
        })
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static delete(id) {
        getProductsFromFile(CartProduct => {
            const Pindex = CartProduct.product.findIndex(prod => prod.id === id);
            console.log(Pindex);
            if (Pindex!==-1) {
                CartProduct.totalprice = CartProduct.totalprice - CartProduct.product[Pindex].price * CartProduct.product[Pindex].qty;
                CartProduct.product = CartProduct.product.filter(prod => prod.id !== id);
                console.log('delete', CartProduct);
                fs.writeFile(p, JSON.stringify(CartProduct), err => {
                    console.log(err);
                })
            }else{
                console.log('lỗi');
            }
        }
        );
    }
}