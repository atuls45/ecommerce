const multer = require('multer');
import { Request, Response } from 'express';
const fse = require('fs-extra');

import { TRoutesInput } from '../types/routes';
import { MulterFile } from '../types/multerInstance';

import ProductController from '../controllers/product.controller';
import CartController from '../controllers/cart.controller';

const storage = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb: any) => {
    cb(null, '../client/src/assets/img/uploads');
  },
  filename: (req: Request, file: MulterFile, cb: any) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default ({ app }: TRoutesInput) => {
  app.get('/api/product', async (req: Request, res: Response) => {
    const product = await ProductController.getProduct();

    return res.json({ success: true, data: product });
  });

  app.post('/api/product', upload.single('file'), async (req: Request & { file: MulterFile }, res: Response) => {
    const product = await ProductController.createProduct({
      Name: req.body['Name'],
      Quantity: req.body['Quantity'],
      Price: req.body['Price'],
      Description: req.body['Description'],
      file: req.file.filename
    });
    return res.json({ success: true, data: product });
  });

  app.put('/api/product/:id', async (req: Request, res: Response) => {
    const product = await ProductController.updateProduct(req.params.id, {
      Name: req.body['Name'],
      Quantity: req.body['Quantity'],
      Price: req.body['Price'],
      Description: req.body['Description']
    });
    return res.json({ success: true, data: product });
  });

  app.delete('/api/product/:id', async (req: Request, res: Response) => {
    await ProductController.deleteProduct(req.params.id);
    return res.json({ success: true, data: 'Record deleted succesfully' });
  });

  app.get('/api/cart', async (req: Request, res: Response) => {
    const cart = await CartController.getCart();
    return res.json({ success: true, data: cart });
  });

  app.get('/api/cartcount', async (req: Request, res: Response) => {
    const cart = await CartController.CartCount();
    return res.json({ success: true, data: cart });
  });

  app.put('/api/cart/:id', async (req: Request, res: Response) => {
    try {
      const cart = await CartController.CreateCart({
        ProductId: req.params.id,
        Quantity: req.body['Quantity']
      });
      return res.json({ success: true, data: cart });
    } catch (err) {
      return res.json({ success: false, data: err });
    }
  });
};
