
import React from 'react';

export const renderInput = ({ input, id, label, type, meta: { error, touched } }) => {
    return <div className="row">
        <div className="input-field col s12">
            <input {...input} id={id} type={type || "text"} className="validate" />
            <label>{label}</label>
            <p className="red-text text-darken-2">{touched && error}</p>
        </div>
    </div >
}