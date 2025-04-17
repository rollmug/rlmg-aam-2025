import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ element = 'h1', children, ...props }) => {
    switch (element) {
        case "h1":
            return (<h1 className={props.className}>{children}</h1>); break;
        case "h2":
            return (<h2 className={props.className}>{children}</h2>); break;
        case "h3":
            return (<h3 className={props.className}>{children}</h3>); break;
        case "h4":
            return (<h4 className={props.className}>{children}</h4>); break;
        default: return (<h1 className={props.className}>{children}</h1>);
    }
};

Header.propTypes = {
    /** The HTML element */
    element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
}

Header.defaultProps = {
    element: 'h1',
    children: 'Heading Text',
}