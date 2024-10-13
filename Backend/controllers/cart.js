const Cart = require('../modules/Cart');
const ObjectId = require('mongodb').ObjectId;

// get
async function getCart(user_id) {
    try {
        const cart = await Cart.findOne({ user_id });

        if (cart) {
            return cart;
        } else {
            return { products: [], totalPrice: 0 };
        }
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// add
async function addCart(product, user_id) {
    try {
        const cart = await Cart.findOne({ user_id });

        if (cart) {
            cart.products.push({
                id: product._id,
                title: product.title,
                price: product.price,
                image_url: product.image_url,
                count: product.count,
            });

            cart.totalPrice += product.price * product.count;
            await cart.save();
            return cart;
        } else {
            const newCart = await Cart.create({
                user_id,
                products: [
                    {
                        id: product._id,
                        title: product.title,
                        price: product.price,
                        image_url: product.image_url,
                        count: product.count,
                    },
                ],
                totalPrice: product.price * product.count,
            });

            return newCart;
        }
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// updateCountToCart
async function updateCountToCart(productId, operation, user_id) {
    try {
        const cart = await Cart.findOne({ user_id });

        if (cart) {
            const existingProduct = cart.products.find((item) => item._id.equals(new ObjectId(productId)));
            if (existingProduct && operation === 'inc') {
                existingProduct.count += 1;

                const newTotalPrice = cart.products.reduce((sum, item) => sum + item.price * item.count, 0);
                cart.totalPrice = newTotalPrice;
            }

            if (existingProduct && operation === 'dec') {
                existingProduct.count -= 1;

                const newTotalPrice = cart.products.reduce((sum, item) => sum + item.price * item.count, 0);
                cart.totalPrice = newTotalPrice;
            }

            await cart.save();
            return cart;
        }
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// remove
async function removeCartItem(productId, user_id) {
    try {
        const update = {
            $pull: { products: { _id: productId } },
        };

        const cart = await Cart.findOneAndUpdate({ user_id }, update, { new: true });
        const newTotalPrice = cart.products.reduce((sum, item) => sum + item.price * item.count, 0);
        cart.totalPrice = newTotalPrice;
        await cart.save();
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// clear
async function clearToCart(user_id) {
    try {
        const cart = await Cart.findOne({ user_id });
        return cart.deleteOne();
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

module.exports = {
    getCart,
    addCart,
    removeCartItem,
    updateCountToCart,
    clearToCart,
};
