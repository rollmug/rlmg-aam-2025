'use client';

import React, { useContext, useEffect } from "react"; // useState, useRef, forwardRef,
import { usePathname } from 'next/navigation';
import { Button } from "./Button";
import { BlogFilterContext, BlogTopicContext } from "@/app/blogFilterContext";
import Link from "next/link";
import { Logo } from "./Logo";

export const Banner = ({ blogButtons, categoryLabel }) => {
    return (
        <>
            <div className="bg-neutral w-full sticky bottom-0 shadow-[0px_-5px_12px_1px_#00000025]">
                <div className={`section-padded relative bg-neutral p-6 flex flex-row items-center justify-between`}>
                    <Link href="/" className="flex">
                        <Logo img="/logo.png" orgName="RLMG" />
                    </Link>
                    <OverlayText blogButtons={blogButtons} categoryLabel={categoryLabel} />
                </div>
            </div>

        </>
    );
}

const OverlayText = ({ blogButtons, categoryLabel }) => {
    if (blogButtons && Array.isArray(blogButtons) && blogButtons.length > 0) {
        return (
            <div className={`z-[2]`}>
                <BlogButtons blogButtons={blogButtons} categoryLabel={categoryLabel} />
            </div>
        );
    }

    return (<div className={`z-[2]}`}>
        <p className="text-white">Error: no category buttons found.</p>
    </div>)
};

const rootDir = (path) => {
    const pathParts = path.split("/");
    const directory = pathParts[1];
    return `/${directory}`;
}

const BlogButtons = ({ blogButtons }) => {
   // const pathname = usePathname();
    const pathname = '/work/'; // hard code this for the kiosk
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
        // return true;
        event.preventDefault();
        setFilter(slug);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    return (
        <>
            <div className="flex flex-row flex-wrap justify-start gap-2 md:gap-4">
                {blogButtons.map((button, index) => {
                    return <Link key={index} onClick={(event) => { handleClick(event, button.slug) }} slug={button.slug} href={`${rootDir(pathname)}/c/${button.slug}`} >
                        <Button label={button.categoryName} shortLabel={button.buttonShortName} type="filter" active={filter === button.slug} />
                    </Link>
                })}
            </div>
        </>
    )
}