import React from "react";

interface AddButtonProps{
    onClick: () => void;
}
const AddButton: React.FunctionComponent<AddButtonProps> = ({onClick}) => {
    const temporaryStyle: React.CSSProperties ={
        width: 250, height: 125,
        fontSize: 40,
    }
    return (
        <button style = {temporaryStyle} className = "addButton" onClick={onClick}>
            +
        </button>
    );
}


export default AddButton;