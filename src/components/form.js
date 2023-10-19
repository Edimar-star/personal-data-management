import { useState } from "react"
import '../css/form.css'

const Form = ({ }) => {
    // Options
    const typeDocument = ["Tarjeta de identidad", "Cédula"]
    const genderOptions = ["Masculino", "Femenino", "No Binario", "Prefiero no reportarlo"]

    // Fields
    const [documentType, setDocumentType] = useState(typeDocument[0])
    const [numberDocument, setNumberDocument] = useState("")
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastNames, setLastNames] = useState("")
    const [bornDate, setBornDate] = useState("")
    const [gender, setGender] = useState(genderOptions[0])
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [picture, setPicture] = useState(null)
    
    // Sections
    const sections = [
        {label: "Tipo de documento*", options: typeDocument, value: documentType, setValue: setDocumentType},
        {label: "No. Documento*", type: "text", pattern: "[0-9]{10}", required: true, value: numberDocument, setValue: setNumberDocument},
        {label: "Nombre*", type: "text", pattern: "[a-zA-z]+", maxlength: "30", required: true, value: firstName, setValue: setFirstName},
        {label: "Segundo nombre (Si aplica)", type: "text", pattern: "[a-zA-z]*", maxlength: "30", required: false, value: middleName, setValue: setMiddleName},
        {label: "Apellidos*", type: "text", pattern: "[a-zA-z]+ [a-zA-z]+", maxlength: "60", required: true, value: lastNames, setValue: setLastNames},
        {label: "Fecha de nacimiento*", "type": "date", required: true, value: bornDate, setValue: setBornDate},
        {label: "Género*", options: genderOptions, value: gender, setValue: setGender},
        {label: "Correo electronico*", type: "email", required: true, value: email, setValue: setEmail},
        {label: "Celular*", type: "text", pattern: "[0-9]{10}", required: true, value: phone, setValue: setPhone},
        {label: "Foto*", type: "file", id: "picture", accept: "image/*", required: true, value: picture, setValue: setPicture}
    ]

    const setChange = (section, target) => {
        if (section.type == "file") {
            const MAXIMO_TAMANIO_BYTES = 2000000; // 1MB = 1 millón de bytes

            // si no hay archivos, regresamos
            if (target.files.length <= 0) return;

            // Validamos el primer archivo únicamente
            const archivo = target.files[0];
            if (archivo.size > MAXIMO_TAMANIO_BYTES) {
                const tamanioEnMb = MAXIMO_TAMANIO_BYTES / 1000000;
                alert(`El tamaño máximo es ${tamanioEnMb} MB`);
                target.value = ""
            } else {
                section.setValue(target.files[0])
            }
        } else {
            section.setValue(target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            documentType, numberDocument,
            firstName, middleName,
            lastNames, bornDate,
            gender, email,
            phone, picture
        })
    }

    return (
        <form className="row justify-content-center align-items-center" onSubmit={handleSubmit}>
            <div className="row justify-content-center align-items-center">
                <h3 className="col-10">Añadir personas</h3>
            </div>
            {sections.map((section, index) => {
                return (<section className="col-12 col-sm-6" key={index}>
                    <div className="input-group-lg mb-3">
                        <label className="form-label">{section.label}</label>
                        {section.options ? ( // Select field
                            <select className="form-select form-select-lg mb-3" value={section.value} onChange={e => setChange(section, e.target)}>{section.options.map((option, index) => <option key={index} value={option}>{option}</option>)}</select>
                        ) : section.type == "file" ? ( // Image field
                            <input className="form-control" onChange={e => setChange(section, e.target)} id={section.id} type={section.type} maxLength={section.maxlength} 
                                accept={section.accept} pattern={section.pattern} required={section.required}/>
                        ) : ( // Another type of field
                            <input className="form-control" value={section.value} onChange={e => setChange(section, e.target)} id={section.id} type={section.type} 
                                maxLength={section.maxlength} accept={section.accept} pattern={section.pattern} required={section.required}/>
                        )}
                    </div>
                </section>)
            })}
            <button className="btn btn-outline-primary col-2" type="submit">Aceptar</button>
        </form>
    )
}

export default Form;