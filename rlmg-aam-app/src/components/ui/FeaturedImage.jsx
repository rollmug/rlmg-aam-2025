'use client';

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import PropTypes from 'prop-types';

const testImg = '/storybook-imgs/Biomuseo_Panorama_2_2014.jpg';

export const FeaturedImage = ({ src, alt, width = 450, height }) => {
    // width is the max width of the image, so it doesn't stretch
    return (
        <>
            <AnimatePresence>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeIn", duration: .2, delay: .25 }} className="relative max-w-max">
                    <motion.div initial={{ rotate: 0 }} whileInView={{ rotate: 6 }} transition={{ ease: "easeIn", duration: .5, delay: .5 }} className="absolute w-full h-full bg-base-200 top-0 _rotate-6" />
                    <motion.div initial={{ rotate: 6 }} whileInView={{ rotate: 0 }} transition={{ ease: "easeIn", duration: .5, delay: .5 }}>
                        <Image src={src} alt={alt} width={width} height={height} className="relative _h-auto" />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

FeaturedImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
}

// FeaturedImage.defaultProps = {
//     src: testImg,
//     alt: 'Image alt text',
//     width: 450,
// }