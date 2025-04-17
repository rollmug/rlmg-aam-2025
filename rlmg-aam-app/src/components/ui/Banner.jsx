'use client';

import React, { useContext, useState, useRef, forwardRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from 'next/navigation'
import Image from "next/image";
import PropTypes from 'prop-types';
import BackgroundPlayer from 'next-video/background-player';
import { Button } from "./Button";
import DOMPurify from "isomorphic-dompurify";
import { twMerge } from 'tailwind-merge'; // import { clsx } from 'clsx';
import { BlogFilterContext, BlogTopicContext } from "@/app/blogFilterContext";
import Link from "next/link";
import { SubscribeModal } from "./Footer";
import { HiArrowLongRight } from "react-icons/hi2";
import { SocialMediaIcons } from "./SocialMediaIcons";

export const Banner = ({ bannerTextPlacement, bannerDisplayType, bannerHeader, socialLinks, bannerSubheader, bannerCallToActionLink, bannerCallToActionText, bannerImage, bannerImgAltTag, bannerBGVideo, blogButtons, categoryLabel, isBlog = false, globalSettings }) => {
    // console.log('globalSettings', globalSettings);
    let justifyContent, bannerGradient, videoClass, classNames = [];
    switch (bannerTextPlacement) {
        case 'top':
            videoClass = 'place-top';
            justifyContent = 'justify-start pt-[13%] sm:pt-[14%] md:pt-[10%] lg:pt-[10%] xl:pt-[7%]';
            // bannerGradient = 'bg-gradient-to-b h-2/3 lg:h-2/3 w-full top-0';
            bannerGradient = 'bg-gradient-to-br h-full lg:h-full w-full top-0';
            break;
        case 'center':
            videoClass = 'place-center';
            justifyContent = 'justify-center';
            bannerGradient = 'bg-gradient-to-r h-full w-2/3 lg:w-2/3 left-0';
            break;
        case 'bottom':
            videoClass = 'place-bottom';
            justifyContent = 'justify-end pt-[10%]';
            bannerGradient = 'bg-gradient-to-t h-2/3 lg:h-2/3 w-full bottom-0';
            break;
        default:
            videoClass = 'place-top';
            justifyContent = 'justify-start pt-[15%] sm:pt-[12%] md:pt-[10%] lg:pt-[7%] xl:pt-[5%]';
            bannerGradient = 'bg-gradient-to-b h-2/3 lg:h-2/3 w-full top-0';
    }

    if (isBlog) {
        classNames = [
            `min-h-[calc(50vh)] pb-14 pt-4 md:pt1 sm:pb-24`, // mobile portrait
            `landscape:min-h-[calc(60vh)] landscape:pb-20`, // mobile landscape
            `landscape:lg:pb-24 landscape:lg:pt-0`, // tablet landscape
            `landscape:xl:pb-24` // desktop
        ];
    } else {
        classNames = [
            `${(bannerImage || bannerBGVideo) ? 'min-h-[calc(70vh)]' : 'min-h-[calc(50vh)]'} pb-14 sm:pb-24`, // mobile portrait
            `landscape:min-h-[calc(80vh)] landscape:pb-20`, // mobile landscape
            `landscape:lg:pb-32`, // tablet landscape
            `landscape:xl:pb-36` // desktop
        ];
    }

    const className = classNames.join(' ');
    const classesOutput = twMerge(`${justifyContent} ${className}`);
    const imgClasses = 'object-cover object-center lg:object-center transition-all ease-in-out duration-1000 opacity-0';

    if (bannerDisplayType === 'contact') {
        return (
            <ContactTypeBanner bannerHeader={bannerHeader} socialLinks={socialLinks} globalSettings={globalSettings} />
        );
    }

    if (bannerImage && bannerBGVideo) {
        return (
            <>
                <div className={`banner-block relative bg-neutral slanted w-full flex flex-col ${classesOutput}`}>
                    <div className="absolute inset-0 z-0 slanted">
                        <Image src={bannerImage} fill quality={100} sizes="100vw" alt={bannerImgAltTag} className={`${imgClasses} md:hidden`} onLoad={(event) => event.target.classList.remove("opacity-0")} />
                        <AnimatePresence>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeIn", duration: 1 }} className="absolute inset-0 z-0 slanted">
                                <BackgroundPlayer src={bannerBGVideo} poster={bannerImage} className={`bg-video-banner !hidden md:!grid`} />
                            </motion.div>
                        </AnimatePresence>
                        {(bannerHeader || bannerSubheader) && (
                            <div className={`${bannerGradient} from-black to-transparent absolute opacity-70`}></div>
                        )}
                    </div>

                    <OverlayText
                        bannerHeader={bannerHeader}
                        bannerSubheader={bannerSubheader}
                        bannerCallToActionLink={bannerCallToActionLink}
                        bannerCallToActionText={bannerCallToActionText}
                        bannerTextPlacement={bannerTextPlacement} />
                </div>
            </>
        );
    }

    return (
        <>
            <div className={`banner-block relative bg-neutral slanted w-full flex flex-col ${classesOutput}`}>
                {(bannerImage && !bannerBGVideo) && (
                    <div className="absolute inset-0 z-0">
                        <Image src={bannerImage} fill quality={100} sizes="100vw" alt={bannerImgAltTag} className={`${imgClasses}`} onLoad={(event) => event.target.classList.remove("opacity-0")} />
                        {(bannerHeader || bannerSubheader) && (
                            <div className={`${bannerGradient} from-black to-transparent absolute opacity-70`}></div>
                        )}
                    </div>
                )}

                <OverlayText
                    bannerHeader={bannerHeader}
                    bannerSubheader={bannerSubheader}
                    bannerCallToActionLink={bannerCallToActionLink}
                    bannerCallToActionText={bannerCallToActionText}
                    bannerTextPlacement={bannerTextPlacement}
                    blogButtons={blogButtons}
                    categoryLabel={categoryLabel} />
            </div>

        </>
    );
}

const ContactTypeBanner = ({ bannerHeader, socialLinks, globalSettings }) => {
    const [formData, setFormData] = useState({ fname: '', lname: '', email: '' });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const openModalRef = useRef();
    const emailInputRef = useRef();

    const transitionShow = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const transitionHide = { duration: .1, ease: [.25, .1, .25, 1], delay: 0 };

    const variants = {
        hidden: { filter: "blur(0)", transform: "translateY(2rem)", opacity: 0, transition: transitionHide },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1, transition: transitionShow },
    };

    let additionalEmailAddresses = [];
    if (globalSettings && globalSettings.additionalEmailAddresses && Array.isArray(globalSettings.additionalEmailAddresses) && globalSettings.additionalEmailAddresses.length > 0) {
        additionalEmailAddresses = globalSettings.additionalEmailAddresses.map(email => email.orgContactEmails_id);
        // console.log('additionalEmailAddresses', additionalEmailAddresses);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('getname');
        openModalRef.current.showModal();
        const formData = new FormData(e.target);

        setFormData({
            name: formData.get('fname'),
            email: formData.get('email')
        });
    }

    useEffect(() => {
        if (submissionStatus === 'success') {
            emailInputRef.current.value = '';
        }
    }, [submissionStatus]);

    const classNames = [
        `min-h-[calc(50vh)] pb-14 pt-4 md:pt1 sm:pb-24`, // mobile portrait
        `landscape:min-h-[calc(60vh)] landscape:pb-20`, // mobile landscape
        `landscape:lg:pb-24 landscape:lg:pt-0`, // tablet landscape
        `landscape:xl:pb-24` // desktop
    ];

    const justifyContent = 'justify-center';
    const className = classNames.join(' ');
    const classesOutput = twMerge(`${justifyContent} ${className}`);

    return (
        <>
            <div className={`banner-block relative bg-gradient-to-t from-primary _via-primary to-info md:bg-gradient-to-tr md:from-info md:via-info md:to-primary slanted-bottom w-full flex flex-col ${classesOutput}`}>
                <motion.div className={`section-padded my-4 md:my-12 z-[2]`} variants={variants} initial="hidden" whileInView="visible">

                    {bannerHeader && (
                        <h1 className={`smaller md:max-w-sm !mb-8 md:!mb-16`}>{bannerHeader}</h1>
                    )}

                    <section className={`flex flex-col md:flex-row md:items-start md:justify-start gap-10 md:gap-20`}>
                        {/* Subscribe */}
                        <div className={`flex flex-col gap-8 md:gap-16 md:w-1/2`}>
                            <div className={`flex flex-col gap-4 text-primary-content md:max-w-sm`}>
                                <div className="flex flex-col gap-4 max-w-full">
                                    <h3 className="-mb-2 md:my-0 text-primary-content">Subscribe to Our Newsletter</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-row items-center justify-between gap-2 border-b border-base-300 border-opacity-40 mb-6 lg:mb-4">
                                            <div className="flex-1">
                                                <input ref={emailInputRef} name="email" type="email" placeholder="Enter Email*" className=" border-0 outline-none outline-0 banner-input input input-sm input-ghost bg-transparent p-1 pl-0 h-auto w-full max-w-full" required />
                                            </div>
                                            <button type="submit" className="btn btn-ghost text-right !px-1">
                                                <HiArrowLongRight className="text-accent w-6 h-6" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <h3 className="my-0 text-primary-content">Follow Us</h3>
                                    <SocialMediaIcons links={socialLinks} className="my-2" size="medium" color="white" />
                                </div>
                            </div>
                        </div>

                        {/* Additional Email Addresses */}
                        <div className={`text-primary-content md:w-1/2`}>
                            {additionalEmailAddresses.length > 0 && (
                                <div className="flex flex-col gap-4 md:gap-6">
                                    {additionalEmailAddresses.map((email, index) => {
                                        return (
                                            <div key={index} className="flex flex-col md:gap-1">
                                                <strong className="font-bold text-sm md:text-base">{email.label}</strong>
                                                <a href={`mailto:${email.emailAddress}`} className="self-start text-accent font-extrabold text-lg md:text-xl md:underline">{email.emailAddress}</a>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>
                </motion.div>
            </div>

            <SubscribeModal ref={openModalRef} submissionStatus={submissionStatus} setSubmissionStatus={setSubmissionStatus} formData={formData} setFormData={setFormData} />
        </>
    );
};

const OverlayText = ({ bannerHeader, bannerSubheader, bannerCallToActionLink, bannerCallToActionText, bannerTextPlacement, blogButtons, categoryLabel }) => {
    let cleanSubheader;
    if (bannerSubheader) {
        cleanSubheader = DOMPurify.sanitize(bannerSubheader);
    }

    if (blogButtons && Array.isArray(blogButtons) && blogButtons.length > 0) {
        return (
            <div className={`section-padded z-[2] ${bannerTextPlacement === 'bottom' ? 'lg:mb-4 xl:mb-6' : ''}`}>
                {bannerHeader && <h1 className={`${bannerSubheader ? 'smaller' : ''} md:max-w-screen-sm lg:max-w-screen-md lg:-translate-x-1`}>{bannerHeader}</h1>}
                {bannerSubheader && <p className="text-base-100 leading-normal font-bold lg:text-lg md:max-w-screen-sm lg:max-w-screen-md" >{bannerSubheader}</p>}
                <BlogButtons blogButtons={blogButtons} categoryLabel={categoryLabel} />
            </div>
        );
    }

    return (<div className={`section-padded z-[2] ${bannerTextPlacement === 'bottom' ? 'lg:mb-4 xl:mb-6' : ''}`}>
        {bannerHeader && <h1 className={`${bannerSubheader ? 'smaller' : ''} md:max-w-screen-sm lg:max-w-screen-md lg:-translate-x-1`}>{bannerHeader}</h1>}
        {bannerSubheader && <p className="text-base-100 leading-normal font-bold lg:text-lg md:max-w-screen-sm lg:max-w-screen-md" >{bannerSubheader}</p>}
        {(bannerCallToActionLink && bannerCallToActionText) && <Button label={bannerCallToActionText} />}
    </div>)
};

const rootDir = (path) => {
    const pathParts = path.split("/");
    const directory = pathParts[1];
    return `/${directory}`;
}

const BlogButtons = ({ blogButtons, categoryLabel }) => {
    const pathname = usePathname()
    const { filter, setFilter } = useContext(BlogFilterContext); //BlogTopicContext
    const blogFilters = useContext(BlogTopicContext);
    // console.log('blogFilters:', blogFilters);

    useEffect(() => {
        if (typeof blogFilters === 'object' && blogFilters !== null) {
            setFilter(blogFilters.category);
        } else {
            setFilter(blogButtons[0].slug);
        }

        // setFilter(blogButtons[0].slug);
    }, []);

    const handleClick = (event, slug) => {
        return true;
        event.preventDefault();
        setFilter(slug);
    };

    return (
        <div>
            {/* <span className="text-primary">{filter}</span> */}
            <div className="flex flex-row flex-wrap justify-start gap-2 md:gap-4 pt-1 md:pt-4">
                {blogButtons.map((button, index) => {
                    return <Link key={index} onClick={(event) => { handleClick(event, button.slug) }} slug={button.slug} href={`${rootDir(pathname)}/c/${button.slug}`} as={`${rootDir(pathname)}/c/${button.slug}`}>
                        <Button label={button.categoryName} shortLabel={button.buttonShortName} type="filter" active={filter === button.slug} />
                    </Link>
                })}
            </div>
        </div>
    )
}

Banner.propTypes = {
    bannerTextPlacement: PropTypes.oneOf(['top', 'center', 'bottom']),
    bannerHeader: PropTypes.string,
    bannerSubheader: PropTypes.string,
    bannerCallToActionLink: PropTypes.string,
    bannerCallToActionText: PropTypes.string,
    bannerImage: PropTypes.string,
};

Banner.defaultProps = {
    bannerTextPlacement: 'center',
    bannerHeader: 'Banner Header',
    bannerSubheader: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
}