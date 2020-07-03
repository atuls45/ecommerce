import mongoose, { Schema } from 'mongoose';
import Cart, { ICart } from '../cart.model';

describe('Cart model', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should throw validation errors', () => {
    const cart = new Cart();

    expect(cart.validate).toThrow();
  });

  it('Should save a user', async () => {
    expect.assertions(2);

    const cart: ICart = new Cart({ ProductId: '5ef8ec6a5baf27684c545312', Quantity: 4 });
    const spy = jest.spyOn(cart, 'save');

    cart.save();

    expect(spy).toHaveBeenCalled();

    expect(cart.Quantity).toBe(4);
  });
});
