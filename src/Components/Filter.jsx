import React, { useState } from "react";
import "../CSS/filter.css";

const Filter = function () {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [newFilter, setNewFilter] = useState({ property: "", value: "" });
    const [inputValue, setInputValue] = useState(""); // Single input value

    const properties = [
        "numberDocument",
        "firstName",
        "middleName",
        "lastNames",
        "bornDate",
        "email",
        "phone",
    ];

    const genders = ["Masculino", "Femenino", "No Binario"];
    const documentTypes = ["Cedula", "Ti"];

    const handlePropertyChange = (e) => {
        const selectedProperty = e.target.value;
        setNewFilter({ property: selectedProperty, value: "" });
        setInputValue(selectedProperty); // Set placeholder value
    };

    const addFilter = () => {
        if (newFilter.property && newFilter.value) {
            setSelectedFilters([...selectedFilters, newFilter]);
            setNewFilter({ property: "", value: "" });
        }
    };

    const removeFilter = (index) => {
        const updatedFilters = [...selectedFilters];
        updatedFilters.splice(index, 1);
        setSelectedFilters(updatedFilters);
    };

    const handleApplyFilters = () => {};

    return (
        <div>
            <div>
                <h3>
                    <b>Usuarios registrados</b>
                </h3>
            </div>

            <div className="d-flex">
                {selectedFilters.map((filter, index) => (
                    <div
                        className="d-flex align-items-center justify-content-center me-5 mt-4"
                        key={index}
                    >
                        <p
                            id="click"
                            onClick={() => removeFilter(index)}
                        >
                            {filter.property}: {filter.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="row my-4">
                <div className="col-2">
                    <select
                        className="form-select"
                        value={newFilter.property}
                        onChange={handlePropertyChange}
                    >
                        <option value="">Genero...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="No binario">No binario</option>
                        <option value="Prefiero no decirlo">
                            Prefiero no decirlo
                        </option>
                    </select>
                </div>
                <div className="col-2">
                    <select
                        className="form-select"
                        value={newFilter.property}
                        onChange={handlePropertyChange}
                    >
                        <option value="">Tipo de documento...</option>
                        <option value="TI">Tarjeta de identidad</option>
                        <option value="CC">Cedula de ciudadania</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <select
                        className="form-select"
                        value={newFilter.property}
                        onChange={handlePropertyChange}
                    >
                        <option value="">Filtros avanzados...</option>
                        {properties.map((property, index) => (
                            <option key={index} value={property}>
                                {property}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={inputValue}
                        value={newFilter.value}
                        id="filter-input"
                        onChange={(e) =>
                            setNewFilter({
                                ...newFilter,
                                value: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="col-3 d-flex justify-content-around">
                    <button
                        className="btn btn-primary h-100"
                        onClick={addFilter}
                    >
                        Añadir filtro
                    </button>
                    <button
                        className="btn btn-primary h-100 ms-2"
                        onClick={handleApplyFilters}
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
