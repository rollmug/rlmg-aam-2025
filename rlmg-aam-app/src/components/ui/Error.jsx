import React from 'react';
import { Button } from "../ui/Button";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

export const Error = ({ headerText, mainText, buttonText, buttonURL, className }) => {
    headerText = headerText || '404: Page Not Found';
    mainText = mainText || 'An unexpected error has occurred.';
    buttonText = buttonText || null;
    buttonURL = buttonURL || null;
    className = className || 'error-page';

    const cleanText = DOMPurify.sanitize(mainText);

    return (
        <>
            <section className={`w-full bg-neutral pt-12 md:pt-16 lg:pt-24 pb-20 md:pb-24 lg:pb-40 slanted-bottom ${className}`}>
                <div className={`section-padded`}>
                    <div className="flex flex-col justify-start lg:justify-center items-start lg:items-start gap-4">
                        <h2 className="my-0 text-neutral-content">{headerText}</h2>
                        <div className="mt-0 mb-2 leading-normal font-bold apply-neutral text-neutral-content max-w-lg" dangerouslySetInnerHTML={{ __html: cleanText }} />
                        <p className="my-0">
                            {(buttonURL && buttonText) && (
                                <Link href={buttonURL}>
                                    <Button label={buttonText} />
                                </Link>
                            )}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}