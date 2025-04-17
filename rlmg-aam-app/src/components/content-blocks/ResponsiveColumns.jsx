import React from "react";
import PropTypes from 'prop-types';
import { Button } from "../ui/Button";
import { ContentSection } from "../layout/ContentSection";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";

export const ResponsiveColumns = ({ headerText, subheaderText, textBlocks, buttonText, buttonURL, standout = false, className }) => {
    // const transition = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    // const variants = {
    //     hidden: { filter: "blur(10px)", transform: "translateY(2rem)", opacity: 0 },
    //     visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    // };

    let gridClass;
    if (textBlocks && textBlocks.length >= 1) {
        switch (textBlocks.length) {
            case 1: gridClass = 'grid-cols-1'; break;
            case 2: gridClass = 'lg:grid-cols-2'; break;
            case 3: gridClass = 'sm:grid-cols-2 lg:grid-cols-3'; break;
        }
    }

    return (
        <>
            <ContentSection standout={standout}>
                <section className={`section-padded full-mobile ${className}`}>
                    <div className="flex flex-col justify-start gap-2">

                        <div className="section-padded-mobile-only flex flex-col justify-start gap-1 lg:gap-2">
                            {headerText && (<h2 className="my-0">{headerText}</h2>)}
                            {subheaderText && (<h3 className="my-0">{subheaderText}</h3>)}
                            {(headerText || subheaderText) && <div className="mb-2 lg:mb-1">
                                <hr />
                            </div>}
                            {textBlocks && textBlocks.length > 0 && (
                                <div className="column-text flex flex-wrap lg:flex-nowrap flex-row gap-0 lg:gap-10 justify-between items-stretch content-stretch">
                                    {textBlocks.map((block, index) => {
                                        const cleanText = DOMPurify.sanitize(block.content);
                                        return (
                                            <div key={index} className={`max-w-prose ${index > 0 ? 'lg:w-1/3' : ''} basis-full lg:basis-auto`} dangerouslySetInnerHTML={{ __html: cleanText }} />
                                        )
                                    })}
                                </div>
                            )}
                            {buttonText && buttonURL && (
                                <div className="my-4 lg:mt-2">
                                    <Button label={buttonText} url={buttonURL} className="" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </ContentSection>
        </>
    );
};

ResponsiveColumns.propTypes = {
    headerText: PropTypes.string,
    subheaderText: PropTypes.string,
    textBlocks: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
    })),
    buttonText: PropTypes.string,
    buttonURL: PropTypes.string,
    standout: PropTypes.bool,
    className: PropTypes.string,
};
