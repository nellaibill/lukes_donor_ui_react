import React from "react";


export const STextBox = props => (
    <div className="col-md-3">
        <label style={{ fontSize: "18px" }}> {props.displayName}</label>
        <input
            type="text"
            className="form-control"
            {...props}
        />
    </div>
)
export const STextBoxNine = props => (
    <div className="col-md-9">
        <label style={{ fontSize: "18px" }}> {props.displayName}</label>
        <input
            type="text"
            className="form-control"
            {...props}
        />
    </div>
)
export const STextBoxSix = props => (
    <div className="col-md-6">
        <label style={{ fontSize: "18px" }}> {props.displayName}</label>
        <input
            type="text"
            className="form-control"
            {...props}
        />
    </div>
)
export const SCheckbox = props => (
    <div className="col-md-2">
        <input style={{ width: "20px", height: "20px" }} type="checkbox" {...props} />
        <label style={{ fontSize: "15px", paddingLeft: "10px", paddingBottom: "10px" }}{...props}>{props.displayName}</label>
    </div>
)

export const SLabel = props => (
    <div className="col-md-2">
        <label style={{ fontSize: "25px", color: "orange", paddingLeft: "10px", paddingBottom: "10px" }}{...props}>{props.displayName}</label>
    </div>
)

export const SDate = props => (
    <div className="col-md-2">
        <label style={{ fontSize: "18px" }}> {props.displayName}</label>
        <input type="date" className="form-control" />
    </div>
)