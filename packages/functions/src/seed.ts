import { Post, PostToCreate } from '@core/post';
import { Tag } from '@core/tag';
import { BlogPost, getBlogPosts } from './utils/file-helpers';

const handleCreatePostAndRelations = async (blogPost: BlogPost) => {
  const { publishedOn, tags, ...post } = blogPost;
  const tagIds = [];

  console.log(
    `about to create a new post`,
    post.slug,
    post.isPublished,
    publishedOn,
    tags,
  );

  for (const tag of tags) {
    const name = await handleCreateTag(tag);
    tagIds.push(name);
  }

  const postToCreate: PostToCreate = {
    ...post,
    tags: tagIds,
  };

  if (publishedOn) {
    // Since we're not concerned with the exact time a post is published at, we store it in UTC and just need to remember to output it in UTC
    postToCreate.publishedOn = new Date(publishedOn).toISOString();
  }

  await Post.create(postToCreate);
};

const handleCreateTag = async (name: string) => {
  const dbTag = await Tag.getByName(name);
  console.log(`handleCreateTag`, dbTag);

  if (!dbTag) {
    console.log(`no tag exists, need to create a new one`);
    const created = await Tag.create(name);
    console.log(`createdTag`, created);
    return created?.name;
  }

  return dbTag.name;
};

export const onCreate = async () => {
  const posts = await getBlogPosts(
    process.env.NODE_ENV === 'test' ? './test/content/seed' : undefined,
  );

  for (const post of posts) {
    await handleCreatePostAndRelations(post);
  }
};

export const onUpdate = async () => {
  const postsToUpdate: Post[] = [];

  console.log('on stack update');

  const posts = await getBlogPosts(
    process.env.NODE_ENV === 'test' ? './test/content/updated' : undefined,
  );

  // console.log(`read the posts`, posts);

  const postSlugMap = posts.reduce((acc: Record<string, BlogPost>, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {});
  const postSlugs = Object.keys(postSlugMap);

  const dbPosts = await Post.getAllBySlugs(postSlugs);
  const dbPostSlugMap = (dbPosts || []).reduce(
    (acc: Record<string, Post>, curr) => {
      console.log(`looping thru dbPostSlugMap`, curr);

      acc[curr.slug] = curr;
      return acc;
    },
    {},
  );

  // loop over local posts
  for (const s of postSlugs) {
    // If the post isn't in the db, create it
    if (!dbPostSlugMap[s]) {
      await handleCreatePostAndRelations(postSlugMap[s]);
    } else {
      // otherwise compare each property that may have changed in the frontmatter and update accordingly
      const {
        content: postContent,
        abstract,
        tags,
        isPublished,
        publishedOn,
      } = postSlugMap[s];
      const {
        id: dbPostId,
        abstract: dbPostAbstract,
        content: dbPostContent,
        isPublished: dbPostIsPublished,
        tags: dbPostTags,
      } = dbPostSlugMap[s];
      const postToUpdate: Partial<Post> = {};

      console.log(`post is already in db`, dbPostId);

      if (dbPostContent !== postContent) {
        console.log(`content changed...`);
        postToUpdate.content = postContent;
      }

      // Intentional loose equality check for isPublished since it will be undefined in frontmatter, but null in the db
      // update: WIP not sure if need number or can use boolean, but we could actually use an enum to work with the number type for many different post types anyway

      if (isPublished !== dbPostIsPublished && publishedOn) {
        postToUpdate.isPublished = isPublished;
        console.log(
          `isPublished changed...`,
          isPublished,
          dbPostIsPublished,
          publishedOn,
        );
        postToUpdate.publishedOn = new Date(publishedOn).toISOString();
      }

      if (abstract !== dbPostAbstract) {
        console.log(`abstract changed...`);
        postToUpdate.abstract = abstract;
      }

      const didTagsChange = tags.some((tag) => !dbPostTags.includes(tag));

      if (didTagsChange) {
        console.log(`tags changed...`);
        const tagIds = [];
        // create any Tags that are in tags but not in dbTags, and update the post in progress
        for (const tag of tags) {
          if (!dbPostTags.includes(tag)) {
            const name = await handleCreateTag(tag);
            tagIds.push(name);
          }
        }

        postToUpdate.tags = tagIds;
      }

      if (Object.keys(postToUpdate).length) {
        postsToUpdate.push({
          ...dbPostSlugMap[s],
          ...postToUpdate,
        });
      }
    }
  }

  const allDbPosts = await Post.list();
  // loop over db posts and delete any that don't have a local copy, meaning they were likely renamed
  for (const post of allDbPosts) {
    console.log(`looping dbPostSlugs`, post.slug);

    if (!postSlugMap[post.slug]) {
      await Post.deleteById(post.id);
    }
  }

  console.log(`posts to update`, postsToUpdate);
  for (const post of postsToUpdate) {
    await Post.update(post);
  }
};
