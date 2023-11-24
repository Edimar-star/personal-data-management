import { useState } from "react";
import "../CSS/form.css";
import { postRequest } from "../Utils/requests";
import { cambiarFormatoFecha, devolverFormatoFecha } from "../Utils/functions"
import Swal from 'sweetalert2'
import compress from 'compress-base64'

const Form = ({ setScreen }) => {
    // Options
    const typeDocument = ["Tarjeta de identidad", "Cédula"];
    const genderOptions = ["Masculino", "Femenino", "No Binario", "Prefiero no reportarlo"];

    // Fields
    const [documentType, setDocumentType] = useState(typeDocument[0]);
    const [numberDocument, setNumberDocument] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastNames, setLastNames] = useState("");
    const [bornDate, setBornDate] = useState("");
    const [gender, setGender] = useState(genderOptions[0]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState(null);

    // Sections
    const sections = [
        {
            label: "Tipo de documento*",
            options: typeDocument,
            value: documentType,
            setValue: setDocumentType,
        },
        {
            label: "No. Documento*",
            type: "text",
            pattern: "[0-9]{10}",
            required: true,
            value: numberDocument,
            setValue: setNumberDocument,
        },
        {
            label: "Nombre*",
            type: "text",
            pattern: "[a-zA-z]+",
            maxlength: "30",
            required: true,
            value: firstName,
            setValue: setFirstName,
        },
        {
            label: "Segundo nombre (Si aplica)",
            type: "text",
            pattern: "[a-zA-z]*",
            maxlength: "30",
            required: false,
            value: middleName,
            setValue: setMiddleName,
        },
        {
            label: "Apellidos*",
            type: "text",
            pattern: "[a-zA-z]+ [a-zA-z]+",
            maxlength: "60",
            required: true,
            value: lastNames,
            setValue: setLastNames,
        },
        {
            label: "Fecha de nacimiento*",
            type: "date",
            required: true,
            value: bornDate,
            setValue: setBornDate,
        },
        {
            label: "Género*",
            options: genderOptions,
            value: gender,
            setValue: setGender,
        },
        {
            label: "Correo electronico*",
            type: "email",
            required: true,
            value: email,
            setValue: setEmail,
        },
        {
            label: "Celular*",
            type: "text",
            pattern: "[0-9]{10}",
            required: true,
            value: phone,
            setValue: setPhone,
        },
        {
            label: "Foto*",
            type: "file",
            id: "picture",
            accept: "image/*",
            required: true,
            value: picture,
            setValue: setPicture,
        },
    ];

    const setChange = (section, target) => {
        if (section.type === "file") {
            const MAXIMO_TAMANIO_BYTES = 2000000; // 1MB = 1 millón de bytes

            // si no hay archivos, regresamos
            if (target.files.length <= 0) return;

            // Validamos el primer archivo únicamente
            const archivo = target.files[0];
            if (archivo.size > MAXIMO_TAMANIO_BYTES) {
                const tamanioEnMb = MAXIMO_TAMANIO_BYTES / 1000000;
                const tam = archivo.size / 1000000;
                Swal.fire(`El tamaño máximo es ${tamanioEnMb} MB y tu imagen pesa ${tam}`, '', 'error')
                target.value = "";
            } else {
                // Create a data URL from the selected image
                const reader = new FileReader();
                reader.onload = (e) => {
                    compress(e.target.result, {
                        width: 200,
                        type: 'image/png',
                        max: 200,
                        min: 20,
                        quality: 0.8
                    }).then(result => {
                        setPicture(result);
                    })
                };
                reader.readAsDataURL(archivo);
            }
        } else {
            section.setValue(target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            user: {
                documentType, _id: numberDocument, firstName, middleName, 
                lastNames, bornDate: cambiarFormatoFecha(bornDate), 
                gender, email, phone
            }, 
            picture: {
                _id: numberDocument,
                image: picture
            }
        }
        const data = await postRequest('/app', payload)
        if (data != "string") {
            return Swal.fire('Usuario creado', '', 'success').then(() => setScreen(0))
        } 
        Swal.fire({ icon: 'error', title: 'Oops...', text: data })
    };

    return (
        <div className="container py-4 px-5" style={{ marginTop: "0.45em" }}>
            <h3>
                <b>Añadir personas</b>
            </h3>
            <form
                onSubmit={handleSubmit}
                className="form-container mt-5"
                style={{ fontSize: "0.9em" }}
            >
                {sections.map((section, index) => (
                    <div key={index} className="form-field">
                        <label className="form-label">{section.label}</label>
                        {section.options ? ( // Select field
                            <select
                                className="form-select"
                                value={section.value}
                                onChange={(e) => setChange(section, e.target)}
                            >
                                {section.options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : section.type === "file" ? ( // Image field
                            <input
                                className="form-control"
                                onChange={(e) => setChange(section, e.target)}
                                id={section.id}
                                type="file"
                                maxLength={section.maxlength}
                                accept={section.accept}
                                pattern={section.pattern}
                                required={section.required}
                            />
                        ) : (
                            // Another type of field
                            <input
                                className="form-control"
                                value={section.value}
                                onChange={(e) => setChange(section, e.target)}
                                id={section.id}
                                type={section.type}
                                maxLength={section.maxlength}
                                accept={section.accept}
                                pattern={section.pattern}
                                required={section.required}
                            />
                        )}
                    </div>
                ))}
                <div className="container row justify-content-center" style={{ marginTop: "20px" }}>
                    <button
                        className="btn btn-primary col-2"
                        type="submit"
                        id="button"
                    >
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
