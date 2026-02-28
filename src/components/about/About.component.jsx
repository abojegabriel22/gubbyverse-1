
const AboutComponent = () => {
    return (
        <>
           	<div className="container">
                <div className="row">
                    <div className="col-12 text-center three-buttons-padding">
                        <div className="d-flex border border-4 border-dark button-group mx-auto">
                            <button className="btn three-buttons flex-fill border-end"><i className="bi bi-pencil-square me-2"></i> Apply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container exclusive-access">
                <div className="row">
                    <div className="col-12 text-center mt-5">
                        <button className="exclusive-btn">WL</button>
                        <h1 className="pt-4 gubbyverse-text wl-text">wl <span className="text-gold">application</span></h1>
                        <p className="exclusive-p pt-3">
                            Complete all tasks to apply
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutComponent