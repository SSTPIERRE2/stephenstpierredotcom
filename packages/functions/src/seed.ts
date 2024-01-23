import { Post, PostToCreate } from '@graphql-rds/core/post';
import { Tag } from '@graphql-rds/core/tag';
import { PostTag } from '@graphql-rds/core/postTag';
import { BlogPost, getBlogPosts, slugify } from './utils/file-helpers';

const handleCreatePostAndRelations = async (blogPost: BlogPost) => {
  const { isPublished, publishedOn, tags, ...post } = blogPost;

  console.log(
    `about to create a new post`,
    post,
    isPublished,
    publishedOn,
    tags
  );

  const created = await Post.create({
    ...post,
    is_published: isPublished || null,
    published_on: new Date(new Date().toISOString()),
  });

  console.log(`created a brand new post`, created);

  for (const tag of tags) {
    await handleCreateTagAndRef(tag, created.id);
  }
};

const handleCreateTagAndRef = async (name: string, postId: string) => {
  const dbTag = await Tag.getByName(name);
  console.log(`handleCreateTagAndRef`, dbTag);

  if (dbTag) {
    const createdPostTag = await PostTag.create(postId, dbTag.id);
    console.log(`Tag exists, created a post tag`, createdPostTag);
  } else {
    console.log(`no tag exists, need to create a Tag and PostTag`);
    const createdTag = await Tag.create(name);
    console.log(`createdTag`, createdTag);
    const createdPostTag = await PostTag.create(postId, createdTag.id);
    console.log(`createdPostTag`, createdPostTag);
  }
};

export const handler = async () => {
  const posts = await getBlogPosts(
    process.env.NODE_ENV === 'test' ? './test/content/seed' : undefined
  );
};

export const onCreate = async () => {
  const posts = await getBlogPosts(
    process.env.NODE_ENV === 'test' ? './test/content/seed' : undefined
  );

  for (const post of posts) {
    await handleCreatePostAndRelations(post);
  }
};

export const onUpdate = async () => {
  const postsToUpdate: Post[] = [];

  console.log('on stack update');

  const posts = await getBlogPosts(
    process.env.NODE_ENV === 'test' ? './test/content/updated' : undefined
  );

  // console.log(`read the posts`, posts);

  const postSlugMap = posts.reduce((acc: Record<string, BlogPost>, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {});
  const postSlugs = Object.keys(postSlugMap);

  const dbPosts = await Post.getAllBySlugs(postSlugs);
  const dbPostSlugMap = dbPosts.reduce(
    (acc: Record<string, Post.Post>, curr) => {
      acc[curr.slug] = curr;
      return acc;
    },
    {}
  );

  // loop over local posts
  for (const s of postSlugs) {
    // If the post isn't in the db, create it
    if (!dbPostSlugMap[s]) {
      handleCreatePostAndRelations(postSlugMap[s]);
    } else {
      // otherwise compare content and tags, then add to update queue
      const { content: postContent, tags: postTags } = postSlugMap[s];
      const { id: dbPostId, content: dbPostContent } = dbPostSlugMap[s];

      console.log(
        `post is already in db`,
        dbPostId,
        dbPostContent === postContent
      );

      if (dbPostContent !== postContent) {
        postsToUpdate.push({
          ...dbPostSlugMap[s],
          content: postContent,
        });
      }

      // get post tags and compare with local tags, then create or delete as needed
      const dbTags = await Tag.getAllByPostId(dbPostId);
      const dbTagNames = dbTags.map((t) => t.name);

      // create any PostTags that are in postTags but not in dbTags
      for (const tag of postTags) {
        if (!dbTagNames.includes(tag)) {
          handleCreateTagAndRef(tag, dbPostId);
        }
      }

      // delete any PostTags that are in dbTags, but not in postTags
      for (const tag of dbTags) {
        if (!postTags.includes(tag.name)) {
          const deleted = await PostTag.deleteById(tag.id);
          console.log(`deleted a post tag`, deleted);
        }
      }
    }
  }

  console.log(`posts to update`, postsToUpdate);
  if (postsToUpdate.length) {
    const test = await Post.updateAll(postsToUpdate);
    console.log(`updated some posts`, test);
  }
};
