import { useEffect, useState } from "react";
import "../CSS/table.css";
import Swal from 'sweetalert2'
import { devolverFormatoFecha } from '../Utils/functions'

const TableContent = ({ headValues, data }) => {
    const [logs, setLogs] = useState(data)
    const userProperties = {
        "_id": { key: "Numero de documento", type: "text" },
        "documentType": { key: "Tipo de documento", type: "text" },
        "firstName": { key: "Primer nombre", type: "text" },
        "middleName": { key: "Segundo nombre", type: "text" },
        "lastNames": { key: "Apellidos", type: "text"},
        "bornDate": { key: "Fecha de nacimiento", type: "date" },
        "gender": { key: "Genero", type: "text" },
        "email": { key: "correo", type: "email" },
        "phone": { key: "Telefono", type: "text" }
    };
    const logProperties = {
        "date": { key: "Fecha", type: "date" },
        "action": { key: "Acción", type: "text" },
        "description": { key: "Descripción" }
    };

    const showDetails = (log) => {
        const userInfo = Object.keys(userProperties).map(property => {
            const { key, type } = userProperties[property]
            return `
                <div class="mb-3">
                    <label for="static${property}" class="form-label text-start" style="font-weight: normal;">${key}</label>
                    <input type="${type}" readonly class="form-control" id="static${property}" value="${log.user[property]}">
                </div>
            `
        }).join("\n")
        const logInfo = Object.keys(logProperties).map(property => {
            const { key, type } = logProperties[property]
            if (property == "description") {
                return `
                    <div class="mb-3">
                        <label for="static${property}" class="form-label text-start" style="font-weight: normal;">${key}</label>
                        <textarea readonly class="form-control" style="resize: none; height: auto;" id="static${property}" rows="3">${log.description}</textarea>
                    </div>
                `
            }
            return `
                <div class="mb-3">
                    <label for="static${property}" class="form-label text-start" style="font-weight: normal;">${key}</label>
                    <input type="${type}" readonly class="form-control" id="static${property}" value="${type == "date" ? devolverFormatoFecha(log[property]) : log[property]}">
                </div>
            `
        }).join("\n")
        const form = `
            <form style="height: 70vh; overflow-y: auto;">
                <h2 style="font-weight: bold;">Usuario</h2>
                ${userInfo}
                <h2 style="font-weight: bold;">Log</h2>
                ${logInfo}
            </form>
        `
        Swal.fire({
            title: "Información detallada",
            html: form,
            showCloseButton: true
        })
    }

    useEffect(() => {
        setLogs(data)
    }, [data])

    return (
        <div className="p-3">
            <table className="table custom-table table-hover table">
                <thead>
                    <tr>
                        {headValues.map((value, key) => (
                            <th key={key} scope="col">
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index} onClick={() => showDetails(log)}>
                            <td>{log.user.documentType}</td>
                            <td>{log.user._id}</td>
                            <td>{log.user.firstName}</td>
                            <td>{log.date}</td>
                            <td>{log.action}</td>
                            <td>{log.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableContent;
