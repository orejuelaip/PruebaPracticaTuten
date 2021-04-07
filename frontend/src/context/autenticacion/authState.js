import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { 
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null, 
        mensaje: null, 
        cargando: true
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

  
    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if(token) {
            tokenAuth(token);
        }

        try {
            clienteAxios.defaults.headers.common['Accept'] = "application/json";
            clienteAxios.defaults.headers.common['App'] = "APP_BCK";
            const respuesta = await clienteAxios.post(`/user/${email}/token`);
            console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.email
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {

            clienteAxios.defaults.headers.common['Accept'] = "application/json";
            clienteAxios.defaults.headers.common['App'] = "APP_BCK";
            clienteAxios.defaults.headers.common['password'] = datos.password;
            const respuesta = await clienteAxios.put(`/user/${datos.email}`);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: error.response.data,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}
export default AuthState;