import React from 'react';
import {Link} from "react-router-dom";
import { getFormattedDate } from '../../helpers/dateFormat'

function KlubyFormInput(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)

    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required &&
                <span
                    className="symbol-required">*</span>
                //<abbr title="required" className="errors-text" aria-label="required">*</abbr>
                    }

            </label>
            <input
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default KlubyFormInput