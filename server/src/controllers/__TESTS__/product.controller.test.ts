import mongoose from 'mongoose';
import Controller from '../product.controller';

const testData: any = { Name: 'Test Product', Quantity: 5, Price: 100, Description: 'Testing a product', file: 'Filenames' };

describe('Product controller', async () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should create a product', async () => {
    const product = await Controller.createProduct(testData);
    testData['id'] = product._id;
    expect(product.Name).toEqual(testData.Name);
  });

  it('Should update a product', async () => {
    const product = await Controller.updateProduct(testData.id, { ...testData, ...{ Name: 'Updated Product Name' } });
    expect(product['nModified']).toEqual(1);
  });

  it('Should get a product', async () => {
    const product = await Controller.getProduct();
    expect(product[product.length - 1].Name).toEqual('Updated Product Name');
  });

  it('Should delete a product', async () => {
    const product = await Controller.deleteProduct(testData.id);
    expect(product.deletedCount).toEqual(1);
  });
});
