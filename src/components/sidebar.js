import '../css/sidebar.css'
import img from '../images/Octocat.png'

const Sidebar = ({}) => {
    const options = [
        {name: "Home", href: "/"},
        {name: "Add", href: "/add"},
        {name: "Logs", href: "/logs"}
    ]

    return (
        <section className="sidebar">
            <div className="sidebar-logo">
                <a href="/">
                    <img src={img} width={"50"} />
                    <span>PDM</span>
                </a>
            </div>
            <ul className="menu-options">
                {options.map((op, index) => {
                    return <li key={index}>
                        <a href={op.href}>
                            <img src={img} width={"50"} />
                            <span>{op.name}</span>
                        </a>
                    </li>
                })}
            </ul>
        </section>
    )
}

export default Sidebar