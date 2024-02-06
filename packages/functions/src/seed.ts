import { Post } from '@graphql-rds/core/post';
import { Tag } from '@graphql-rds/core/tag';
import { PostTag } from '@graphql-rds/core/postTag';
import { BlogPost, getBlogPosts } from './utils/file-helpers';
import { dbUtils } from '@graphql-rds/core/utils';

const handleCreatePostAndRelations = async (blogPost: BlogPost) => {
  const { isPublished, publishedOn, tags, ...post } = blogPost;

  console.log(
    `about to create a new post`,
    post.slug,
    isPublished,
    publishedOn,
    tags
  );

  const created = await Post.create({
    ...post,
    is_published: isPublished || null,
    // Since we're not concerned with the exact time a post is published at, we store it in UTC and just need to remember to output it in UTC
    published_on: publishedOn ? new Date(publishedOn).toISOString() : null,
  });

  console.log(`created a brand new post`, created.slug);

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

const handleDeletePostAndRelations = async (id: string) => {
  const relations = await PostTag.getAllByPostId(id);
  const deletedPostTags = await PostTag.deleteByIds(relations.map((r) => r.id));
  const deletedPost = await Post.deleteById(id);

  console.log(`deleted post and relations`, deletedPost, deletedPostTags);

  return {
    deletedPost,
    deletedPostTags,
  };
};

const doesPostHaveAnyChanges = (dbPost: Post, post: BlogPost) => {
  console.log(`doesPostHaveAnyChanges`, dbPost.is_published, post.isPublished);

  return (
    dbPost.content !== post.content ||
    dbPost.is_published != post.isPublished ||
    dbPost.abstract !== post.abstract
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
  // const dbPostSlugs = Object.keys(dbPostSlugMap);

  // loop over local posts
  for (const s of postSlugs) {
    // If the post isn't in the db, create it
    if (!dbPostSlugMap[s]) {
      handleCreatePostAndRelations(postSlugMap[s]);
    } else {
      // otherwise compare content and tags, then add to update queue
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
        is_published: dbIsPublished,
      } = dbPostSlugMap[s];
      let postToUpdate;

      console.log(
        `post is already in db`,
        dbPostId,
        dbPostContent === postContent
      );

      if (doesPostHaveAnyChanges(dbPostSlugMap[s], postSlugMap[s])) {
        postToUpdate = {
          ...dbPostSlugMap[s],
        };

        if (dbPostContent !== postContent) {
          postToUpdate.content = postContent;
        }

        console.log(`post has some changes`, isPublished, dbIsPublished);

        // Intentional loose equality check for isPublished since it will be undefined in frontmatter, but null in the db
        if (isPublished != dbIsPublished) {
          postToUpdate.is_published = isPublished as boolean;
          console.log(`post was published`, publishedOn);
          postToUpdate.published_on = new Date(
            publishedOn as string
          ).toISOString();
        }

        if (abstract !== dbPostAbstract) {
          postToUpdate.abstract = abstract;
        }

        postsToUpdate.push(postToUpdate);
      }

      // get post tags and compare with local tags, then create or delete as needed
      const dbTags = await Tag.getAllByPostId(dbPostId);
      const dbTagNames = dbTags.map((t) => t.name);

      // create any Tags that are in tags but not in dbTags, and relations
      for (const tag of tags) {
        if (!dbTagNames.includes(tag)) {
          await handleCreateTagAndRef(tag, dbPostId);
        }
      }

      // delete any PostTags that are in dbTags, but not in tags
      for (const tag of dbTags) {
        if (!tags.includes(tag.name)) {
          const deleted = await PostTag.deleteByIds([tag.post_tag_id]);
          console.log(`deleted a post tag`, deleted);
        }
      }
    }
  }

  const allDbPosts = await dbUtils.listTableRecords('post');
  // loop over db posts and delete any that don't have a local copy, meaning they were likely renamed
  for (const post of allDbPosts) {
    console.log(`looping dbPostSlugs`, post.slug);

    if (!postSlugMap[post.slug]) {
      await handleDeletePostAndRelations(post.id);
    }
  }

  console.log(`posts to update`, postsToUpdate);
  if (postsToUpdate.length) {
    const test = await Post.updateAll(postsToUpdate);
    console.log(`updated some posts`, test);
  }
};
