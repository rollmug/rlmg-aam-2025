'use client';
import { Error } from '@/components/ui/Error';

export default function GlobalError({ error, reset }) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <div className='error-page w-full min-h-screen mx-auto pb-4 lg:pb-10 flex flex-col items-stretch justify-between'>
                    <Error headerText="500 Error" mainText="We hit a snag. We’ll get right to work on it." buttonText="Try Again" buttonURL={`/`} />
                </div>
            </body>
        </html>
    )
}