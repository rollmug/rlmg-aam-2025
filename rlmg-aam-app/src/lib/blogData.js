import { getClient } from "./client";
import { gql } from "@apollo/client";
let cacheDelay = parseInt(process.env.CACHE_DELAY); //seconds, ie 120
export const revalidate = (Number.isInteger(cacheDelay) && cacheDelay > 0 ? cacheDelay : 120);

import { getNavigationSettings, getGlobalSettings, formatMetadata, formatPageLayoutParams } from "./webData";

export const formatBlogPostData = async (slug, page) => {
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

    // const layoutParams = formatPageLayoutParams(globalSettings, navigation.topNav, navigation.bottomNav, page);
    const layoutParams = formatPageLayoutParams(globalSettings, navigation, slug);

    try {
      let postID = await getPostBySlug(slug);

      if (!postID) {
        return {
          error: 'Server Error',
          code: '404',
          severity: 'page-not-found',
          message: 'Page not found',
          globalSettings,
          layoutParams,
        }
      }

      let postData = await getBlogPostByID(postID);

      if (!postData) {
        return {
          error: 'Server Error',
          code: '404',
          severity: 'page-not-found',
          message: 'Page not found',
          globalSettings,
          layoutParams,
        };
      }

      const metaData = formatMetadata(postData, globalSettings);
      const contentBlocks = await getContentBlocksForPost(postID);

      return {
        activePage: page,
        globalSettings,
        topNav: navigation.topNav,
        bottomNav: navigation.bottomNav,
        pageData: postData,
        layoutParams,
        metaData,
        contentBlocks
      };
    } catch (error) {
      console.error('Error in formatBlogPostData:', error);
      return {
        code: '404',
        severity: 'page-not-found',
        message: error.message,
        layoutParams,
      }
    }
  } catch (error) {
    console.error('Error in formatBlogPostData:', error);
    return {
      code: '500',
      severity: 'server',
      message: error.message,
    }
  }
};

export const getBlogPostsByBlog = async (blogID) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: blogPostsByBlogQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
      variables: {
        filter: {
          blog: {
            id: {
              _eq: blogID
            }
          },
          published: {
            _eq: true
          },
          postDate: {
            _lt: "$NOW(-5 hours)"
          }
        },
        sort: ["-postDate"]
      }
    });
    return data.blogPosts;
  } catch (error) {
    console.error('Error in getBlogPostsByBlog:', error);
    return {
      error: error.message,
      message: "Error fetching blog posts by blog"
    };
  }
};

export const getBlogPostByID = async (id) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: blogPostByIDQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
      variables: {
        blogPostsByIdId: id
      }
    });

    return data.blogPosts_by_id;
  } catch (error) {
    console.error('Error in getBlogPostByID:', error);
    return {
      error: error.message,
      message: "Error fetching blog post by id"
    }
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: postSlugsQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    const post = data.blogPosts.find(post => post.urlSlug === slug);
    if (post) {
      return post.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    return {
      error: error.message,
      message: "Error fetching page slugs"
    }
  }
};

export const getPostSlugs = async () => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: postSlugsQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
    });

    return data.blogPosts;
  } catch (error) {
    console.error('Error in getPostSlugs:', error);
    return {
      error: error.message,
      message: "Error fetching post slugs"
    };
  }
};

export const getContentBlocksForPost = async (id) => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: contentBlocksForPostQuery,
      context: {
        fetchOptions: {
          next: { revalidate: revalidate },
        }
      },
      variables: {
        blogPostsByIdId: id,
        filter: {
          blogPosts_id: {
            published: {
              _eq: true
            }
          }
        }
      }
    });

    return data.blogPosts_by_id.contentBlocks;
  } catch (error) {
    console.error('Error in getContentBlocksForPost:', error);
    return {
      error: error.message,
      message: "Error fetching content blocks for post"
    };
  }
};

const postSlugsQuery = gql`query BlogPosts {
  blogPosts {
    id
    urlSlug
  }
}`;

const blogPostsByBlogQuery = gql`query BlogPosts($filter: blogPosts_filter, $sort: [String]) {
  blogPosts(filter: $filter, sort: $sort) {
    id
    pageType
    postDate
    postTitle
    postSubtitle
    postTeaser
    postExcerpt
    published
    urlSlug
    customData
    categories {
      blogCategories_id {
        id
        categoryName
        slug
      }
    }
    metaData {
      navigationTitle
      metaDescription
      openGraphImage {
        id
        filename_disk
        filename_download
      }
      pageTitle
      socialMediaDescription
    }
    bannerImage {
        id
        title
        filename_disk
        filename_download
    }
    hoverPreviewBGVideo {
      id
      filename_disk
      filename_download
    }
  }
}`;

const blogPostByIDQuery = gql`query BlogPosts_by_id($blogPostsByIdId: ID!) {
  blogPosts_by_id(id: $blogPostsByIdId) {
    id
    pageType
    postDate
    postTitle
    postSubtitle
    postTeaser
    postExcerpt
    published
    urlSlug
    metaData {
      metaDescription
      navigationTitle
      openGraphImage {
        id
        filename_disk
        filename_download
      }
      pageTitle
      socialMediaDescription
    }
    blog {
      id
      blogName
      urlSlug
    }
    categories {
      blogCategories_id {
        id
        slug
        categoryName
        buttonShortName
        description
      }
    }
    customData
    bannerImage {
      id
      title
      filename_download
      filename_disk
    }
    bannerBGVideo {
      id
      filename_download
      filename_disk
    }
    hoverPreviewBGVideo {
      id
      filename_download
      filename_disk
    }
  }
}`;

const contentBlocksForPostQuery = gql`query BlogPostContentBlocks($blogPostsByIdId: ID!, $filter: block_featuredPosts_blogPosts_filter) {
  blogPosts_by_id(id: $blogPostsByIdId) {
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
              postTeaser
              postTitle
              blog {
                urlSlug
              }
            }
          }
        }
        ... on block_ColumnImages {
          headerText
          id
          internalName
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