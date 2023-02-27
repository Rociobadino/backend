
const fs = require('fs');

class productManager {


    constructor(path) {
        this.path = path;
    }

    getProducts() {
        return this.products

    }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {
          id: this.#idGenerator(),
          title: title,
          description: description,
          price: price,
          code: this.#codeGenerator(),
          thumbnail: thumbnail,
          stock: stock, 
        }

        try {
            if (!title || !description || !price || !thumbnail || !stock) {
            console.log(`Por favor complete todos los parametros requeridos del producto`)
            } else {
              this.products.push(product);
            }
          } catch (error) {
            console.log(`Problema agregando producto: ${error.message}`);
          }

    }

    #idGenerator() {
        const id =
        this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1;
        return id;
    }


    #codeGenerator(){
        return Math.floor(Math.random() * 10000000000);
    }

    getProductById(id){
      
        for(let i=0; i < this.products.length; i++){
            if(this.products[i].id === id)
                return this.products[i];
        }
        console.log("Not found");
    }


    
}

const manager = new productManager ()
manager.addProduct('titulo', 'descripcion', '30', 'ruta1','10')
manager.addProduct('titulo1', 'descripcion1', '60', 'ruta2','100')
console.log(manager.getProducts());
console.log(manager.getProductById(2));


