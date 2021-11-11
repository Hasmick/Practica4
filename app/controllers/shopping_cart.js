"use strict";

class ShoppingCartException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}

class productsProxy{
	constructor(prodUUID, amount){
		this.prodUUID = prodUUID;
		this.amount = amount;
	}
}
class ShoppingCart{
	constructor(){
		this.products = [];  
		this._productsProxy = []; 
	}
    get products() {
        return this._products;
    }
    get productsProxy() {
        return this._productsProxy;
    }
    set productsProxy(value) {
    	throw new ShoppingCartException('Los proxys no se pueden configurar manualmente.');
    }
    
    deleteItem(prodUUID)
    {
        for (let proxy in this._productsProxy){ 
            if(prodUUID == this._productsProxy[proxy].prodUUID){
                this._productsProxy.splice(proxy,1);}}
    }
    addItem(prodUUID, new_A)
    {
        let add = false;
        if (new_A < 0) {throw new ShoppingCartException('La cantidad debe de ser un numero positivo');}
        if (new_A == 0) return;
        //checar si elobjeto ya esta en productsProxy
        for (let proxie in this._productsProxy){
            if(prodUUID == this._productsProxy[proxie].prodUUID){             //actualizar
                this._productsProxy[proxie].amount = this._productsProxy[proxie].amount + new_A;
                add = true;}
        }
        //crearlo en productsProxy
        if(!add){
            let proxy = new productsProxy(prodUUID,new_A);
            this._productsProxy.push(proxy);}
    }
    set products(value) 
    {
    	if(typeof value === 'String'){value = JSON.parse(value);}
        this._products="try";
    	
    }
    updateItem(prodUUID, new_A)
    {
    	if (new_A == 0) this. deleteItem(prodUUID);
    	if (new_A < 0) throw new ShoppingCartException('Debe de ser un numero positivo');
        let add = false;
         //checar si esta en productsProxy
        for (let proxy in this._productsProxy){
            if(prodUUID == this._productsProxy[proxy].prodUUID){
                this._productsProxy[proxy].amount = new_A;
                add = true;}
        }if(!add){throw new ShoppingCartException('No existe el producto, porfavor añadelo');}
    }

    calcTotal(){
    	let tot = 0;        
     this._products = (getProducts());
        for(let prox in this._productsProxy){
            for(let prod in this.products){
                if(this.products[prod].uuid == this.productsProxy[prox].prodUUID ){
                    console.log(this.products[prod].title, ": ", this.products[prod].pricePerUnit,"x",this.productsProxy[prox].amount)
                    tot = tot + (this.products[prod].pricePerUnit * this.productsProxy[prox].amount)
                }
            }
        }
        //buscamos el valor en products y lo multiplicamos por la cantidad del proxy
    	return tot;}
}

export default ShoppingCart;