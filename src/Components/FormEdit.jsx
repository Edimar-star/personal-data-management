import { useEffect, useState } from "react";
import "../CSS/formEdit.css";
import { deleteRequest, putRequest } from '../Utils/requests'

const FormEdit = function ({ userSelected, users, setTableSize, setEditPerson }) {
    const typeDocument = ["Tarjeta de identidad", "Cédula"];
    const genderOptions = ["Masculino", "Femenino", "No Binario", "Prefiero no reportarlo"];

    // Fields
    const [documentType, setDocumentType] = useState(userSelected.documentType);
    const [numberDocument, setNumberDocument] = useState(userSelected._id);
    const [firstName, setFirstName] = useState(userSelected.firstName);
    const [middleName, setMiddleName] = useState(userSelected.middleName);
    const [lastNames, setLastNames] = useState(userSelected.lastNames);
    const [bornDate, setBornDate] = useState(userSelected.bornDate);
    const [gender, setGender] = useState(userSelected.gender);
    const [email, setEmail] = useState(userSelected.email);
    const [phone, setPhone] = useState(userSelected.phone);
    const [picture, setPicture] = useState(userSelected.picture);

    useEffect(() => {
        setDocumentType(userSelected.documentType);
        setNumberDocument(userSelected._id);
        setFirstName(userSelected.firstName);
        setMiddleName(userSelected.middleName);
        setLastNames(userSelected.lastNames);
        setBornDate(userSelected.bornDate);
        setGender(userSelected.gender);
        setEmail(userSelected.email);
        setPhone(userSelected.phone);
        setPicture(userSelected.picture);
    }, [userSelected])

    const setChange = (target) => {
        const MAXIMO_TAMANIO_BYTES = 2000000; // 1MB = 1 millón de bytes

        // si no hay archivos, regresamos
        if (target.files.length <= 0) return;

        // Validamos the first file only
        const archivo = target.files[0];
        if (archivo.size > MAXIMO_TAMANIO_BYTES) {
            const tamanioEnMb = MAXIMO_TAMANIO_BYTES / 1000000;
            alert(`El tamaño máximo es ${tamanioEnMb} MB`);
            target.value = "";
        } else {
            // Create a data URL from the selected image
            const reader = new FileReader();
            reader.onload = (e) => {
                setPicture(e.target.result);
            };
            reader.readAsDataURL(archivo);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            user: {
                documentType, _id: numberDocument, firstName,
                middleName, lastNames, bornDate, gender,
                email, phone
            }, 
            picture: {
                _id: numberDocument,
                image: picture
            }
        }
        const data = await putRequest('/app', payload)
        if (data != "string") {
            setTableSize(users.map(user => user._id == userSelected._id ? data.current : user))
            setEditPerson(false)
        }
    };

    const deleteUser = async (e) => {
        e.preventDefault()
        const data = await deleteRequest(`/app/${userSelected._id}`)
        if (data != "string") {
            setTableSize(users.filter(user => user._id !== userSelected._id))
            setEditPerson(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "0.45em" }}>
            <h3>Editar perfil</h3>
            <div className="row mt-3" style={{ fontSize: "0.9em" }}>
                <div className="form-field">
                    <label className="form-label">Tipo de documento*</label>
                    <select
                        className="form-select"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                    >
                        {typeDocument.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label className="form-label">No. Documento*</label>
                    <input
                        className="form-control"
                        value={numberDocument}
                        disabled
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Nombre*</label>
                    <input
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        maxLength="30"
                        pattern="[a-zA-z]+"
                        required
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">
                        Segundo nombre (Si aplica)
                    </label>
                    <input
                        className="form-control"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        type="text"
                        maxLength="30"
                        pattern="[a-zA-z]*"
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Apellidos*</label>
                    <input
                        className="form-control"
                        value={lastNames}
                        onChange={(e) => setLastNames(e.target.value)}
                        type="text"
                        maxLength="60"
                        pattern="[a-zA-z]+ [a-zA-z]+"
                        required
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Fecha de nacimiento*</label>
                    <input
                        className="form-control"
                        value={bornDate}
                        onChange={(e) => setBornDate(e.target.value)}
                        type="date"
                        required
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Género*</label>
                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        {genderOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label className="form-label">Correo electronico*</label>
                    <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </div>
            </div>

            <div className="container">
                <div className="form-field">
                    <label className="form-label">Celular*</label>
                    <input
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        required
                    />
                </div>
                <div className="row mt-4">
                    <label className="form-label col-3">Foto*</label>
                    <div className="col-12 d-flex">
                        <div className="d-flex align-items-center">
                            <img
                                src={picture}
                                className="img-fluid"
                                style={{ height: "10em" }}
                            />
                        </div>
                        <div className="card d-flex w-100 justify-content-center align-items-center ms-5">
                            <label
                                htmlFor="picture"
                                className="custom-file-upload"
                            >
                                <div
                                    className="input-wrapper"
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="file"
                                        id="picture"
                                        namw="picture"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={(e) => setChange(e.target)}
                                    />
                                    <div className="file-input-label d-flex align-items-center">
                                        <i className="bi bi-plus-circle fs-1 me-2"></i>
                                        <p className="mt-3">Click to Upload</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center" style={{ marginTop: "25px" }}>
                    <button
                        className="btn btn-primary col-2"
                        type="submit"
                        id="button"
                        style={{marginRight: "20px"}}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-danger col-2"
                        type="submit"
                        style={{marginLeft: "20px"}}
                        onClick={deleteUser}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormEdit;
