import Cart, { ICart } from '../models/cart.model';
import Product, { IProduct } from '../models/product.model';

interface ICreateCartInput {
  ProductId: ICart['ProductId'];
  Quantity: ICart['Quantity'];
}

async function getCart(): Promise<{ data: any; totalPrice: number }> {
  return await getCartData();
}

async function CartCount(): Promise<{ cartCount: number }> {
  return await Cart.aggregate([{ $group: { _id: null, cartCount: { $sum: '$Quantity' } } }])
    .then(async (data: any) => {
      return data ? data[0].cartCount : 0;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function CreateCart({ ProductId, Quantity }: ICreateCartInput): Promise<any> {
  return await Product.findOne({ _id: ProductId }).then(async (product: IProduct) => {
    if (product) {
      return await Cart.findOne({
        ProductId
      }).then(async (cart: ICart) => {
        let total = Quantity ? Quantity : 0;
        if (cart) {
          total = cart.Quantity + Quantity;
        }
        if (Quantity === 0 || total === 0) {
          return await DeleteCart(ProductId);
        } else if (total <= product.Quantity && total > 0) {
          if (!cart) {
            await Cart.create({
              ProductId,
              Quantity: total
            });
          } else {
            await Cart.updateOne(
              {
                ProductId
              },
              { Quantity: total }
            );
          }
          return await getCartData();
        } else {
          throw 'Invalid product quantity';
        }
      });
    }
  });
}

async function DeleteCart(ProductId: ICreateCartInput): Promise<{ data: any; totalPrice: number }> {
  return await Cart.deleteOne({
    ProductId
  })
    .then(async () => {
      return await getCartData();
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  getCart,
  CartCount,
  CreateCart,
  DeleteCart
};

async function getCartData() {
  return await Cart.find()
    .then(async (data: ICart[]) => {
      let cartData = [];
      let totalPrice = 0;
      for (let i = 0; i < data.length; i++) {
        let pData = await Product.findOne({ _id: data[i].ProductId });
        cartData.push({
          ProductId: data[i].ProductId,
          Quantity: data[i].Quantity,
          Name: pData.Name,
          Price: pData.Price,
          file: pData.file
        });
        totalPrice += data[i].Quantity * pData.Price;
      }
      return { data: cartData, totalPrice };
    })
    .catch((error: Error) => {
      throw error;
    });
}
