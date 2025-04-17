'use client';
import React, { useEffect, useState } from "react";
import { ContentSection } from "../layout/ContentSection";
import { AnimatePresence, motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import PropTypes from 'prop-types';
import Link from "next/link";

export const ColumnText = ({ headerText, columnSize, columnText, standout = false, className, collapseLongContentOnMobile }) => {
    const { width } = useWindowSize();
    let gridClass, useShowMore = false;
    columnSize = Number(columnSize) || 1;
    if (columnText && columnText.length >= 1) {
        switch (columnSize) {
            case 1: gridClass = 'grid-cols-1'; break;
            case 2: gridClass = 'lg:grid-cols-2'; break;
            case 3: gridClass = 'grid-cols-1 md:grid-cols-3'; break;
            case 4: gridClass = 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; break;
            default: gridClass = 'grid-cols-1';
        }
    }

    if (collapseLongContentOnMobile && columnText.length > 1) {
        useShowMore = true;
    }

    const transitionShow = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const transitionHide = { duration: .1, ease: [.25, .1, .25, 1], delay: 0 };

    // const variants = {
    //     hidden: { filter: "blur(0)", clipPath: 'inset(0px 100% 0px 0px)', opacity: 0, transition: transitionHide },
    //     visible: { filter: "blur(0)", clipPath: 'inset(0px 0% 0px 0px)', opacity: 1, transition: transitionShow },
    // };

    const variants = {
        hidden: { filter: "blur(0)", transform: "translateY(2rem)", opacity: 0, transition: transitionHide },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1, transition: transitionShow },
    };

    const [showMore, setShowMore] = useState(false);

    const handleShowMore = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
    }

    return (
        <>
            <ContentSection standout={standout}>
                <section className={`section-padded ${className}`}>
                    <div className="flex flex-col justify-start gap-5">
                        {headerText && (<h2 className="my-0">{headerText}</h2>)}

                        {columnText && columnText.length > 0 && (
                            <div>
                                <div className={`equal-colum-text grid ${gridClass} gap-0 md:gap-16 xl:gap-20`}>
                                    {columnText.map((block, index) => {
                                        const cleanText = DOMPurify.sanitize(block.content);
                                        return (
                                            <motion.div key={index} variants={variants} initial="hidden" whileInView="visible">
                                                <div className={`${index > 0 && useShowMore ? `${showMore ? 'block' : 'hidden'} md:block` : ''}`} dangerouslySetInnerHTML={{ __html: cleanText }} />
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {useShowMore && (
                                    <Link href="#" className="btn btn-link inline-block md:hidden !px-0 !text-base" onClick={handleShowMore}>{showMore ? 'See Less' : 'See More'}</Link>
                                )}

                            </div>
                        )}
                    </div>
                </section>
            </ContentSection>
        </>
    );
}

ColumnText.propTypes = {
    headerText: PropTypes.string,
    columnSize: PropTypes.number,
    columnText: PropTypes.array,
    className: PropTypes.string,
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};