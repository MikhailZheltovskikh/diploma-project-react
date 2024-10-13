const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            title: {
                type: String,
            },
            price: {
                type: Number,
            },
            image_url: {
                type: String,

                validate: {
                    validator: validator.isURL,
                    message: 'Image should be a valid url',
                },
            },
            count: {
                type: Number,
            },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
