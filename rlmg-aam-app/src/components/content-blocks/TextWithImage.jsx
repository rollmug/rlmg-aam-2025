import React from "react";
import { FeaturedImage } from "../ui/FeaturedImage";
import PropTypes from 'prop-types';
import { ContentSection } from "../layout/ContentSection";

export const TextWithImage = ({ header, subheader, text, image, width, height, alt, className, imagePlacement = 'right' }) => {
    return (
        <ContentSection>
            <section className={`section-padded ${className}`}>
                <div className={`flex justify-evenly items-center gap-1 lg:gap-10 ${imagePlacement === 'left' ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row'}`}>
                    <div className={`w-full lg:w-1/2`}>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <h2 className="my-0">{header}</h2>
                            <h3 className="my-0">{subheader}</h3>
                            <hr />
                            <div dangerouslySetInnerHTML={{ __html: text }} />
                        </div>
                    </div>
                    <div className={`w-full lg:w-1/2 px-3 py-8 lg:px-4 lg:py-4 flex items-center ${imagePlacement === 'left' ? 'justify-center' : 'justify-center'}`}>
                        {image && <FeaturedImage src={image} alt={alt} width={width} height={height} />}
                    </div>
                </div>
            </section>
        </ContentSection>
    );
}

TextWithImage.propTypes = {
    header: PropTypes.string,
    subheader: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    width: PropTypes.number,
    alt: PropTypes.string,
    imagePlacement: PropTypes.oneOf(['left', 'right']),
}

TextWithImage.defaultProps = {
    header: 'Who We Are',
    subheader: 'We Create Text. At Different Sizes.',
    text: `We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions. 
    Provoke joy, wonder, debate. We open doors and cast light on who we are as humans, where we’ve been, where we’re going. 
    We bring people together and explore what connects us. We create meaningful moments, and we do it with a sense of purpose every step of the way.`,
    image: '/storybook-imgs/Biomuseo_Panorama_2_2014.jpg',
    width: 450,
    alt: 'test',
    imagePlacement: 'right',
}