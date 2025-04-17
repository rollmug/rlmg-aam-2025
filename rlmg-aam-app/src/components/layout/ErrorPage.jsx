'use client';
import React from 'react';
import { Error } from '../ui/Error';
import { PageLayout } from './PageLayout';

export const ErrorPage = ({ pageLayoutParams, headerText, mainText, buttonText, buttonURL, className }) => {
    return (
        <PageLayout {...pageLayoutParams}>
            <Error headerText={headerText} mainText={mainText} buttonText={buttonText} buttonURL={buttonURL} className={className} />
        </PageLayout>
    );
};