import { getGlobalSettings, getPageById, getNavigationSettings } from "@/lib/webData";
import { getBlogPostsByBlog } from "@/lib/blogData";

export const revalidate = 3600; // Revalidate at most every hour

export default async function Sitemap() {
    const globalSettings = await getGlobalSettings();
    const navigation = await getNavigationSettings();
    const websiteBaseUrl = globalSettings.siteURL || 'https://www.rlmg.com';

    const pages = navigation.topNav.map((navItem) => ({
        url: `${websiteBaseUrl}/${navItem.pages_id.urlSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    // find pages with pageType 'blog' and get all of its posts from getBlogPostsByBlog 
    const blogPages = navigation.topNav.filter((navItem) => navItem.pages_id.pageType === 'blog');

    const blogPosts = await Promise.all(
        blogPages.map(async (blogPage) => {
            const pageData = await getPageById(blogPage.pages_id.id);
            const blogData = pageData.connectedBlog;
            const posts = await getBlogPostsByBlog(blogData.id);
            return posts.map((post) => ({
                url: `${websiteBaseUrl}/${blogPage.pages_id.urlSlug}/${post.urlSlug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.5,
            }));
        })
    );

    const flattenedBlogPosts = blogPosts.flat();
    pages.push(...flattenedBlogPosts);

    return [
        {
            url: websiteBaseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...pages,
    ];
}