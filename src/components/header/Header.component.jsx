
function HeaderComponent() {
    return (
        <>
            <header className="border-bottom-header fixed-top">
                <nav className="navbar navbar-expand-lg bg-white-nav">
                    <div className="container-fluid px-md-5">
                        <a className="navbar-brand gubbyverse-text" href="#">
                            <img src="/gubby-logo.png" alt="Logo" width="60" height="65" className="d-inline-block align-text-top"/>
                            <span className="padding-tops">
                                Gubby<span className="text-golds">verse</span>
                            </span>
                        </a>
                        <div>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default HeaderComponent