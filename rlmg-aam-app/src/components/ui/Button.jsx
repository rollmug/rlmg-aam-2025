import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ label, type = 'button', shortLabel, active = false }) => {

    if (type === 'filter') {
        return (
            <>
                <button className={`btn btn-primary btn-filter ${active ? 'active' : ''}`}>
                    <span className={`${shortLabel ? 'hidden md:inline' : 'inline'}`}>{label}</span>
                    {shortLabel && <span className="inline md:hidden">{shortLabel}</span>}
                </button>
            </>
        );
    }

    return (
        <>
            <button className="btn btn-primary">{label}</button>
        </>
    );
};

Button.propTypes = {
    /** The content of the paragraph */
    label: PropTypes.string,
    /** What type of button is it? Normal button or blog/project filter */
    type: PropTypes.oneOf(['button', 'filter']),
    /** for filter btn, is the button the active one? */
    active: PropTypes.bool,
}

Button.defaultProps = {
    label: 'Button text',
    type: 'button',
    active: false,
}