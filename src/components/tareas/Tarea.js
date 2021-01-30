import React, {useContext} from 'react'
import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
const Tarea = ({tarea}) => {

    // Obtenemos la funcion del context de tareas
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas,actualizarTarea,  guardarTareaActual } = tareasContext;

    // Obtenemos el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;
    
    const [proyectoActual] = proyecto

    // Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id); // Eliminamos la tarea
        obtenerTareas(proyectoActual.id);
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea=>{
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ? 
                    (
                        <button
                            type="button"
                            className='completo'
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className='incompleto'
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;