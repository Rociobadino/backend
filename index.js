class productManager {

    constructor(){
        this.products = []

    }
    getProducts() {
        return this.products

    }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {
          id: this.#idGenerator(),
          title,
          description,
          price,
          code: this.#codeGenerator(),
          thumbnail,
          stock,
        }
         this.products.push(product)

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
        // if(id >= this.products.length){
        //     console.log("Not found");
        // }
        // else{
        //     return this.products[id];
        // }

        for(let i=0; i < this.products.length; i++){
            if(this.products[i].id === id)
                return this.products[id];
        }
        console.log("Not found");

    //     try{
    //         return this.products[id];
    //     }
    //     catch(error){
    //         console.log("Not found");
    //     }
    }


    
}

const manager = new productManager ()
manager.addProduct('titulo', 'descripcion', '30')
console.log(manager);