import { 
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {
    console.log(action)
    switch(action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.sessionTokenBck);
            localStorage.setItem('email', action.payload.email);

            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO: 
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, 
                mensaje: null,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
            return {
                ...state,
                autenticado: false,
                mensaje:  action.payload,
                cargando: false
            }
        default:
            return state;
    }
}