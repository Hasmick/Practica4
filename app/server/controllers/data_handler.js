"use strict";
const fs = require('fs');
const Productjs = require('./products');
let content = fs.readFileSync('./app/data/products.json');

const prod_ =  JSON.parse(content).map(Productjs.createFromObject);
const p = [];

function getUUID(){
	let al = random(0, prod_.length);
	return prod_[al].uuid;
}

function getProducts(){
	return prod_;
}

function getProductsById(uuid){
    for (let products in prod_){ 
    	if(uuid == prod_[products].uuid){
        	return prod_[products];
		}
    }
}


function findTittle(tittle){
	if(tittle=="") return;
    for (let prod in prod_){ 
    	let title = prod_[prod]._title;
    	if(title.includes(tittle)){
        	p.push(prod_[prod]);
		}
    }
}

function findProducts(query){
	var i = String(query).split(':');
	p.length=0;
	if(i.length==2){
		findTittle(i[1]);
		findCategory(i[0]);
	}else{
		findTittle(i[0]);
	}
	return p;
}

function createProducts(products){
	prod_.push(products.createFromObject(products));
}

function updateProducts(uuid,updatedProducts){
    for (let prod in prod_){ 
    	if(uuid == prod_[prod].uuid){
    		prod_[prod]=Productjs.createFromObject(updateProducts);
        	return prod_[prod];
		}
    }
}

function deleteProducts(uuid){
    for (let prod in prod_){ 
    	if(uuid == prod_[prod].uuid){
        	prod_.splice(prod, 1);
		}
    }
}

exports.getProductById = getProductsById;
exports.getProducts = getProducts;
exports.findProduct = findProducts;
exports.createProduct = createProducts;
exports.updateProduct = updateProducts;
exports.deleteProduct = deleteProducts;

