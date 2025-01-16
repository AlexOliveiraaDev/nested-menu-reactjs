import React, { useState }  from 'react';
import './NestedMenuItem.css';
import { SquareDashed, Type, Image, ChevronDown, ChevronUp } from 'lucide-react';

function setIcon(icon) {
    switch (icon) {
        case "SquareDashed":
            return <SquareDashed className="menu-item-icon" />;
        case "Type":
            return <Type className="menu-item-icon"/>;
        case "Image":
            return <Image className="menu-item-icon"/>;
        default:
            return <SquareDashed className="menu-item-icon"/>;
    }
}

const NestedMenuItem = ({name, icon, children}) => {

    const [open, switchOpen] = useState(false);
    console.log(children)
    return (
        <div className="menu-item-main-div">
            { children.length > 0 && (open ? <ChevronDown /> : <ChevronUp />)}
            {setIcon(icon)}
            <span>{name}</span>
        </div>
    );
};

export default NestedMenuItem;