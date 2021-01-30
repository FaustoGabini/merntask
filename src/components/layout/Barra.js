import React, {useEffect, useContext} from 'react'
import AuthContext from '../../context/autenticacion/authContext'
import ProyectoContext from '../../context/proyectos/proyectoContext'


const Barra = () => {

    // Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion} = authContext;

    const proyectoContext = useContext(ProyectoContext);
    const { proyectoNull} = proyectoContext;

    
    useEffect(()=>{
        usuarioAutenticado();
    // eslint-disable-next-line
    }, [])

    const handleClick  = () => {
        proyectoNull();
        cerrarSesion();
    }

    return ( 
        <header className="app-header">
            {usuario ? 
                <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
            : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={handleClick}
                >Cerrar Sesion</button>
            </nav>
        </header>
     );
}
 
export default Barra;