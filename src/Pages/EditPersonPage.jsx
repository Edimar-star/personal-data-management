import React, { useState } from "react";
import TableContent from "../Components/TableContent";
import FormEdit from "../Components/FormEdit";
import Filter from "../Components/Filter";
import { users } from "../Utils/test";

const EditPersonPage = () => {
    const usersTableSize = 10;
    const [editPerson, setEditPerson] = useState(false);
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(users.length / usersTableSize);

    const getTableSlice = () => {
        const startIndex = (page - 1) * usersTableSize;
        const endIndex = Math.min(startIndex + usersTableSize, users.length);
        return users.slice(startIndex, endIndex);
    };

    const EditPerson = function (e) {
        e.preventDefault();
        setEditPerson(false);
    };

    const loadNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const loadPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const applyFilters = () => {
        let filteredUsers = users; // Initialize with all users
        
        selectedFilters.forEach((filter) => {
            filteredUsers = filteredUsers.filter((user) => {
                // Implement your filtering logic here
                if (filter.property === "gender") {
                    return user.gender === filter.value;
                }
                if (filter.property === "documentType") {
                    return user.documentType === filter.value;
                }
                // Add more filtering conditions for other properties
                return true;
            });
        });
        
        setUsersTable(filteredUsers);
    };
    

    return (
        <div>
            {editPerson ? (
                <section className="container py-4 px-5">
                    <button
                        className="btn btn-primary px-5 mb-4 mt-1"
                        onClick={(e) => EditPerson(e)}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <FormEdit editPerson={editPerson}></FormEdit>
                </section>
            ) : (
                <section className="container" id="records">
                    <div className="container">
                        <div className="container">
                            <Filter applyFilters={applyFilters}></Filter>
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
                            data={getTableSlice()}
                            setEditPerson={setEditPerson}
                        />
                        <div className="container pb-5">
                            <button
                                className="btn btn-primary h-100"
                                onClick={loadPreviousPage}
                                disabled={page === 1}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>
                            <button
                                className="btn btn-primary h-100 ms-2"
                                onClick={loadNextPage}
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
