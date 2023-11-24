import { useEffect, useState } from "react";
import { getRequest } from "../Utils/requests";
import TableContent from "../Components/TableContentTransaction";
import Filter from "../Components/Filter";

const LogsPersonPage = () => {
    const logsTableSize = 10;
    const [logs, setLogs] = useState([])
    const [page, setPage] = useState(1);
    const [datosCargados, setDatosCargados] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [filters, setFilters] = useState({})

    const properties = {
        "user._id": { key: "Numero de documento", type: "text", pattern: "[0-9]{10}" },
        "user.documentType": { key: "Tipo de documento", options: ["Tarjeta de identidad", "Cédula"] },
        "date": { key: "Fecha", type: "date" },
        "action": { key: "Acción", options: ["Escritura", "Lectura", "Actualización", "Eliminación"] },
    };

    const init = async (page, filters) => {
        const startIndex = (page - 1) * logsTableSize + 1
        const endIndex = startIndex + logsTableSize - 1
        const data = await getRequest(`/log/${startIndex}/${endIndex}`, filters)

        if (typeof data !== "string") {
            const logs = data.logs
            setTotalPages(Math.ceil(data.total / logsTableSize))
            setLogs(logs)
            setPage(page)
        }
    }

    useEffect(() => {
        if(datosCargados) return;

        init(1, filters)
        setDatosCargados(true)
    }, [logs])

    const loadNextPage = () => {
        if (page < totalPages) {
            init(page + 1, filters)
            setPage(page + 1);
        }
    };

    const loadPreviousPage = () => {
        if (page > 1) {
            init(page - 1, filters)
            setPage(page - 1);
        }
    };

    return (
        <main>
            <section className="container" id="records">
                <div className="container">
                    <div className="container">
                        <Filter setFilters={setFilters} init={init}
                                properties={properties} init_value={"user._id"}
                                title={"Historial de logs"}></Filter>
                    </div>
                    <TableContent
                        headValues={[
                            "Tipo de documento",
                            "Numero de documento",
                            "Nombre",
                            "Fecha",
                            "Acción",
                            "Descripción"
                        ]}
                        data={logs}
                    />
                    <div className="row justify-content-center">
                        <button
                            className="btn btn-primary col-1"
                            onClick={loadPreviousPage}
                            disabled={page === 1}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                            className="btn btn-primary col-1"
                            onClick={loadNextPage}
                            style={{ marginLeft: "5px" }}
                            disabled={page === totalPages}
                        >
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default LogsPersonPage;