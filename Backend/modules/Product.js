const mongoose = require('mongoose');
const validator = require('validator');

const ProductSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
            validate: {
                validator: validator.isURL,
                message: 'Image should be a valid url',
            },
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
