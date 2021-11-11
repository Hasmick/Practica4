"use strict";

import { Router } from 'express';
const router = Router();
import routerProd from '../routes/products';
import routerProdAdm from '../routes/admin_products';
import { join } from 'path';

router.use('/products', routerProd);
router.use('/admin', validateAdmin , routerProdAdm);

router.get('/',
  (req, res) => res.send('e-commerce app práctica 4')
);

router.get('/home',function(req, res) {
    res.sendFile(join(__dirname, '../../views/home.html'));
});
router.get('/shopping_cart',function(req, res) {
    res.sendFile(join(__dirname, '../../views/shopping_cart.html'));
});

function validateAdmin(req, res, next){
  let  query = req.headers;
  let auth = query['x-auth'];
  if(auth != undefined && auth == 'admin'){
    next();
  }else{
    res.status(403).type("text/plain").send("Acceso no autorizado");
  }
}

export default router;