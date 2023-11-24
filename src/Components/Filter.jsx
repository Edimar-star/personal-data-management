import React, { useState } from "react";
import "../CSS/filter.css";
import { cambiarFormatoFecha } from "../Utils/functions"

const Filter = ({ setFilters, init, properties, init_value, title }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [newFilter, setNewFilter] = useState(init_value);
    const [value, setValue] = useState("")

    const handlePropertyChange = (e) => {
        const selectedProperty = e.target.value;
        setNewFilter(selectedProperty);
        setValue("")
        if (properties[selectedProperty].options) setValue(properties[selectedProperty].options[0])
    };

    const addFilter = (e) => {
        e.preventDefault()
        if (newFilter && value.length > 0) {
            selectedFilters[newFilter] = (properties[newFilter].type == "date") ? cambiarFormatoFecha(value) : value
            setSelectedFilters(selectedFilters);
            setValue("")
            const f = Object.keys(properties).filter(x => !Object.keys(selectedFilters).includes(x))[0]
            if (properties[f].options) setValue(properties[f].options[0])
            setNewFilter(f)
        }
    };

    const removeFilter = (filter) => {
        const values = {}
        Object.keys(selectedFilters).forEach(sf => {
            if (sf != filter) values[sf] = selectedFilters[sf]
        })
        setSelectedFilters(values)
    };

    const handleApplyFilters = async () => {
        setFilters(selectedFilters)
        init(1, selectedFilters)
    };

    return (
        <form onSubmit={addFilter}>
            <div>
                <h3>
                    <b>{title}</b>
                </h3>
            </div>

            <div className="d-flex mb-3">
                {Object.keys(selectedFilters).map((filter, index) => (
                    <div
                        className="d-flex align-items-center justify-content-center me-5 mt-4"
                        key={index}
                    >
                        <a id="click" onClick={() => removeFilter(filter)}>
                            {properties[filter].key}: {selectedFilters[filter]}
                        </a>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-4">
                    <select
                        className="form-select"
                        value={newFilter}
                        onChange={handlePropertyChange}
                    >
                        {Object.keys(properties).filter(x => !Object.keys(selectedFilters).includes(x)).map((property, index) => (
                            <option key={index} value={property}>
                                {properties[property].key}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-5">
                    {properties[newFilter].options ? (
                        <select
                            className="form-select"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >
                            {properties[newFilter].options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            className="form-control"
                            value={value}
                            id="filter-input"
                            onChange={(e) => setValue(e.target.value)}
                            type={properties[newFilter].type}
                            maxLength={properties[newFilter].maxlength}
                            pattern={properties[newFilter].pattern}
                            required
                        />
                    )}
                </div>
                <div className="col-3 d-flex justify-content-around">
                    <button
                        type="submit"
                        className="btn btn-primary h-100"
                    >
                        Añadir filtro
                    </button>
                    <button
                        className="btn btn-primary h-100 ms-2"
                        type="button"
                        onClick={handleApplyFilters}
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Filter;
