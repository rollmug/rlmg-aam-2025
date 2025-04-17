'use client';

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ContentSection } from "../layout/ContentSection";

export const SingleImage = ({ image, width, height, alt }) => {
    const transition = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const variants = {
        hidden: { filter: "blur(10px)", transform: "translateY(2rem)", opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    return (
        <ContentSection>
            <section className={`section-padded`}>
                <div className="flex justify-center items-center">
                    {image && (
                        <AnimatePresence>
                            <motion.div initial={variants.hidden} whileInView={variants.visible} transition={transition} className="relative">
                                <Image src={image} alt={alt} width={width} height={height} className="relative" />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>
        </ContentSection>
    );
}