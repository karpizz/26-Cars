import React from 'react'

export default function Toast({ message }) {

    return (
        <div className="position-fixed top-5 start-50 translate-middle-x p-3" style={{ zIndex: "11" }}>
            <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    )
}
