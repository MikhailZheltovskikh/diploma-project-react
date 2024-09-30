module.exports = function (product) {
    return {
        id: product.id,
        title: product.title,
        image_url: product.image,
        description: product.description,
        price: product.price,
        group: product.group,
        amount: product.amount,
    };
};
