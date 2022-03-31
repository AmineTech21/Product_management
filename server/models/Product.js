const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AttributeValueSchema = new Schema(
  {
    attributeValueName: { type: Array, required: true },
    Boolean: { type: Boolean },
    Date: { type: Date },
  },
  { timestamps: true }
);


const AssignedAttributeSchema = new Schema(
  {
    attributeValue: [AttributeValueSchema],
  },
  { timestamps: true }
);


const AttributeSchema = new Schema(
  {
    attributeName: { type: String, required: true },
    attributeValue: [AttributeValueSchema],
  },
  { timestamps: true }
);


const ProductTypeSchema = new Schema(
  {
    productTypeName: { type: String, required: true },
    attributes: [AttributeSchema],
    // product: { type: mongoose.Types.ObjectId, ref: 'Product'}
  },
  { timestamps: true }
);


const ProductSchema = new Schema(
  {
    productName: { type: String, required:true},
    productType: { type: mongoose.Types.ObjectId, ref: 'ProductType' },
    assignedAttributes: [AssignedAttributeSchema],
    // daysSinceIAte: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);
const ProductTypeModel = mongoose.model('ProductType', ProductTypeSchema);
module.exports = {ProductModel, ProductTypeModel}
