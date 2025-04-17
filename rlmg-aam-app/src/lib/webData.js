import { getClient } from "./client";
import { gql } from "@apollo/client";
let cacheDelay = parseInt(process.env.CACHE_DELAY); //seconds, ie 120
export const revalidate = (Number.isInteger(cacheDelay) && cacheDelay > 0 ? cacheDelay : 120);

export const formatPageData = async (slug) => {
  try {
    const globalSettings = await getGlobalSettings();
    const navigation = await getNavigationSettings();

    if (!globalSettings || !navigation) {
      return {
        error: 'Server Error',
        code: '500',
        severity: 'server',
        message: 'Error fetching global settings or navigation settings',
      };
    }

    // const layoutParams = formatPageLayoutParams(globalSettings, navigation.topNav, navigation.bottomNav, slug);
    const layoutParams = formatPageLayoutParams(globalSettings, navigation, slug);

    try {
      var pageID;
      if (!slug || slug === 'home' || slug === 'index') {
        pageID = globalSettings.homePage.key;
      } else {
        pageID = await getPageBySlug(slug);
      }

      if (!pageID) {
        return {
          error: 'Server Error',
          code: '404',
          severity: 'page-not-found',
          message: 'Page not found',
          globalSettings,
          layoutParams,
        }
      }

      const pageData = await getPageById(pageID);

      if (!pageData) {
        return {
          error: 'Server Error',
          code: '404',
          severity: 'page-not-found',
          message: 'Page not found',
          globalSettings,
          layoutParams,
        };
      }

      const metaData = formatMetadata(pageData, globalSettings);
      const contentBlocks = await getContentBlocksForPage(pageID);

      return {
        activePage: slug,
        globalSettings,
        topNav: navigation.topNav,
        bottomNav: navigation.bottomNav,
        pageData,
        layoutParams,
        metaData,
        contentBlocks
      };
    } catch (error) {
      console.error('Error in formatPageData:', error);
      return {
        code: '404',
        severity: 'page-not-found',
        message: error.message,
        layoutParams,
      }
    }
  } catch (error) {
    console.error('Error in formatPageData:', error);
    return {
      code: '500',
      severity: 'server',
      message: error.message,
    }
  }
};

export const getGlobalSettings = async () => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: globalSettingsQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    return data.settings;
  } catch (error) {
    console.error('Error in getGlobalSettings:', error);
    return {
      error: error.message,
      message: "Error fetching global settings"
    }
  }
}

export const getPageById = async (id) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: pageByIdQuery,
      variables: { pagesByIdId: id },
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    return data.pages_by_id;
  } catch (error) {
    console.error('Error in getPageById:', error);
    return {
      error: error.message,
      message: "Error fetching page"
    }
  }
}

export const getContentBlocksForPage = async (id) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: conentBlocksForPageQuery,
      variables: {
        pagesByIdId: id,
        filter: {
          blogPosts_id: {
            published: {
              _eq: true
            }
          }
        }
      },
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    return data.pages_by_id?.contentBlocks || [];
  } catch (error) {
    console.error('Error in getContentBlocksForPage:', error);
    return {
      error: error.message,
      message: "Error fetching content blocks for page"
    }
  }
};

export const getNavigationSettings = async () => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: navigationQuery,
      variables: {
        filter: {
          pages_id: {
            enabled: {
              _eq: true
            }
          }
        },
        bottomNavFilter2: {
          pages_id: {
            enabled: {
              _eq: true
            }
          }
        }
      },
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    return data.navigationSettings;
  } catch (error) {
    console.error('Error in getNavigationSettings:', error);
    return {
      error: error.message,
      message: "Error fetching navigation settings"
    }
  }
}

export const getPageBySlug = async (slug) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: pageSlugsQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    const page = data.pages.find(page => page.urlSlug === slug);
    if (page) {
      return page.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in getPageSlugs:', error);
    return {
      error: error.message,
      message: "Error fetching page slugs"
    }
  }
};

const pageSlugsQuery = gql`query Pages {
  pages {
    id
    urlSlug
  }
}`;

const pageByIdQuery = gql`query Pages_by_id($pagesByIdId: ID!) {
  pages_by_id(id: $pagesByIdId) {
    id
    metaData {
      id
      metaDescription
      navigationTitle
      pageTitle
      socialMediaDescription
      openGraphImage {
        id
        filename_disk
        filename_download
      }
    }
    urlSlug
    pageType
    internalName
    enabled
    bannerHeader
    bannerSubheader
    bannerImage {
      id
      title
      filename_disk
      filename_download
    }
    bannerCallToActionText
    bannerCallToActionLink
    bannerBGVideo {
        id
        filename_disk
        filename_download
    }
    bannerTextPlacement
    bannerDisplayType
    connectedBlog {
      id
      categoryLabel
      blogName
      blogDescription
      namePlural
      nameSingular
      urlSlug
      blogCategories {
        blogCategories_id {
          id
          categoryName
          buttonShortName
          description
          slug
        }
      }
    }
  }
}`;

const conentBlocksForPageQuery = gql`query PageContentBlocks($pagesByIdId: ID!, $filter: block_featuredPosts_blogPosts_filter) {
  pages_by_id(id: $pagesByIdId) {
    id
    contentBlocks {
      collection
      item {
        ... on block_textOnly {
          id
          text:content
          internalName
          placement
          padding
        }
        ... on block_textWithImage {
          id
          subheaderText
          headerText
          content
          image {
            id
            title
            filename_disk
            filename_download
            width
            height
          }
          alignment
          internalName
        }
        ... on block_textOnlyHero {
          id
          headerText
          mainText
          buttonText
          buttonURL
          internalName
          alignment
          containerHashValue
        }
        ... on block_columnText {
          id
          internalName
          headerText
          columnText
          columnSize
          collapseLongContentOnMobile
        }
        ... on block_responsiveColumnText {
          id
          internalName
          headerText
          subheaderText
          textBlocks
          buttonText
          buttonURL
        }
        ... on block_bannerImageWithDetails {
          id
          image {
            id
            filename_disk
            filename_download
          }
          imageAltTag
          headerText
          subheaderText
          textBlocks
          buttonText
          buttonURL
          internalName
        }
        ... on block_quoteBlock {
          id
          quoteText
          sourceAuthor
          sourceOrg
          internalName
          template
        }
        ... on block_singleImage {
          id
          internalName
          image {
            id
            title
            filename_disk
            filename_download
            width
            height
          }
          caption
        }
        ... on block_imageSlider {
          id
          internalName
          galleryTitle
          galleryDescription
          images {
            imageSliderImages_id {
              imageCaption
              imageTitle
              image {
                id
                filename_disk
                filename_download
                filesize
                width
                height
              }
            }
          }
        }
        ... on block_video {
          id
          video {
            id
            filename_disk
            filename_download
          }
          posterImage {
            id
            filename_disk
            filename_download
          }
          title
          captionText
        }
        ... on block_teamMembers {
          id
          headerText
          internalName
          teamMembers {
            staff_id {
              id
              firstName
              jobTitle
              lastName
              bio
              photo {
                id
                filename_disk
                filename_download
                width
                height
              }
            }
          }
        }
        ... on block_featuredPosts {
          id
          internalName
          headerText
          buttonText
          template
          linkToPage {
            urlSlug
          }
          posts(filter: $filter) {
            id
            blogPosts_id {
              urlSlug
              postTeaser
              postTitle
              blog {
                urlSlug
              }
              bannerImage {
                id
                title
                filename_disk
                filename_download
              }
              hoverPreviewBGVideo {
                id
                filename_download
                filename_disk
              }
            }
          }
        }
          ... on block_ColumnImages {
          id
          headerText
          internalName
          columnSize
          columnImages {
            directus_files_id {
              id
              filename_disk
              filename_download
              width
              height
            }
          }
        }
      }
    }
  }
}`;

const globalSettingsQuery = gql`query Settings {
  settings {
    id
    homePage
    siteURL
    siteTagline
    siteTitle
    metaDescription
    openGraphDescription
    companyName
    companyShortName
    companyLogo {
      id
      filename_disk
      filename_download
    }
    streetAddress
    cityStateZip
    phoneNumber
    openGraphImage {
      id
      filename_disk
      filename_download
    }
    emailPlatform
    emailAddress
    mailChimpAPIKey
    mailChimpListID
    mailChimpServerPrefix
    links {
      id
      order
      socialMedia_id {
        displayText
        platform
        url
      }
    }
    additionalEmailAddresses {
      orgContactEmails_id {
        label
        emailAddress
      }
    }
  }
}`;

const navigationQuery = gql`query NavigationSettings($filter: navigationSettings_pages_filter, $bottomNavFilter2: navigationSettings_pages_1_filter) {
  navigationSettings {
    id
    topNav(filter: $filter) {
      order
      pages_id {
        id
        urlSlug
        pageType
        metaData {
          navigationTitle
          pageTitle
        }
      }
    }
    bottomNav(filter: $bottomNavFilter2) {
      order
      pages_id {
        urlSlug
        pageType
        metaData {
          navigationTitle
          pageTitle
        }
      }
    }
    contactPage {
      urlSlug
      id
    }
    contactPageButtonText
  }
}`;

/** Helper Functions */

export const formatNavigation = (navData) => {
  // console.log('navData:', navData);
  return navData.map((navItem) => {
    return {
      text: navItem.pages_id.metaData.navigationTitle,
      url: '/' + navItem.pages_id.urlSlug,
    }
  });
};

export const formatPageLayoutParams = (globalSettings, navigation, activePageSlug) => {
  // navigation.topNav, navigation.bottomNav
  const topNav = navigation.topNav;
  const bottomNav = navigation.bottomNav;

  // navigation.contactPage (object), navigation.contactPageButtonText (string)

  return {
    orgName: globalSettings.companyName,
    companyShortName: globalSettings.companyShortName,
    logoImg: globalSettings?.companyLogo ? formatImageURL(globalSettings.companyLogo) : null,
    navItems: formatNavigation(topNav),
    contactPageSettings: {
      contactPageSlug: '/' + navigation?.contactPage?.urlSlug,
      contactPageButtonText: navigation.contactPageButtonText,
    },
    footerArgs: formatFooterArgs(globalSettings, bottomNav),
    activePage: activePageSlug,
    globalSettings
  }
}

export const formatImageURL = (image, presetKey) => {
  return `${process.env.FILES_BASE_URL}/${image.id}/${encodeURIComponent(image.filename_download)}${presetKey ? `?key=${presetKey}` : ''}`;
};

export const formatFooterArgs = (globalSettings, bottomNav) => {
  const listItems = formatNavigation(bottomNav);
  const socialLinks = globalSettings.links.map((link) => {
    return {
      platform: link.socialMedia_id.platform,
      displayText: link.socialMedia_id.displayText,
      url: link.socialMedia_id.url,
    }
  });

  return {
    logoImg: globalSettings?.companyLogo ? formatImageURL(globalSettings.companyLogo) : null,
    orgName: globalSettings.companyName,
    address: globalSettings.streetAddress,
    cityStateZip: globalSettings.cityStateZip,
    email: globalSettings.emailAddress,
    listItems: listItems,
    socialLinks: socialLinks,
  }
};

export const formatBannerArgs = (pageData) => {
  return {
    image: pageData.bannerImage,
    headerText: pageData.bannerHeader,
    subheaderText: pageData.bannerSubheader,
    buttonText: pageData.bannerCallToActionText,
    buttonURL: pageData.bannerCallToActionLink,
    textBlocks: [
      { content: pageData.bannerTextPlacement },
    ]
  }
};

export const formatOGImage = (pageData, globalSettings) => {
  // console.log('pageData:', pageData);
  return pageData?.metaData?.openGraphImage ? formatImageURL(pageData.metaData.openGraphImage, 'opengraph') : formatImageURL(globalSettings.openGraphImage, 'opengraph');
};

export const formatMetadata = (pageData, globalSettings) => {
  const ogImg = formatOGImage(pageData, globalSettings);

  return {
    metadataBase: new URL(process.env.FILES_BASE_URL),
    title: pageData?.metaData?.pageTitle || globalSettings.siteTitle,
    description: pageData?.metaData?.metaDescription || globalSettings.metaDescription,
    manifest: '/manifest.webmanifest',
    authors: [{ name: 'RLMG', url: 'https://rlmg.com' }, { name: 'Dave Kobrenski', url: 'https://davekobrenski.com' }],
    openGraph: {
      title: pageData?.metaData?.pageTitle || globalSettings.siteTitle,
      description: pageData?.metaData?.socialMediaDescription || globalSettings.openGraphDescription,
      url: globalSettings.siteURL || 'https://rlmg.com',
      type: 'website',
      site_name: pageData?.metaData?.pageTitle || globalSettings.siteTitle,
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 628,
          alt: pageData?.metaData?.pageTitle || globalSettings.siteTitle,
        },
      ],
    },
  };
};