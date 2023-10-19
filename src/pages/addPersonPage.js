import Sidebar from '../components/sidebar'
import Form from '../components/form'
import '../css/addPerson.css'

const AddPersonPage = ({}) => {
    return (
        <main>
            <Sidebar />
            <section className='content'>
                <Form />
            </section>
        </main>
    )
}

export default AddPersonPage;