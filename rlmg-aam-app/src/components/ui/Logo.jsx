import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';
import Image from "next/image";

export const Logo = ({ img, orgName }) => {
    return (
        <AnimatePresence>
            {img ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeIn", duration: 1 }}
                    className="inline-flex max-h-full w-20 h-full items-center justify-center"
                >
                    <Image src={img} alt="RLMG Logo" width={200} height={100} className="object-contain max-h-full" />
                </motion.div>
            ) : <span className="text-lg">{orgName}</span>
            }
        </AnimatePresence>
    )
}

Logo.propTypes = {
    img: PropTypes.string,
    orgName: PropTypes.string,
}