import React, { useState, useEffect } from "react";
import TableContent from "../Components/TableContent";
import FormEdit from "../Components/FormEdit";
import Filter from "../Components/Filter";
import { getRequest } from "../Utils/requests";

const EditPersonPage = () => {
    const usersTableSize = 10;
    const [editPerson, setEditPerson] = useState(false);
    const [userSelected, setUserSelected] = useState({})
    const [page, setPage] = useState(1);
    const [tableSize, setTableSize] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [filters, setFilters] = useState({})
    const [datosCargados, setDatosCargados] = useState(false)

    const init = async (page, payload) => {
        const startIndex = (page - 1) * usersTableSize + 1
        const endIndex = startIndex + usersTableSize - 1
        const data = await getRequest(`/app/${startIndex}/${endIndex}`, payload)
        if (typeof data !== "string") {
            const users = data.current.users
            setTotalPages(Math.ceil(data.current.total / usersTableSize))
            setTableSize(users)
            setPage(page)
        }
    }

    useEffect(() => {
        if (datosCargados) return;

        init(1, {})
        setDatosCargados(false)
    }, [datosCargados])

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
        <div>
            {editPerson ? (
                <section className="container py-4 px-5">
                    <button
                        className="btn btn-primary px-5 mb-4 mt-1"
                        onClick={() => setEditPerson(false)}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <FormEdit setTableSize={setTableSize} setEditPerson={setEditPerson} 
                        users={tableSize} userSelected={userSelected} />
                </section>
            ) : (
                <section className="container" id="records">
                    <div className="container">
                        <div className="container">
                            <Filter setFilters={setFilters} init={init} />
                        </div>
                        <TableContent
                            headValues={[
                                "Tipo de documento",
                                "No. Documento",
                                "Primer nombre",
                                "Segundo nombre",
                                "Apellidos",
                                "Fecha de nacimiento",
                                "Genero",
                                "Email",
                                "Celular",
                            ]}
                            data={tableSize}
                            setEditPerson={setEditPerson}
                            setUserSelected={setUserSelected}
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
            )}
        </div>
    );
};

export default EditPersonPage;
