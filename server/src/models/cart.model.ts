import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './product.model';

export interface ICart extends Document {
  ProductId: IProduct['_id'];
  Quantity: number;
}

const CartSchema: Schema = new Schema({
  ProductId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  Quantity: { type: Number, required: true }
});

export default mongoose.model<ICart>('Cart', CartSchema);
