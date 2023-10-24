import "../CSS/table.css";

const TableContent = ({ headValues, data, setEditPerson }) => {
    const EditPerson = function (e, user) {
        e.preventDefault();
        setEditPerson(user);
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
                    {data.map((user, index) => (
                        <tr key={index} onClick={(e) => EditPerson(e, user)}>
                            <td>{user.documentType}</td>
                            <td>{user.numberDocument}</td>
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
