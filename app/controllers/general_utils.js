"use strict";

const productsUrl = 'http://localhost:8080/products'
const cartaUrl = 'http://localhost:8080/products/carta'

function readShoppingcarta(){
	let carta = JSON.parse(sessionStorage.getItem('shoppingcarta'));
	let i = new Shoppingcarta();
	i._products = carta._products;
	i._productProxy = carta._productProxy;
	return i;
}

function writeShoppingcarta(carta){
	sessionStorage.setItem('shoppingcarta',JSON.stringify(carta));
}

function initShoppingcarta(){
	if(sessionStorage.getItem('shoppingcarta')==null){
		let carta = new Shoppingcarta();
		writeShoppingcarta(carta);
	}
	let carta = readShoppingcarta();
	document.getElementById("proxySize").innerText = carta._productProxy.length;
}


function goTocarta(){
  	if(sessionStorage.getItem('shoppingcarta')==null){
		let carta = new Shoppingcarta();
		writeShoppingcarta(carta);
	}
  	let carta = readShoppingcarta();
  	//aqui hacemos una llamada al post carta y lo que nos regresa lo guardamos en products
  	postcarta(cartaUrl, carta._productProxy, 
      	(msg) => {
	        //console.log(msg)
	        carta.products = JSON.parse(msg)
	        writeShoppingcarta(carta)
	        window.location.href = "shopping_carta"
	      }
	      , (err) => {
	      	sessionStorage.removeItem('shoppingcarta');
			let carta = new Shoppingcarta();
			writeShoppingcarta(carta);
  			document.getElementById("proxySize").innerText 
          		= carta._productProxy.length;
    		loadcarta();
			console.log("Server + UUID Refresh = " + err);
      	});
}

function reloadcarta(){
  	let carta = readShoppingcarta();
  	postcarta(cartaUrl, carta._productProxy, 
      	(msg) => {
	        carta.products = JSON.parse(msg)
	        writeShoppingcarta(carta)
    		loadcarta();
	      } 
	      , (err) => {
	      	sessionStorage.removeItem('shoppingcarta');
			let carta = new Shoppingcarta();
			writeShoppingcarta(carta); 
  			document.getElementById("proxySize").innerText 
          		= carta._productProxy.length;
    		loadcarta();
			console.log("Server + UUID Refresh = " + err);
      	});
}


initShoppingcarta();