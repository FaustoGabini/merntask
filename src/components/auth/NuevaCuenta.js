import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext'; 

const NuevaCuenta = (props) => {

    // Extraemos los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario} = authContext;

    // en caso de que el usuario se haya auntenticado o registrado o sea uin registro 
    // duplicado

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos'); /* Me lleva a la ventana de proyectos */
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar Sesion
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '', 
        password: '',
        confirmar: ''
    });

    // Extreamos de usuario
    const {nombre, email, password, confirmar} = usuario;
    const onChange = (e) => {
        guardarUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario quiere iniciar Sesion

    const onSubmit = e => {
        e.preventDefault();

        // Validarlo q no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' 
        || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return
        }

        // Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return
        }
        // Los dos password sean iguales
        if(password !== confirmar){
            mostrarAlerta('los password son diferentes', 'alerta-error');
            return
        }
        // Pasarlo al action
        registrarUsuario({
            nombre: nombre, 
            email: email,
            password: password
        })
    }

    return ( 
        <div className="form-usuario">
            {alerta ? 
                (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>)
            : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor = "nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"/* Mismo que htmlFor */
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor = "email">Email</label>
                        <input
                            type="email"
                            id="email"/* Mismo que htmlFor */
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor = "password">Password</label>
                        <input
                            type="password"
                            id="password"/* Mismo que htmlFor */
                            name="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor = "confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="password"/* Mismo que htmlFor */
                            name="confirmar"
                            placeholder="Repite tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link 
                    to={'./'}
                    className="enlace-cuenta"
                >Volver a Iniciar Sesion</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;