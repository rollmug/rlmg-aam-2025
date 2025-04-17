import React from 'react';
import PropTypes from 'prop-types';

export const Paragraph = ({ children, ...props }) => {
    return (
        <>
            <p className={props.className}>{children}</p>
        </>
    );
};

Paragraph.propTypes = {
    /** The content of the paragraph */
    children: PropTypes.string,
}

Paragraph.defaultProps = {
    children: 'We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions. Provoke joy, wonder, debate. We open doors and cast light on who we are as humans, where we’ve been, where we’re going. We bring people together and explore what connects us. We create meaningful moments, and we do it with a sense of purpose every step of the way.',
}