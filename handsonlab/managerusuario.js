const fs = require('fs')
const { mainModule } = require('process')


const path = 'Usuarios.json'


class ManagerUsuarios {

    consultarUsuarios = async () => {
        if (fs.existsSync(path)){
            const infoArchivo = await fs.promises.readFile (path, 'utf-8')
            const usuarios = JSON.parse(infoArchivo)
            return usuarios
        }
        else {
            console.log('archivo no existe')
            return []
        }

    }


    crearUsuario = async (usuario) => {
        const usuarios = await this.consultarUsuarios()
        let id
        if( usuarios.length === 0){
            id = 1
        } else {
           id = usuarios [usuarios.length-1].id +1
        }
        const nuevoUsuario = ({id,...usuario})
        usuarios.push (nuevoUsuario)
        await fs.promises.writeFile (path, JSON.stringify(usuarios))
        return nuevoUsuario
    }
//vamos a trabajar lo asincrono asiq no usamos .then .catch
}


const usuario1 = {
    nombre : 'Rochi',
    apellido :'Badino',
}

const usuario2 = {
    nombre : 'Diego',
    apellido :'Orlando',
}


async function prueba(){
    const manager = new ManagerUsuarios()
    await manager.crearUsuario(usuario1)
    const usuarios = await manager.consultarUsuarios()
    console.log(usuarios)

} 

prueba()