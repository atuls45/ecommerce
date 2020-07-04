import Product, { IProduct } from '../models/product.model';
import CartController from './cart.controller';

interface ICreateProductInput {
  Name: IProduct['Name'];
  Quantity: IProduct['Quantity'];
  Price: IProduct['Price'];
  Description: IProduct['Description'];
  file: IProduct['file'];
}

async function getProduct(): Promise<IProduct[]> {
  return await Product.find()
    .then((data: IProduct[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function createProduct({ Name, Quantity, Price, Description, file }: ICreateProductInput): Promise<IProduct> {
  return await Product.create({
    Name,
    Quantity,
    Price,
    Description,
    file
  })
    .then((data: IProduct) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function updateProduct(id: any, data: any): Promise<any> {
  return await Product.updateOne(
    {
      _id: id
    },
    data
  )
    .then(async (data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function deleteProduct(id: any): Promise<any> {
  return await Product.deleteOne({
    _id: id
  })
    .then(async (data) => {
      await CartController.DeleteCart(id);
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
};
