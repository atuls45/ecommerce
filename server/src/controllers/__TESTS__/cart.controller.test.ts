import mongoose from 'mongoose';
import Controller from '../cart.controller';
import Product from '../product.controller';

const productData: any = { Name: 'Test Product', Quantity: 5, Price: 100, Description: 'Testing a product', file: 'Filenames' };

describe('Cart controller', async () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should create a cart', async () => {
    const product = await Product.createProduct(productData);
    productData['id'] = product._id;
    const cart = await Controller.CreateCart({
      ProductId: product._id,
      Quantity: 2
    });
    expect(cart.data[cart.data.length - 1].ProductId).toEqual(product._id);
  });

  it('Should update a cart', async () => {
    const cart = await Controller.CreateCart({
      ProductId: productData['id'],
      Quantity: 1
    });
    expect(cart.data[cart.data.length - 1].Quantity).toEqual(3);
  });

  it('Should delete a cart', async () => {
    const cart = await Controller.CreateCart({
      ProductId: productData['id'],
      Quantity: 0
    });
    if (!cart.data[0]) expect(cart.data[0]).toBe(undefined);
    else expect(cart.data[cart.data.length - 1].ProductId).not.toEqual(productData['id']);
  });
});
