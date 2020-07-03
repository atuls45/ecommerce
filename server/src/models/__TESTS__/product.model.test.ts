import mongoose from 'mongoose';
import Product, { IProduct } from '../product.model';

describe('Product model', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should throw validation errors', () => {
    const product = new Product();

    expect(product.validate).toThrow();
  });

  it('Should save a user', async () => {
    expect.assertions(3);

    const product: IProduct = new Product({ Name: 'Test Product', Quantity: 5, Price: 100, Description: 'Testing a product', file: 'Filenames' });
    const spy = jest.spyOn(product, 'save');

    product.save();

    expect(spy).toHaveBeenCalled();

    expect(product).toMatchObject({
      Name: expect.any(String),
      Quantity: expect.any(Number),
      Price: expect.any(Number),
      Description: expect.any(String),
      file: expect.any(String)
    });

    expect(product.Name).toBe('Test Product');
  });
});
