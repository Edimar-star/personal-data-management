import TableContent from "../Components/TableContent";
import { users } from "../Utils/test";
import { useState } from "react";

const EditPersonPage = () => {
    const [editPerson, setEditPerson] = useState(false);

    const EditPerson = function (e, user) {
        e.preventDefault();
        setEditPerson(false);
    };

    return (
        <div>
            {editPerson ? (
                <section>
                    <button
                        className="btn btn-primary px-5 m-3"
                        onClick={(e) => EditPerson(e)}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    
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
