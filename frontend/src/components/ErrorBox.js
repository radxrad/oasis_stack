import React, { useState} from "react"


const ErrorBox = (props) => {
    const [error, setError] = useState();

    if (props.message) {
        setError([props.message]);
    }
    if (!error) {
        return null
    }
    return (
        <div className="py-2">
            <div className="alert alert-danger">{error}</div>
        </div>
    )
}

export default ErrorBox
