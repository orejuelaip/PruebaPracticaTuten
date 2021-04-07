import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : "https://dev.tuten.cl/TutenREST/rest/",

});

export default clienteAxios;