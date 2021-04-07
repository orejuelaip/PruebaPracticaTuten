import React, {  useState, useContext, useEffect } from 'react';
import AuthContext from '../context/autenticacion/authContext';
import AlertaContext from '../context/alertas/alertaContext';
import '../styles/Login.css'

const Login = (props) => {
    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;


      // En caso de que el password o usuario no exista
    useEffect(() => {
        if(autenticado) {
            props.history.push('/');
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
       
    }, [mensaje, autenticado, props.history]);


    const [ usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })




    const { email, password } = usuario;

    const onChange = (e)=>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit  = (e)=>{
        e.preventDefault();

        // Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return false;
        }

        // Pasarlo al action
        iniciarSesion({ email, password });

    }

    return (
        <div>
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
            <form className="Login" onSubmit={onSubmit}>
            <h1>Ingresar al Sistema</h1>
            <div className="inputs">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Ingresar el email" autoComplete="off" value={email} onChange={onChange} />
            </div>
            <div className="inputs">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"  placeholder="Ingresar el password" value={password} onChange={onChange} />
            </div>
            <div className="inputs">
                <button type="submit"> Iniciar sesion</button>
            </div>
        </form>
        </div>
    );
};

export default Login;