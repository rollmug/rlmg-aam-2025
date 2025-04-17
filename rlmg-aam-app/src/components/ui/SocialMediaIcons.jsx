import React from "react";
import PropTypes from 'prop-types';

import { FaLinkedin, FaSquareYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

export const SocialMediaIcons = ({ links = [], className, size = 'medium', color = 'neutral' }) => {
    let iconSize;

    switch (size) {
        case 'small':
            iconSize = `h-4 w-4 lg:h-5 lg:w-5`;
            break;
        case 'medium':
            iconSize = `h-6 w-6 lg:h-6 lg:w-6`;
            break;
        case 'large':
            iconSize = `h-7 w-7 lg:h-8 lg:w-8`;
            break;
        default:
            iconSize = `h-5 w-6 lg:h-6 lg:w-6`
    }

    if (!links || !links.length) {
        return null;
    }

    return (
        <div className={`flex gap-3 ${className}`}>
            {links.map((link, index) => {
                return (
                    <SocialLink key={index} platform={link.platform} displayText={link.displayText} url={link.url} iconSize={iconSize} color={color} />
                );
            })}
        </div>
    );
}

const SocialLink = ({ platform, displayText, url, iconSize, color }) => {
    return (
        <Link href={url} target="_blank" title={displayText} className={`btn btn-link ${color === 'white' ? 'text-white' : 'text-neutral'} !px-0`}>
            {(() => {
                switch (platform) {
                    case 'LinkedIn':
                        return <FaLinkedin className={`${iconSize}`} />
                    case 'Facebook':
                        return <FaFacebook className={`${iconSize}`} />
                    case 'Instagram':
                        return <FaInstagram className={`${iconSize}`} />
                    case 'Twitter':
                        return <FaSquareXTwitter className={`${iconSize}`} />
                    case 'YouTube':
                        return <FaSquareYoutube className={`${iconSize}`} />
                    default:
                        return null;
                }
            })()}
        </Link>
    );
}

SocialMediaIcons.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            displayText: PropTypes.string,
            platform: PropTypes.string,
            url: PropTypes.string,
        })
    ),
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}

SocialMediaIcons.defaultProps = {
    links: [
        {
            displayText: 'LinkedIn',
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com'
        },
        {
            displayText: 'Facebook',
            platform: 'Facebook',
            url: 'https://www.facebook.com'
        },
        {
            displayText: 'Instagram',
            platform: 'Instagram',
            url: 'https://www.instagram.com'
        },
        {
            displayText: 'Twitter',
            platform: 'Twitter',
            url: 'https://www.twitter.com'
        },
    ],
    className: '',
    size: 'medium',
}