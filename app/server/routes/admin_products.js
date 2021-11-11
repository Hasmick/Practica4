"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => res.send(' Admin products working'))
  .post((req, res) => {
    let product = req.body;

    try {
      dataHandler.createProduct(product);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`Product ${product.title} created!`)

  });

router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    let newProduct = req.body;

    let product = dataHandler.getProductById(id);
    if(product != undefined ) {
      try {
        dataHandler.updateProduct(id,newProduct);
      } catch (e){
        res.status(400).send(e.errorMessage);
        return;
      }
    } else {
      res.status(404).send(`Product ${id} doesn't exist!`);
    }
  
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(`Product ${product.title} updated!`)
  })
  .delete((req, res) => {
    let id = req.params.id;

    let product = dataHandler.getProductById(id);
    if(product != undefined ) {
      try {
        dataHandler.deleteProduct(id);
      } catch (e){
        res.status(400).send(e.errorMessage);
        return;
      }
    } else {
      res.status(404).send(`Product ${id} doesn't exist!`);
    }
  
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(`Product ${product.title} eliminated!`)
  });

module.exports = router;