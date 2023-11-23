import { useEffect, useState } from "react";
import { getRequest } from "../Utils/requests";
import FilterLog from "../Components/FilterLog";

const LogsPersonPage = () => {
    const usersTableSize = 10;
    const [logs, setLogs] = useState([])
    const [page, setPage] = useState(1);
    const [datosCargados, setDatosCargados] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [filters, setFilters] = useState({})
    const headValues = ["Usuario", "fecha", "Accion", "Descripción"]

    const init = async (page, filters) => {
        const startIndex = (page - 1) * usersTableSize + 1
        const endIndex = startIndex + usersTableSize - 1
        const data = await getRequest(`/log/${startIndex}/${endIndex}`, filters)
        console.log(data)
        if (typeof data !== "string") {
            const logs = data.logs
            setTotalPages(Math.ceil(data.total / usersTableSize))
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
            <section className='content container' id="records">
            <FilterLog setFilters={setFilters} init={init} />
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
                                <tr key={index}>
                                    <td>{log.user_id}</td>
                                    <td>{log.date}</td>
                                    <td>{log.action}</td>
                                    <td>{log.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
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
        </main>
    )
}

export default LogsPersonPage;