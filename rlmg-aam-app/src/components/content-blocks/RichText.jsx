import React from "react";
import Link from "next/link";
import { BulletList } from "../typography/BulletList";
import { ContentSection } from "../layout/ContentSection";

export const RichText = ({ content, placement, padding, className = '' }) => {
    return (
        <ContentSection>
            <section className={`section-padded ${className}`}>
                <div className={`max-w-prose ${placement === 'left' ? '' : 'mx-auto'} ${padding === 'large' ? 'my-16 lg:my-24' : 'my-4 lg:my-8'} lg:max-w-screen-md`}>
                    {content.map((item, index) => {
                        switch (item.type) {
                            case 'header':
                                return <h2 key={index}>{item.data.text}</h2>;
                            case 'paragraph':
                                return <p key={index} dangerouslySetInnerHTML={{ __html: item.data.text }} />;
                            case 'nestedlist':
                                // item.data.style - ordered or unordered
                                const listItems = item.data.items.map((listItem) => ({ text: listItem.content }));
                                // console.log('listItems:', listItems);
                                // To do: these might be nested further
                                return <BulletList key={index} listItems={listItems} />;
                            case 'delimiter':
                                return <hr className="my-6" key={index} />;
                            default:
                                const formattedJson = JSON.stringify(content, null, 2);
                                return (
                                    <>
                                        <h3>{content.collection}</h3>
                                        <pre className="text-xs">
                                            <code>
                                                {formattedJson}
                                            </code>
                                        </pre>
                                    </>
                                );
                        }
                    })}
                </div >
            </section>
        </ContentSection>
    );
};

export const sampleContent = [
    {
        "id": "cujRuVKryY",
        "type": "header",
        "data": {
            "text": "Carnegie",
            "level": 2
        }
    },
    {
        "id": "EkS0xF2mO-",
        "type": "paragraph",
        "data": {
            "text": "Carnegie Science Center’s 7500 sf permanent gallery, <i>Mars: The Next Giant Leap</i>, sends visitors on a 300-million-mile journey to discover how space exploration and the latest thinking about how to sustain life on another planet can improve our lives on Earth today. Seven highly-integrated and interactive media experiences reveal the visions, challenges, and solutions of a Martian society, highlighting what it takes to create an equitable future no matter what planet we live on."
        }
    },
    {
        "id": "rw3w5OdlUN",
        "type": "nestedlist",
        "data": {
            "items": [
                {
                    "items": [],
                    "content": "item 1"
                },
                {
                    "items": [],
                    "content": "item 2"
                },
                {
                    "items": [],
                    "content": "item 3"
                }
            ],
            "style": "unordered"
        }
    }
]