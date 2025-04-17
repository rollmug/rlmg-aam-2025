'use client';
import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import PropTypes from 'prop-types';

export const PageLayout = ({ children, orgName, logoImg, navItems, contactPageSettings, footerArgs, className, activePage }) => {
    return (
        <>
            <main className={`page w-full min-h-screen mx-auto pb-4 lg:pb-10 ${className} flex flex-col items-stretch justify-between`}>
                <Navbar img={logoImg} orgName={orgName} email={footerArgs.email} contactPageSettings={contactPageSettings} listItems={navItems} activePage={activePage} fixed />
                <section className="page-content pt-[3.5rem] lg:pt-[4.9rem] grow">
                    {children}
                </section>
                <Footer {...footerArgs} />
            </main>
        </>
    );
}

PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
    orgName: PropTypes.string.isRequired,
    logoImg: PropTypes.string.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    footerArgs: PropTypes.shape({
        logoImg: PropTypes.string.isRequired,
        orgName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        listItems: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
        socialLinks: PropTypes.arrayOf(
            PropTypes.shape({
                platform: PropTypes.string.isRequired,
                displayText: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    className: PropTypes.string,
}

// const  navItems = [
//     { text: "About Us", url: "/" },
//     { text: "Our Work", url: "/" },
//     { text: "Our Team", url: "/" },
//     { text: "Careers", url: "/" },
//     { text: "Contact", url: "/" },
// ]

// const footerArgs = {
//    logoImg: RLMG,
//    orgName: 'RLMG',
//    address: '70 Coolidge Hill Road, Watertown, MA 02472',
//    email: 'hello@rlmg.com',
//    listItems: [
//      { text: 'Home', url: '/' },
//      { text: 'About Us', url: '/' },
//      { text: 'Our Work', url: '/' },
//      { text: 'Our Team', url: '/' },
//      { text: 'Careers', url: '/' },
//      { text: 'Contact Us', url: '/' },
//      { text: "Blog", url: "/" },
//    ],
//    socialLinks: [
//      {
//        platform: 'linkedin',
//        displayText: 'LinkedIn',
//        url: 'https://www.linkedin.com/company/richard-lewis-media-group',
//      },
//      {
//        platform: 'facebook',
//        displayText: 'Facebook',
//        url: 'https://www.facebook.com/pages/Richard-Lewis-Media-Group/176549829058538',
//      },
//      {
//        platform: 'instagram',
//        displayText: 'Instagram',
//        url: 'https://www.instagram.com/rlmg_media/',
//      },
//      {
//        platform: 'twitter',
//        displayText: 'Twitter',
//        url: 'https://twitter.com/rlmgmedia',
//      }
//    ],
//  }