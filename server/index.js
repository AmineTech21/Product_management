const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
// const router = Router()
const toId = mongoose.Types.ObjectId;

const { ProductModel, ProductTypeModel } = require('./models/Product');
const { Router } = require('express');

app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://AmineTech:AmineTech123@cluster0.io85q.mongodb.net/Releasin?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);

//=======================Connect product type and product =============//

app.get('/productfinished/:product/:producttype', async (req, res) => {
  const type = toId(req.params.producttype);

  const finalProduct = await ProductModel.findById(req.params.product);
  finalProduct.productType = type;
  finalProduct.save();

  res.json(finalProduct);
});

//======================= See all products =======================//

app.get('/seeproducts', async (req, res) => {
  const products = await ProductModel.find({}).populate('productType', {
    productTypeName: 1,
    attributes: 1,
  });
  res.json(products);
});

//======================= Create Product Name =======================//

app.post('/insert', async (req, res) => {
  const productName = req.body.productName;
  const product = new ProductModel({
    productName: productName,
  });

  try {
    await product.save();
    res.send('inserted Data');
  } catch (err) {
    console.log(err);
  }
});

//======================= Create Product Type Name =======================//

app.post('/inserttype', async (req, res) => {
  const productTypeName = req.body.productTypeName;
  const attribute = req.body.attributeName;
  const attributeValue = req.body.attributeValueName;

  console.log(attribute, attributeValue);
  const productType = new ProductTypeModel({
    productTypeName: productTypeName,
    attributes: [
      {
        attributeName: attribute,
        attributeValue: [
          {
            attributeValueName: attributeValue,
          },
        ],
      },
    ],
  });

  try {
    await productType.save();
    res.send('inserted Data');
  } catch (err) {
    console.log(err);
  }
});

//======================= Get all types =======================//

app.get('/readtype', async (req, res) => {
  ProductTypeModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//======================= Update =======================//

app.put('/update', async (req, res) => {
  const newProductName = req.body.newProductName;
  const id = req.body.id;

  try {
    await ProductModel.findById(id, (err, updatedProduct) => {
      updatedProduct.ProductName = newProductName;
      updatedProduct.save();
      res.send('updated');
    }).clone();
  } catch (err) {
    console.log(err);
  }
});

//======================= Delete =======================//

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await ProductModel.findByIdAndDelete(id).exec();
  res.send('deleted');
});

const PORT = process.env.PORT || 3001;

app.listen(3001, () => console.log(`Server running on ${PORT}`));
