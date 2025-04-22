'use client';
import React from "react";

export const PageLayout = ({ children, className }) => {
    return (
        <>
            <main className={`page w-full min-h-screen mx-auto ${className} flex flex-col items-stretch justify-between`}>
                <section className="page-content grow">
                    {children}
                </section>
            </main>
        </>
    );
}