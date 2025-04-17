import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Logo } from "./Logo";
import { Button } from "./Button";

export const Navbar = ({ img = null, orgName, email, contactPageSettings, listItems, activePage, fixed = false }) => {

    /**
     * logo
     * fallback text (no logo) from short name in cms
     * links list with urls
     * { pathname: '/', query: { path: '/story/ui-elements-navbar--navigation' }
     */

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    // console.log('contactPageSettings:', contactPageSettings);

    return (
        <>
            <header className={`${fixed ? 'fixed' : 'absolute'} ${mobileNavOpen ? 'bg-neutral' : 'bg-white'} top-0 left-0  shadow-md flex w-screen z-[3]`}>
                <nav className="navbar section-padded justify-between min-h-14 lg:min-h-16 py-0 lg:py-3">
                    <div className="flex-1">
                        <Link href="/" className="btn btn-link text-xl !px-0 py-[6px] lg:py-0 text-left">
                            <Logo img={img} orgName={orgName} />
                        </Link>
                    </div>
                    <div className="navbar-center hidden">
                        {/* optional centered content */}
                    </div>
                    <div className="flex-none">
                        <div className="dropdown static lg:hidden">
                            <div tabIndex={0} role="button" className="!px-0 btn btn-ghost text-center lg:hidden" onClick={() => setMobileNavOpen((pv) => !pv)}>
                                <MenuIcon open={mobileNavOpen} />
                            </div>
                            <MobileLinks listItems={listItems} open={mobileNavOpen} activePage={activePage} contactPageSettings={contactPageSettings} email={email} />
                        </div>

                        <ul className="menu menu-horizontal hidden lg:flex gap-12">
                            <Links listItems={listItems} activePage={activePage} className="text-sm" />
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

const MenuIcon = ({ open }) => {
    if (open) {
        return (
            <svg className="h-7 w-7 _text-primary text-base-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        )
    } else {
        return (
            <svg className="h-6 w-7 _mr-[3px] -translate-x-[3px] text-primary" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <rect className="h-8 w-full" x="80" y="96" fill="currentColor" />
                <rect className="h-8 w-full" x="80" y="240" fill="currentColor" />
                <rect className="h-8 w-full" x="80" y="384" fill="currentColor" />
            </svg>
        )
    }
}

const Links = ({ listItems, className, activePage }) => {
    listItems = listItems && listItems.length > 0 ? listItems : [{ url: '/', text: 'Home' }]; // fallback to home
    return (
        <>
            {listItems.map((item, index) => (
                <li key={index} className={`${className} ${`/${activePage}` === item.url ? 'active' : ''}`}>
                    <Link className="inline-block" href={item.url}><span>{item.text}</span></Link>
                </li>
            ))}
        </>
    );
}

const MobileLinks = ({ listItems, open, activePage, contactPageSettings, email }) => {
    // if(!listItems || !listItems?.length) return null;

    let useContactButton = false;

    if (typeof contactPageSettings === 'object' && contactPageSettings.contactPageSlug && contactPageSettings.contactPageButtonText) {
        useContactButton = true;
    }

    return (
        <AnimatePresence mode="popLayout">
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className=""
                >
                    <div className="bg-neutral absolute h-[calc(100vh-56px)] left-0 w-full">
                        <ul tabIndex={0} className="bg-neutral left-0 mt-0 !mx-0 w-full _absolute menu menu-mobile menu-lg  z-[1] p-0 _shadow-md [&_li>*]:rounded-none items-stretch text-left">
                            <MobileMenuLinks listItems={listItems} activePage={activePage} className={`mobile-menu-item`} />
                        </ul>
                        <div className="pt-9 px-6">
                            <h3 className="text-lgr font-extrabold text-base-100">{email}</h3>
                            {useContactButton && (
                                <div className="pt-3">
                                    <Link href={contactPageSettings.contactPageSlug}>
                                        <Button label={contactPageSettings.contactPageButtonText} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const MobileMenuLinks = ({ listItems, className, activePage }) => {
    // listItems = listItems && listItems.length > 0 ? listItems : [{ url: '/', text: 'Home' }]; // fallback to home
    listItems = [{ url: '/', text: 'Home' }, ...listItems];
    return (
        <>
            {listItems.map((item, index) => (
                <li key={index} className={`${className} ${`/${activePage}` === item.url ? 'active' : ''}`}>
                    <Link className="inline-block text-base-100" href={item.url}><span>{item.text}</span></Link>
                </li>
            ))}
        </>
    );
}

Navbar.propTypes = {
    /** Image source for the logo */
    img: PropTypes.string,
    /** Organization name */
    orgName: PropTypes.string,
    /** List of navigation items */
    listItems: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        url: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    })),
    /** Fixed position at the top of the screen */
    fixed: PropTypes.bool
}

Navbar.defaultProps = {
    img: null,
    orgName: "RLMG",
    fixed: false,
}