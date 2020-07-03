import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  Name: string;
  Quantity: number;
  Price: number;
  Description: string;
  file: string;
}

const ProductSchema: Schema = new Schema({
  Name: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
  Description: { type: String, required: true },
  file: { type: String, required: true }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
