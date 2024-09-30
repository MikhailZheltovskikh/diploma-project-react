const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
