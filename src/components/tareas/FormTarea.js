import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    // Extraemos si el proyecto esta activo o null
    const {proyecto} = proyectosContext;


      // Obtenemos la funcion del context de tareas
      const tareasContext = useContext(tareaContext);
      const {errortarea, tareaseleccionada,  agregarTarea, validarTarea, 
        obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else{
            guardarTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada]);

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // extreemos el nombre del proyecto
    const { nombre } = tarea;

    // Si no hay proyecto seleccionado
    if(proyecto == null) return null
     
    // Array destructuring para extraer el proyecto actual seleccionado
    const [proyectoActual] = proyecto

    // leemos los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea, 
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        
        // validamos
        if(nombre.trim() === ''){
            validarTarea(); // Pasa a true el error
            return
        }

        // Revisa si es edicion o si es nueva tarea
        if(tareaseleccionada === null){
            /// tarea nueva            
            // Agregamos una nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else{

            // Editamos la tarea
            actualizarTarea(tarea);

            // limpia la tareaseleccionada del state
            limpiarTarea();
        }

        // Obtenemos y filtramos las tareas del proyectp actual
        obtenerTareas(proyectoActual.id);

        // reiniciamos el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value = {nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errortarea ? 
                <p className="mensaje error">El nombre de la tarea es obligatorio</p>
            : null}
        </div>
     );
}
 
export default FormTarea;