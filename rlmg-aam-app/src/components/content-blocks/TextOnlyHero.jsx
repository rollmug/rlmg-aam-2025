import React from "react";
import PropTypes from 'prop-types';
import { Button } from "../ui/Button";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { ContentSection } from "../layout/ContentSection"

export const TextOnlyHero = ({ headerText, mainText, buttonText, buttonURL, alignment, className, containerHashValue }) => {
    const cleanText = DOMPurify.sanitize(mainText);
    // pt-12 md:pt-16 lg:pt-24 pb-20 md:pb-24 lg:pb-40

    // console.log('containerHashValue', containerHashValue);
    return (
        <ContentSection className={`text-only-hero`} id={containerHashValue}>
            <section className={`w-full bg-neutral pt-12 md:pt-16 lg:pt-24 ${alignment === 'center' ? 'pb-20 md:pb-24 lg:pb-40' : 'pb-12 md:pb-16 lg:pb-32'}  slanted-bottom ${className || ''}`}>
                <div className={`section-padded`}>
                    <div className={`flex flex-col justify-start ${alignment === 'center' ? 'items-start lg:items-center' : 'items-start'} lg:justify-center gap-4 `}>
                        <h2 className="my-0 text-neutral-content">{headerText}</h2>
                        <div className={`mt-0 mb-2 leading-normal font-bold apply-neutral text-neutral-content max-w-full md:max-w-lg ${alignment === 'center' ? 'lg:text-center':'self-stretch lg:max-w-xl'} `} dangerouslySetInnerHTML={{ __html: cleanText }} />
                        {buttonURL && buttonText && (
                            <p className="my-0">
                                <Link href={buttonURL}>
                                    <Button label={buttonText} />
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </ContentSection>
    );
}

TextOnlyHero.propTypes = {
    headerText: PropTypes.string,
    mainText: PropTypes.string,
    buttonText: PropTypes.string,
    buttonURL: PropTypes.string,
    className: PropTypes.string,
}

TextOnlyHero.defaultProps = {
    headerText: 'Let’s Connect!',
    mainText: `Idea for a new project? Question about a new technology? Just want to chat? <strong>We would love to hear from you!</strong>`,
    buttonText: 'Work With Us',
    buttonURL: '/',
    className: '',
}