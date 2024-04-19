import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Post } from '@core/post';
import Page from './page';

vi.mock('react', () => {
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) =>
    func;
  const originalModule = vi.importActual('react');
  return {
    ...originalModule,
    cache: testCache,
  };
});

vi.mock('next-mdx-remote/rsc', () => {
  const mockMDXRemote = (
    <div>
      <span>MDXRemote</span>
    </div>
  );
  const originalModule = vi.importActual('next-mdx-remote/rsc');
  return {
    ...originalModule,
    MDXRemote: vi.fn().mockReturnValue(mockMDXRemote),
  };
});

vi.mock('@/utils/mdx-components', () => ({
  default: {
    pre: vi.fn(),
    Sandpack: vi.fn(),
  },
}));

// async Server Components aren't supported yet with Vitest or Jest
vi.mock('@/components/Upvotes', () => ({
  Upvotes: vi.fn(),
}));
vi.mock('@/components/PageViews', () => ({
  default: vi.fn(),
}));
vi.mock('@/components/TableOfContents', () => ({
  default: vi.fn(),
}));
vi.mock('./PostMetadata.tsx', () => ({
  default: vi.fn(),
}));

it('renders a published post', async () => {
  vi.spyOn(Post, 'getBySlug').mockImplementation(
    vi.fn().mockReturnValue(
      Promise.resolve({
        id: '1',
        title: 'Published Post',
        slug: 'published-post',
        abstract: 'A published post',
        content: '<div><h2>Hello world!</h2><h2>Second Heading</h2></div>',
        views: 0,
        likes: 0,
        tags: ['javascript'],
        publishedOn: new Date('2024-01-26 EST').valueOf(),
        isPublished: 1,
        created: new Date('2024-01-26 EST'),
        updated: null,
      }),
    ),
  );

  // @ts-expect-error server components aren't built into RTL render function yet
  render(await Page({ params: { postSlug: 'test-post' } }));
  expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
});
