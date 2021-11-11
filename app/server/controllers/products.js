"use strict";
import utils from './utils';

class ProductsException{
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Products{
    constructor(title, description, imageUrl, unit, stock, pricePerUnit, category){
        this._uuid = generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }

    get title(){
        return this._title;
    }

    get uuid(){
        return this._uuid;
    }

    get description(){
        return this._description;
    }
    get imageUrl(){
        return this._imageUrl;
    }
    get unit(){
        return this._unit;
    }
    get stock(){
        return this._stock;
    }
    get pricePerUnit(){
        return this._pricePerUnit;
    }
    get category(){
        return this._category;
    }


    set title(value){
        this._title = value;
        if (typeof value !== "String" || value === '') {
            throw new ProductsException('Agregue un titulo vÃ¡lido.')
        }
    }
    set uuid(value){
        throw new ProductsException('Los uuids se generan automÃ¡ticamente.')
        }

    set description(value){
        if (typeof value !== "String" || value === '') {
            throw new ProductsException('Agrega una descripciÃ³n valueida.')
        }
         this._description = value
    }
    set imageUrl(value){
        this._imageUrl=value;
        if (typeof value !== "String" || value === '') {
            throw new ProductsException('No puede estar vacio.')
        }
    }
    set unit(value){
        this._unit=value;
        if (typeof value !== "String" || value === '') {
            throw new ProductsException('No puede estar vacio.')
        }
    }
    set stock(value){
        this._stock=value;
        if (typeof value !== "number" || value < 0) {
            throw new ProductsException('Ingrese una cantidad positiva.')
        }
    }
    set pricePerUnit(value){
         if (typeof value !== "number" || value < 0) {
            throw new ProductsException('Introduzca una cantidad positivo')
        }
        this._pricePerUnit=value;
    }
    set category(value){
       if(typeof value !== "string" || value == ''){
    		throw new ProductsException('No puede estar vacio');
    	}
        this._category = value;
    }

    static createFromJson(jsonvalue){
        let obj = JSON.parse(jsonvalue);
        return products.createFromObject(obj);
    }
    static createFromObject(obj){
        let newProducts = {};
        Object.assign(newProducts, obj);
        Products.cleanObject(newProducts);
        let products = new Products(
            newProducts['description'],
            newProducts['title'],
            newProducts['imageUrl'],
            newProducts['unit'],
            newProducts['stock'],
            newProducts['pricePerUnit'],
            newProducts['category']);
    	return products;
    }
    static cleanObject(obj){
        const productsProperties = ['uuid', 'description', 'title', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];
        for(let prop in obj){
            //if prop not in productsProperties -> delete obj[prop]
            if(productsProperties.indexOf(prop) == -1){delete obj[prop];}
        }
        console.log(obj);
    }
}

export default Products;
