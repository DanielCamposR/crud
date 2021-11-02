import React, { useState } from "react";
import uniqid from 'uniqid'

const Listadonombres = () =>{

    const [nombre, setNombre] = useState('')
    const [listadonombres, setListadonombres] = useState([])
    const [modoEdicion, setmodoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState (null)

    const addNombre = (e) =>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('El campo esta vacio, al igual que mi existencia')
            return
        }
        const nuevoNombre ={
            id:uniqid(),
            tituloNombre:nombre
        }
        setListadonombres([...listadonombres, nuevoNombre])
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) =>{
        const nuevoArray = listadonombres.filter( item => item.id !== id)
        setListadonombres(nuevoArray)
    }

    const editarNombre = (item) =>{
        setmodoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editar = (e) =>{
        e.preventDefault()
        const nuevoArray = listadonombres.map(item => item.id === id ? {id:id, tituloNombre:nombre}: item)
        setListadonombres(nuevoArray)
        setmodoEdicion(false)
        setNombre('')
    }

    return(
        <div>
            <h2>Aplicacion crud Basica</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listadonombres.map( item =>
                                <li key={item.id} 
                                    className="list-group-item">{item.tituloNombre}
                                    <button className="btn btn-danger float-right"
                                            onClick={() => {deleteNombre(item.id)}}> 
                                            Borrar 
                                    </button>
                                    <button className="btn btn-info float-right"
                                            onClick={() => {editarNombre(item)}}> 
                                            Editar 
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">

                    <h2>Formulario para añadir nombres</h2>

                    <form onSubmit={modoEdicion ? editar : addNombre} 
                          className= "form-group">

                        <input  onChange={(e)=>{setNombre(e.target.value)}} 
                                className="form-control mb-3" 
                                type="text" 
                                placeholder="Introducce el nombre"
                                value={nombre}/>

                        <input  className="btn btn-info btn-block" 
                                type="submit" 
                                value={modoEdicion ? 'Editar nombre' : 'Registrar'}/>

                    </form>
                    {
                        error != null ?(
                            <div className= "alert-danger">
                                {error}
                            </div>
                        ):
                        (
                            <div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Listadonombres