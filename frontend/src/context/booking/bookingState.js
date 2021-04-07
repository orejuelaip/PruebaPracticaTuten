import React, { useReducer } from 'react';

import bookingContext from './bookingContext';
import bookingReducer from './bookingReducer';
import { 
    OBTENER_BOOKINGS, 
    BOOKINGS_ERROR,
    BOOKINGS_BUSCAR,
    BOOKINGS_BUSCAR_PRECIO
} from '../../types';

import clienteAxios from '../../config/axios';


const BookingState = props => {

    const initialState = {
        bookings : [],
        _bookings : [],
        mensaje: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(bookingReducer, initialState)

  

  
    const obtenerProyectos = async (email) => {
        try {
            const token = localStorage.getItem('token');
            const email1 = localStorage.getItem('email');

      
            
            clienteAxios.defaults.headers.common['adminemail'] = email1;
            const resultado = await clienteAxios.get(`/user/contacto@tuten.cl/bookings?current=true`);

            console.log(resultado.data)

            dispatch({
                type: OBTENER_BOOKINGS,
                payload: resultado.data
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: BOOKINGS_ERROR,
                payload: alerta
            })
        }
    }

    const buscarProyectos = async (value) => {
        try {
        
            dispatch({
                type: BOOKINGS_BUSCAR,
                payload: value
            })
 

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: BOOKINGS_ERROR,
                payload: alerta
            })
        }
    }

    const buscarProyectosProPrecio = async (value) => {
        try {
        
            dispatch({
                type: BOOKINGS_BUSCAR_PRECIO,
                payload: value
            })
 

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: BOOKINGS_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <bookingContext.Provider
            value={{
                bookings: state.bookings,
                _bookings: state._bookings,
                mensaje: state.mensaje,
                obtenerProyectos,
                buscarProyectos,
                buscarProyectosProPrecio
            }}
        >
            {props.children}
        </bookingContext.Provider>
        
    )
}

export default BookingState;