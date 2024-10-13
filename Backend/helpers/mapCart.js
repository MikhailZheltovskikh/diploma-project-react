module.exports = function (cart) {
    return {
        id: cart._id,
        cart: cart.products.map((item) => {
            return {
                id: item._id,
                title: item.title,
                price: item.price,
                image_url: item.image_url,
                count: item.count,
            };
        }),
        totalPrice: cart.totalPrice,
    };
};
