import { useEffect, useState } from "react";
import "../CSS/table.css";
import { getRequest } from "../Utils/requests";

const TableContent = ({ headValues, data, setEditPerson, setUserSelected }) => {
    const [users, setUsers] = useState(data)

    useEffect(() => {
        setUsers(data)
    }, [data])

    const EditPerson = async function (e, user) {
        e.preventDefault();
        setEditPerson(true)
        const image = await getRequest(`/app/${user._id}`, {})
        const value = Object.assign({}, user)
        if (typeof image != "string") { value.picture = image.current.image }
        setUserSelected(value);
    };

    return (
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
                    {users.map((user, index) => (
                        <tr key={index} onClick={(e) => EditPerson(e, user)}>
                            <td>{user.documentType}</td>
                            <td>{user._id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.middleName}</td>
                            <td>{user.lastNames}</td>
                            <td>{user.bornDate}</td>
                            <td>{user.gender}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableContent;
