import { Post, PostToCreate } from '@core/post';
import { Tag } from '@core/tag';
import { BlogPost, getBlogPosts } from './utils/file-helpers';

const handleCreatePostAndRelations = async (
  blogPost: Omit<BlogPost, 'publishedOn'> & {
    publishedOn?: string | number;
  },
) => {
  const { publishedOn, tags, ...post } = blogPost;
  const tagIds = [];

  console.log(
    `about to create a new post`,
    post.slug,
    publishedOn,
    typeof publishedOn,
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
    // Storing the primitive value so we can sort by publish date in DynamoDB
    postToCreate.publishedOn =
      typeof publishedOn === 'string' ?
        new Date(publishedOn).valueOf()
      : publishedOn;
  }

  console.log(`Creating post`, postToCreate);

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
        publishedOn: postPublishedOn,
      } = postSlugMap[s];
      const publishedOn =
        postPublishedOn ? new Date(postPublishedOn).valueOf() : undefined;
      const {
        abstract: dbPostAbstract,
        content: dbPostContent,
        isPublished: dbPostIsPublished,
        publishedOn: dbPostPublishedOn,
        tags: dbPostTags,
      } = dbPostSlugMap[s];
      const postToUpdate: Partial<Post> = {};

      console.log(`post is already in db`, s);

      if (dbPostContent !== postContent) {
        console.log(`content changed...`);
        postToUpdate.content = postContent;
      }

      if (abstract !== dbPostAbstract) {
        console.log(`abstract changed...`);
        postToUpdate.abstract = abstract;
      }

      if (isPublished !== dbPostIsPublished) {
        console.log(`isPublished changed...`);
        postToUpdate.isPublished = isPublished;
      }

      if (publishedOn !== dbPostPublishedOn) {
        console.log(`publishedOn changed...`, publishedOn, dbPostPublishedOn);
        postToUpdate.publishedOn = publishedOn;
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
      await Post.deleteByPk(post.slug);
    }
  }

  console.log(`posts to update`, postsToUpdate);
  for (const post of postsToUpdate) {
    await Post.update(post);
  }
};
