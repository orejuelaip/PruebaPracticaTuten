import { 
    OBTENER_BOOKINGS,
    BOOKINGS_ERROR,
    BOOKINGS_BUSCAR,
    BOOKINGS_BUSCAR_PRECIO
} from '../../types';


export default (state, action) => {
    switch(action.type) {

        case OBTENER_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
                _bookings: action.payload

            }
        case BOOKINGS_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case BOOKINGS_BUSCAR:
            return {
                ...state,
                _bookings: state.bookings.filter(booking => booking.bookingId.toString().includes(action.payload ))
            }
        case BOOKINGS_BUSCAR_PRECIO:
            return {
                ...state,
                _bookings: state.bookings.filter(booking => booking.bookingPrice.toString().includes(action.payload ))
            }            
        default:
            return state;
    }
}