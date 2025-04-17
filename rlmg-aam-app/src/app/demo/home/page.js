'use client';
import React, { useState, useContext, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Banner } from "@/components/ui/Banner";
import { DataContext } from '@/app/dataProvider';

import RLMG from '../../../stories/assets/rlmg-logo.png';
import testImg from '../../../stories/assets/test-bg-image.jpg'
import { TextWithImage } from "@/components/content-blocks/TextWithImage";
import { TextOnlyHero } from "@/components/content-blocks/TextOnlyHero";
import { FeaturedPosts } from "@/components/content-blocks/FeaturedPosts";
import { BannerImageColumnText } from "@/components/content-blocks/BannerImageColumnText";
const videoLoop = '/videos/WebLoop_opt_241218_1280-optimized.mp4';
const featureImg = '/storybook-imgs/Biomuseo_Panorama_2_2014.jpg';
const testImg3 = '/storybook-imgs/Our-Approach.jpg';

const navItems = [
  { text: "About Us", url: "/demo/about" },
  { text: "Our Work", url: "/demo/work" },
  { text: "Our Team", url: "/demo/team" },
  { text: "Careers", url: "/demo/careers" },
  { text: "Contact", url: "/demo/contact" },
];

const footerArgs = {
  logoImg: RLMG,
  orgName: 'RLMG',
  address: '70 Coolidge Hill Road, Watertown, MA 02472',
  email: 'hello@rlmg.com',
  listItems: [
    { text: 'Home', url: '/' },
    { text: 'About Us', url: '/' },
    { text: 'Our Work', url: '/' },
    { text: 'Our Team', url: '/' },
    { text: 'Careers', url: '/' },
    { text: 'Contact Us', url: '/' },
    { text: "Blog", url: "/" },
  ],
  socialLinks: [
    {
      platform: 'linkedin',
      displayText: 'LinkedIn',
      url: 'https://www.linkedin.com/company/richard-lewis-media-group',
    },
    {
      platform: 'facebook',
      displayText: 'Facebook',
      url: 'https://www.facebook.com/pages/Richard-Lewis-Media-Group/176549829058538',
    },
    {
      platform: 'instagram',
      displayText: 'Instagram',
      url: 'https://www.instagram.com/rlmg_media/',
    },
    {
      platform: 'twitter',
      displayText: 'Twitter',
      url: 'https://twitter.com/rlmgmedia',
    }
  ],
}

const pageLayoutParams = {
  orgName: 'RLMG',
  logoImg: RLMG,
  navItems: navItems,
  footerArgs: footerArgs
};

const bannerArgs = {
  image: '/storybook-imgs/Hero_Image.jpg',
  headerText: 'Header Text',
  subheaderText: 'Subheader Text',
  buttonText: 'Learn About Our Process',
  buttonURL: '/',
  textBlocks: [
    { content: '<p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.</p>' },
    {
      content: '<ul><li>Item 1 is longer</li><li>Item 2</li><li>Item 3</li></ul>'
    },
    {
      content: '<ul><li>Item 1 is longer too</li><li>Item 2</li><li>Item 3</li></ul>'
    },
  ]
}

export default function Home() {
  const data = useContext(DataContext);
  // console.log(data);
  return (
    <PageLayout {...pageLayoutParams}>
      <Banner bannerTextPlacement='top' bannerImage={testImg} bannerHeader="Experience is Everything" bannerBGVideo={videoLoop} />

      <TextWithImage
        header="Who We Are"
        subheader="We Create Text. At Different Sizes."
        text="We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions.
                  Provoke joy, wonder, debate. We open doors and cast light on who we are as humans, where we’ve been, where we’re going.
                  We bring people together and explore what connects us. We create meaningful moments, and we do it with a sense of purpose every step of the way."
        image={featureImg}
        width={600}
        alt="Test image"
        imagePlacement="right"
        className={`my-2 mt-6 lg:my-8`}
      />

      <FeaturedPosts
        headerText="Featured Projects"
        buttonText="See All Projects"
        linkToPage="/"
        standout
        posts={[
          {
            bannerImage: '/storybook-imgs/Featured-1.jpg',
            postTeaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.',
            postTitle: 'Post Title',
            urlSlug: {
              pathname: './',
              query: {
                path: '/story/content-blocks-featured-posts--with-background'
              }
            }
          },
          {
            bannerImage: '/storybook-imgs/Featured-2.jpg',
            postTeaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.',
            postTitle: 'Post Title',
            urlSlug: {
              pathname: './',
              query: {
                path: '/story/content-blocks-featured-posts--with-background'
              }
            }
          }
        ]}
      />

      {/* <TextWithImage
        header="Our Approach"
        subheader="Measure Once. Cut Twice."
        text="We are led by the principles of design-thinking. It informs every facet of our approach, from UX to graphic design to storytelling and technology. In support of that guiding principle is good old-fashioned teamwork, internally across our disciplines and with clients and partners. We listen carefully, we respect diverse perspectives, and, above all, we have fun."
        image={testImg3}
        width={600}
        alt="Test image"
        imagePlacement="left"
        className={`my-2 lg:mb-8 lg:mt-12`}
      /> */}

      <BannerImageColumnText {...bannerArgs} />

      <TextOnlyHero
        headerText="Pizza on Wednesdays"
        mainText="We are always looking for talented individuals to join our team. If you are passionate about creating meaningful experiences, <strong>we would love to hear from you.</strong>"
        buttonText="View Toppings"
        buttonURL="/"
        className=""
      />

    </PageLayout>
  );
}