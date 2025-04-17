'use client';

import React from "react";
import Player from 'next-video/player';
import { ContentSection } from "../layout/ContentSection";
import { AnimatePresence, motion } from "framer-motion";

export const Video = ({ videoSrc, posterImage, blurDataURL, title, captionText }) => {
    const transition = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const variants = {
        hidden: { filter: "blur(10px)", opacity: 0 },
        visible: { filter: "blur(0)", opacity: 1 },
    };

    return (
        <ContentSection>
            <section className={`section-padded full-mobile`}>
                <div className="flex flex-col justify-start items-start gap-4">
                    {title && (
                        <div className="section-padded-mobile-only">
                            <h2 className="my-0">{title}</h2>
                        </div>
                    )}

                    <motion.div className="w-full _aspect-video" initial={variants.hidden} whileInView={variants.visible} transition={transition}>
                        <Player src={videoSrc} poster={posterImage} />
                        {/* blurDataURL={blurDataURL || null} */}
                    </motion.div>

                    {captionText && (
                        <div className="section-padded-mobile-only">
                            <p className="my-0">{captionText}</p>
                        </div>
                    )}
                </div>
            </section>
        </ContentSection>
    );
}