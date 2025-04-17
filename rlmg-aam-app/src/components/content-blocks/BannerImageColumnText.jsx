'use client';

import React from "react";
import PropTypes from 'prop-types';
import { Button } from "../ui/Button";
import { ContentSection } from "../layout/ContentSection";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

export const BannerImageColumnText = ({ headerText, subheaderText, textBlocks, image, imageAltTag, buttonText, buttonURL, standout = false, className }) => {
    const transition = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const variants = {
        hidden: { filter: "blur(10px)", transform: "translateY(2rem)", opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    const transitionShow = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const transitionHide = { duration: .1, ease: [.25, .1, .25, 1], delay: 0 };

    // const textVariants = {
    //     hidden: { filter: "blur(0)", clipPath: 'inset(0px 100% 0px 0px)', opacity: 0, transition: transitionHide },
    //     visible: { filter: "blur(0)", clipPath: 'inset(0px 0% 0px 0px)', opacity: 1, transition: transitionShow },
    // };

    const textVariants = {
        hidden: { filter: "blur(10px)", transform: "translateY(2rem)", opacity: 0, transition: transitionHide },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1, transition: transitionShow },
    };

    let gridClass;
    if (textBlocks && textBlocks.length >= 1) {
        switch (textBlocks.length) {
            case 1: gridClass = 'grid-cols-1'; break;
            case 2: gridClass = 'lg:grid-cols-2'; break;
            case 3: gridClass = 'sm:grid-cols-2 lg:grid-cols-3'; break;
        }
    }

    const isAnchorLink = buttonURL && buttonURL.startsWith('#');

    return (
        <>
            <ContentSection standout={standout} className={`banner-image-columns`}>
                <section className={`section-padded full-mobile ${className}`}>
                    <div className="flex flex-col justify-start gap-2">
                        <div className={`aspect-video bg-base-200 flex justify-center items-center mb-4 lg:mb-8 w-full max-w-full overflow-hidden`}>
                            {image ? (
                                <AnimatePresence>
                                    <motion.div initial={variants.hidden} whileInView={variants.visible} transition={transition} className="relative w-full h-full max-w-full border">
                                        <Image src={image} fill alt={imageAltTag} className={`object-cover`} />
                                    </motion.div>
                                </AnimatePresence>
                            ) : 'Image goes here'}
                        </div>

                        <div className="section-padded-mobile-only flex flex-col justify-start gap-2 lg:gap-2">
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

                                            <motion.div key={index} variants={textVariants} initial="hidden" whileInView="visible">
                                                <div className="max-w-[50ch] basis-full lg:basis-auto" dangerouslySetInnerHTML={{ __html: cleanText }} />

                                                {(index === 0 && buttonText && buttonURL) && (
                                                    <div className="hidden md:block my-4 lg:mt-6">
                                                        <Link href={buttonURL}>
                                                            <Button label={buttonText} />
                                                        </Link>
                                                    </div>
                                                )}
                                            </motion.div>

                                        )
                                    })}
                                </div>
                            )}
                            {buttonText && buttonURL && (
                                <div className="block md:hidden my-4 lg:mt-2">
                                    <Link href={buttonURL}>
                                        <Button label={buttonText} />
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                </section>
            </ContentSection>
        </>
    );
}

BannerImageColumnText.propTypes = {
    headerText: PropTypes.string,
    subheaderText: PropTypes.string,
    textBlocks: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.node.isRequired,
    })),
    image: PropTypes.string,
    buttonText: PropTypes.string,
    buttonURL: PropTypes.string,
    standout: PropTypes.bool,
    className: PropTypes.string,
}