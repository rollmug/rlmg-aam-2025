import React from "react";
import PropTypes from 'prop-types';
import Link from "next/link";

export const BulletList = ({ title, listItems, bullets = true, textSize = 'normal', spacing = 'normal', columns = 1, columnsOnMobile = false, className }) => {
    const textClass = getTextClass(textSize);
    const spacingClass = getSpacingClass(spacing);
    let gridClass = '';

    if (listItems && columns > 1) {
        const itemsPerColumn = listItems ? Math.ceil(listItems.length / columns) : 0;
        const columnItems = listItems.reduce((result, item, index) => {
            const columnIndex = Math.floor(index / itemsPerColumn);
            if (!result[columnIndex]) {
                result[columnIndex] = [];
            }
            result[columnIndex].push(item);
            return result;
        }, []);

        if(columnsOnMobile) {
            // this swaps the columns, and displays them on mobile but as long list on desktop
            switch (columns) {
                case 2: gridClass = 'grid-cols-2'; break;
                case 3: gridClass = 'grid-cols-3'; break;
                case 4: gridClass = 'grid-cols-4'; break;
            }
            return (
                <>
                    {title && <h4>{title}</h4>}
                    <div className={`grid gap-4 max-w-screen-lg mx-auto ${gridClass} lg:grid-cols-1`}>
                        {columnItems.map((column, index) => (
                            <List key={index} listItems={column} bullets={bullets} className={className} spacingClass={spacingClass} textClass={textClass} />
                        ))}
                    </div>
                </>
            );
        } else {
            switch (columns) {
                case 2: gridClass = 'lg:grid-cols-2'; break;
                case 3: gridClass = 'sm:grid-cols-2 lg:grid-cols-3'; break;
                case 4: gridClass = 'md:grid-cols-3 lg:grid-cols-4'; break;
            }
            return (
                <>
                    {title && <h4>{title}</h4>}
                    <div className={`grid grid-cols-1 gap-4 max-w-screen-lg mx-auto ${gridClass}`}>
                        {columnItems.map((column, index) => (
                            <List key={index} listItems={column} bullets={bullets} className={className} spacingClass={spacingClass} textClass={textClass} />
                        ))}
                    </div>
                </>
            );
        }
    }

    // normal list
    return (
        <>
            {title && <h4>{title}</h4>}
            <List listItems={listItems} bullets={bullets} className={className} spacingClass={spacingClass} textClass={textClass} />
        </>
    );
};

const List = ({ listItems, bullets, className, spacingClass, textClass }) => {
    if (!listItems) return null;
    return (
        <ul className={`${bullets ? 'list-outside' : 'list-none !ml-0'} ${className} ${spacingClass}`}>
            {listItems.map((item, index) => (
                <ListItem key={index} text={item.text} url={item.url} textClass={textClass} />
            ))}
        </ul>
    );
}

const ListItem = ({ text, url, textClass }) => {
    return (
        <li className={`${textClass}`}>
            {url ? (
                <Link href={url}>{text}</Link>
            ) : (
                text
            )}
        </li>
    );
}

const getTextClass = (textSize) => {
    switch (textSize) {
        case 'small':
            return 'text-sm';
        case 'normal':
            return 'text-base';
        case 'large':
            return 'text-lg';
        default:
            return 'text-base';
    }
};

const getSpacingClass = (spacing) => {
    switch (spacing) {
        case 'tight':
            return 'space-y-1';
        case 'normal':
            return 'space-y-2';
        case 'loose':
            return 'space-y-3';
        case 'looser':
            return 'space-y-4';
        default:
            return 'space-y-2';
    }
}

BulletList.propTypes = {
    title: PropTypes.string,
    listItems: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        url: PropTypes.string
    })),
    bullets: PropTypes.bool,
    textSize: PropTypes.oneOf(['small', 'normal', 'large']),
    spacing: PropTypes.oneOf(['tight', 'normal', 'loose', 'looser']),
    columns: PropTypes.number,
    columnsOnMobile: PropTypes.bool,
    className: PropTypes.string,
}

BulletList.defaultProps = {
    title: 'Our Capabilities',
    listItems: [
        { text: 'Strategy & Concept', url: '' },
        { text: 'Design Development & Prototyping', url: '' },
        { text: 'Interactive Media', url: '' },
        { text: 'Film & Linear Media', url: '' },
        { text: 'Immersive Environments', url: '' },
        { text: 'Project Management', url: '' },
    ],
    bullets: true,
    textSize: 'normal',
    columns: 1,
    columnsOnMobile: false,
    spacing: 'normal',
}