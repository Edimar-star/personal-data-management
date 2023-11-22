import Form from '../Components/Form'

const AddPersonPage = ({ setScreen }) => {
    return (
        <main>
            <section className='content'>
                <Form setScreen={setScreen} />
            </section>
        </main>
    )
}

export default AddPersonPage;