export const getEnvironments = () => {
    return {
        VITE_APP_DOCKER_PORT: import.meta.env.VITE_APP_DOCKER_PORT,
        VITE_APP_URL: import.meta.env.VITE_APP_URL,
    };
};

export const cambiarFormatoFecha = (fechaEnFormatoYYYYMMDD) => {
    // Parsear la cadena de fecha en formato "yyyy-mm-dd"
    const partesFecha = fechaEnFormatoYYYYMMDD.split("-");
    const fecha = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);

    // Obtener las partes de la fecha
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
    const anio = fecha.getFullYear();

    // Formatear la fecha como "dd/mm/yyyy"
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;

    return fechaFormateada;
}

export const devolverFormatoFecha = (fechaEnFormatoDDMMYYYY) => {
    // Parsear la cadena de fecha en formato "dd/mm/yyyy"
    const partesFecha = fechaEnFormatoDDMMYYYY.split("/");
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10);
    const anio = parseInt(partesFecha[2], 10);
  
    // Crear un objeto Date con las partes de la fecha
    const fecha = new Date(anio, mes - 1, dia);
  
    // Formatear la fecha como "yyyy-mm-dd"
    const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
  
    return fechaFormateada;
  }