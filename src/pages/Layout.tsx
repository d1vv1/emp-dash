import { Link, Outlet } from "react-router-dom";
import './Layout.css'

function Layout() {



    return (
        <div className="container">

            <header>
                <nav>
                    <ul>
                        <li><Link to="/pages">Home</Link></li>
                        <li><Link to="/pages/temp">Temp</Link></li>
                        <li><Link to="/">Logout</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

        </div>
    )
}

export default Layout;
