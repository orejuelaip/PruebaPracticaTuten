import React, {  useState, useContext, useEffect } from 'react';
import AuthContext from '../context/autenticacion/authContext';
import BookingContext from '../context/booking/bookingContext';
import AlertaContext from '../context/alertas/alertaContext';

import '../styles/Home.css'
 

const Home = (props) => {

    const [ filtro, guardarFiltro] = useState({
        tipoFiltro :'1',
        filtrar:''
    })

    const { tipoFiltro, filtrar } = filtro;

    const email = localStorage.getItem('email');

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, usuarioAutenticado } = authContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const bookingContext = useContext(BookingContext);
    const {  obtenerProyectos,_bookings,buscarProyectos,buscarProyectosProPrecio } = bookingContext;

    useEffect(() => {

        usuarioAutenticado();
        obtenerProyectos();

        if(!autenticado) {
            props.history.push('/login');
        }
 
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
    }, [mensaje, autenticado, props.history]);

 
    const fecha = (valor) => {
        return new Intl.DateTimeFormat('es-CL').format(valor) 
    }

    const formatearNmber = (numero)=>{
        return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLF"}).format(numero);
    }

    const onChange= (e)=>{
        guardarFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        })

        if (tipoFiltro === "1") {
            buscarProyectos(e.target.value)
            
        }else  {
            buscarProyectosProPrecio(e.target.value)

        }

    }

    const onSearch= (e)=>{
        if (tipoFiltro === "1") {
            buscarProyectos(e.target.value)
            
        }else  {
            buscarProyectosProPrecio(e.target.value)

        }
    }

    return (
        <div className="Home">
            { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }
       
            <div>
                <select name="tipoFiltro" onChange={onChange}>
                    <option value="1">BookingID</option>
                    <option value="2">Precio  </option>
                </select>
                <input type="text" name="filtrar" value={filtrar} onChange={ onChange} /> 
                <button onClick={onSearch}>Filtrar</button>
            </div>
            <br/>   
            <table>
                <thead>
                    <tr>
                        <th>BookingId</th>
                        <th>Cliente</th>
                        <th>Fecha de Creación</th>
                        <th>Dirección</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _bookings.map(booking => (
                            <tr>  <td>{booking.bookingId}</td> <td>{booking.tutenUserClient.firstName} {booking.tutenUserClient.lastName} </td> <td>{fecha(booking.bookingTime)}</td> <td>{booking.locationId.streetAddress} </td><td>{formatearNmber(booking.bookingPrice)}</td></tr>
                        ))  
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Home;