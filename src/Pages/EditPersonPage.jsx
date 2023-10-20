import TableContent from "../Components/TableContent";
import FormEdit from "../Components/FormEdit";
import { users } from "../Utils/test";
import { useState } from "react";

const EditPersonPage = () => {
    const [editPerson, setEditPerson] = useState(false);

    const EditPerson = function (e) {
        e.preventDefault();
        setEditPerson(false);
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
                <section>
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
                            "Imagen",
                        ]}
                        data={users}
                        setEditPerson={setEditPerson}
                    />
                </section>
            )}
        </div>
    );
};

export default EditPersonPage;
