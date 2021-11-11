"use strict";

let productContainer = document.getElementById('mainList');
let listContainer = document.getElementById('sideList');
let cartaTot = document.getElementById('Tot');

function productToHtml(products){
	let proxy = products[0]
	let product = products[1]
	return `	
	<div class="card">
    <div class="card-body">
	<div class="media"><div class="media-body"><span class="d-none"> ${proxy.productUUID}</span>
          <h5 class="mt-0 mb-1"> ${product._title}<button type="button" class="btn btn-sm btn-danger" id=${proxy.productUUID} onClick="removeFromcarta(this.id)"><i class="fa fa-trash" aria-hidden="true"></i></button></h5>
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Cantidad:</span></div>
            <input type="number" class="form-control"  id="amount:${proxy.productUUID}" min="1" 
              readonly style="text-align:center; background-color:#fff" value=${proxy.amount}>
            <div class="input-group-append">
              <button class="btn btn-outline-success" id=modify:${proxy.productUUID} type="button" onClick="showModify(this.id)"><i class="fas fa-pencil-alt"></i><span class="d-none" id=pre:${proxy.productUUID}></span></button>
              <button class="btn btn-outline-success" id=accept:${proxy.productUUID} style="display:none" type="button" onClick="updatecarta(this.id)"><i class="fas fa-check"></i></button>
              <button class="btn btn-outline-danger"  id=cancel:${proxy.productUUID} style="display:none" type="button" onClick="hideModify(this.id)"><i class="fas fa-times"></i></button></div>
          </div>
          <div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Precio:</span></div>
              <span class="form-control" id="precio" align="center">$${product._pricePerUnit}</span>
              <div class="input-group-append"><span class="input-group-text" id="basic-addon2">$ mxn</span></div>
            </div>
          </div>
          <div class="media-right"><img class="ml-3 shop-img" src=${product._imageUrl} alt=${product._title}></div></div></div></div>`;}

function listToHtml(products){
	let proxy = products[0]
	let product = products[1]
	return `	
        <p>${product._title}: ${proxy.amount} x $${product._pricePerUnit}</p>
	`;
}

function productListToHtml(productList){
  productContainer.innerHTML =  productList.map(productToHtml).join('\n');
  listContainer.innerHTML =  productList.map(listToHtml).join('\n');
}

function loadcarta() {
	let carta = readShoppingcarta();
	//console.log(carta)
	let zipped = carta.productProxy.map((x, i) => [x, carta.products[i]]);
	productListToHtml(zipped);
    cartaTot.innerHTML = 'Monto a pagar: $' + carta.calculateTot();
  	document.getElementById("proxySize").innerText 
          = carta._productProxies.length;
}

function updatecarta(clicked_id){
	let id = clicked_id.split(':')[1];
	let btnAccept = document.getElementById('accept:'+id);
	let btnCancel = document.getElementById('cancel:'+id);
	let btnModify = document.getElementById('modify:'+id);
	let inAmount = document.getElementById('amount:'+id);
	let carta = readShoppingcarta();
	carta.updateItem(id,inAmount.value);
	inAmount.setAttribute("readonly", true);
	btnAccept.style.display = 'none';
	btnCancel.style.display = 'none';
	btnModify.style.display = '';
	writeShoppingcarta(carta);
	reloadcarta();
}
function showUpdate(clicked_id) {
	let id = clicked_id.split(':')[1];
	let btnAccept = document.getElementById('accept:'+id);
	let btnCancel = document.getElementById('cancel:'+id);
	let btnModify = document.getElementById('modify:'+id);
	let inAmount = document.getElementById('amount:'+id);
	let preVal = document.getElementById('pre:'+id);
	inAmount.removeAttribute("readonly");
	preVal.innerText = inAmount.value;
	btnAccept.style.display = '';
	btnCancel.style.display = '';
	btnModify.style.display = 'none';
}

function hideUpdate(clicked_id) {
	let id = clicked_id.split(':')[1];
	let btnAccept = document.getElementById('accept:'+id);
	let btnCancel = document.getElementById('cancel:'+id);
	let btnModify = document.getElementById('modify:'+id);
	let inAmount = document.getElementById('amount:'+id);
	let preVal = document.getElementById('pre:'+id);
	inAmount.value = preVal.innerText;
	inAmount.setAttribute("readonly", true);
	btnAccept.style.display = 'none';
	btnCancel.style.display = 'none';
	btnModify.style.display = '';
}

function removeFromcarta(clicked_id) {
	//console.log(clicked_id)
	let carta = readShoppingcarta();
	carta.removeItem(clicked_id);
	writeShoppingcarta(carta);
	reloadcarta();
}


loadcarta();