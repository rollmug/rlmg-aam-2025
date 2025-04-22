'use client';
import { useRouter } from 'next/navigation';

import React from 'react';
import { RxCaretLeft } from "react-icons/rx";

export const Button = ({ label, type = 'button', shortLabel, active = false, backButton = false }) => {
    const router = useRouter();

    const handleClick = () => {
        if (backButton) {
            router.back();
        } else {
            return false;
        }
    };
    if (type === 'filter') {
        return (
            <>
                <button className={`btn btn-primary btn-filter ${active ? 'active' : ''}`}>
                    <span className={`${shortLabel ? 'hidden md:inline' : 'inline'}`}>{label}</span>
                    {shortLabel && <span className="inline md:hidden">{shortLabel}</span>}
                </button>
            </>
        );
    }

    return (
        <>
            <button className={`btn btn-primary ${backButton ? 'gap-0' : ''}`} onClick={handleClick}>
                {backButton && <RxCaretLeft className="inline h-6 w-6 -ml-2.5" />}
                {label}
            </button>
        </>
    );
};