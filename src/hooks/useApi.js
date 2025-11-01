import { useState, useCallback } from 'react';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Custom Hook para manejar peticiones API con estados de carga y error.
 * @returns {object} { data, error, isLoading, execute }
 */
export const useApi = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Función para ejecutar la petición API.
     * @param {string} method - Método HTTP ('get', 'post', 'put', 'delete').
     * @param {string} url - La ruta específica del endpoint (ej: '/auth/register').
     * @param {object} [body=null] - El cuerpo de la petición para POST/PUT.
     * @param {string} [token=null] - Token JWT para rutas protegidas.
     */
    const execute = useCallback(async(method, url, body = null, token = null) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios({
                method: method,
                url: `${API_BASE_URL}${url}`,
                data: body,
                headers: headers, withCredentials: true, 
            });

            setData(response.data);
            setIsLoading(false);
            return { success: true, data: response.data };

        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message ?
                err.response.data.message :
                'Error de conexión o servidor.';
            setError(errorMessage);
            setIsLoading(false);
            return { success: false, error: errorMessage };
        }
    }, []);

    return { data, error, isLoading, execute };
};