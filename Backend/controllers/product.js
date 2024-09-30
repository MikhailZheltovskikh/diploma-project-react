const Product = require('../modules/Product');
const Group = require('../modules/Group');

// add
async function addProduct(productData) {
    const product = await Product.create(productData);
    
    await Group.findByIdAndUpdate(productData.group, {
        $push: { products: product._id }
    });

    return product;
}

// edit
async function editProduct(id, product) {
    const newProduct = await Product.findByIdAndUpdate(id, product, { reternDocument: 'after' });
    return newProduct;
}

// delete
function deleteProduct(id) {
    return Product.deleteOne({ _id: id });
}

// get list with search anp pagination
async function getProducts(search = '', limit = 10, page = 1) {
    const [products, count] = await Promise.all([
        Product.find({ title: { $regex: search, $options: 'i' } })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Product.countDocuments({ title: { $regex: search, $options: 'i' } }),
    ]);

    return {
        products,
        lastPage: Math.ceil(count / limit),
    };
}

// get item
function getProduct(id) {
    return Product.findById(id);
}

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProduct,
};
