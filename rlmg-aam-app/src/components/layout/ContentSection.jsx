import React from "react";
import PropTypes from 'prop-types';

export const ContentSection = ({ children, className, standout = false, template, id }) => {
    // slanted-reverse

    let classes;
    if(standout && template === 'dark') {
        classes = 'bg-neutral slanted-bottom pt-16 lg:pt-24 pb-24 lg:pb-28'
    } else if(standout) {
        classes = 'bg-base-200 py-5 lg:py-16 mb-0 lg:mb-12'
    } else {}

    return (
        <>
            <section id={id || null} className={`content-section w-full mx-auto ${classes || ''} ${className || ''}`}>
                {children}
            </section>
        </>
    );
}