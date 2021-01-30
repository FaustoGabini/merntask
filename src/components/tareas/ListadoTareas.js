import React, {Fragment, useContext} from 'react'
import Tarea from './Tarea'

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
const ListadoTareas = () => {
     // Obtenemos el state el proyecto seleccionado
     const proyectosContext = useContext(proyectoContext);
     const {proyecto, eliminarProyecto} = proyectosContext;

         
    // Obtenemos las tareas del context de tareas
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;


     // Si no hay proyecto seleccionado
     if(proyecto == null) return <h2>Selecciona un proyecto</h2>
     
     // Array destructuring para extraer el proyecto actual seleccionado
     const [proyectoActual] = proyecto


    // Elimina un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.lenght === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
                : <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea                                
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                 }
            </ul>
            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>  

    );
}
 
export default ListadoTareas;