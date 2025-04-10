const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    dateAdded: Date
});

itemSchema.statics.listAllItem = function() {
    return this.find();
};
var itemModel = mongoose.model('item', itemSchema);
module.exports = itemModel;
