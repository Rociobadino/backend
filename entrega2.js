const fs = require('fs');
const { json } = require('stream/consumers');

class ProductManager {
    constructor(path) {
        this.path = path;
    }


    addProduct = async (product) => {
        const products = await this.getProducts()
        const id = this.#generarID(products)
        const newProduct = ({id,...product})
        products.push(newProduct)
        await fs.promises.writeFile (this.path, JSON.stringify(products))
        return newProduct

    }

    getProducts = async () => {
        if (fs.existsSync(this.path)){
        const infoProducts = await fs.promises.readFile (this.path, 'utf-8')
        const products = JSON.parse(infoProducts)
        return products
        }
        else{
            console.log('erorr')
            return []
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts()
        const product = products.find(p=>p.finde === id)
        if (product){
            return product
        }
        else {
            return 'Este producto no existe'
        }
    }

    eliminarProducts = async () => {
    if (fs.existsSync(this.path)){
        await fs.promises.unlink(this.path)
        return 'Archivo eliminado'
    } else {
        return 'Archivo incorrecto, no existe'
    }

    }

    eliminarProductsById = async (id) => {
        const products = await this.getProducts()
        const arrayProductsNuevos = products.filter(p => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(arrayProductsNuevos))
    }

    updateProducts = async (id,obj) =>{
        const products = await this.getProducts()
        const indexProducts = products.findIndex (p=>p.id === id)
        if(products === -1 ){
            return 'Producto no encontrado'
        }
        const productUpdate = {...products[indexProducts],...obj}
        products.splice(indexProducts,1,productUpdate)
        await fs.promises.writeFile(this.path,JSON.stringify(products))

    }

    //products.splice=decis en que indice queres pararte, cuantos productos eliminar y que producto actualizar.

    #generarID = (products) =>{
        let id
        if (products.length === 0 ){
            id = 1
        }
        else{
           id = products[products.length-1].id +1
        }
        return id

    }

}

const product1 ={
    title: 'mochila',
    description: 'verde',
    price: '50',
    code: '23673',
    thumbnail: 'link',
    stock: '3',
}
const product2 ={
    title: 'cartuchera',
    description: 'rosa con brillos',
    price: '80',
    code: '236gb73',
    thumbnail: 'link',
    stock: '5',
}

async function prueba (){
const manager = new ProductManager('Products.json')
const products = await manager.getProducts()
// await manager.addProduct(product2)
console.log(products)
// await manager.updateProducts(9,{price:'4'})
await manager.eliminarProductsById(5)
}



prueba()