import { expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react';
import { Post } from '@core/post';
import { Tag } from '@core/tag';
import Page from './page'

vi.mock('react', () => {
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) => func;
  const originalModule = vi.importActual('react');
  return {
    ...originalModule,
    cache: testCache,
  };
});

vi.mock('next-mdx-remote/rsc', () => {
  const mockMDXRemote = <div><span>MDXRemote</span></div>;
  const originalModule = vi.importActual('next-mdx-remote/rsc');;
  return {
    ...originalModule,
    MDXRemote: vi.fn().mockReturnValue(mockMDXRemote)
  }
});

vi.mock('@/utils/mdx-components', () => ({
  default: {
    pre: vi.fn(),
    Sandpack: vi.fn()
  }
}));

// async Server Components aren't supported yet with Vitest or Jest
vi.mock('@/components/Upvotes', () => ({
  Upvotes: vi.fn()
}))
vi.mock('@/components/PageViews', () => ({
  default: vi.fn()
}))

it('renders a published post', async () => {
  vi.spyOn(Post, 'getBySlug').mockImplementation(vi.fn().mockReturnValue(Promise.resolve({
    id: '1',
    title: 'Published Post',
    slug: 'published-post',
    abstract: 'A published post',
    content: '<div><h2>Hello world!</h2><h2>Second Heading</h2></div>',
    views: 0,
    published_on: new Date('2024-01-26 EST'),
    is_published: true,
    created: new Date('2024-01-26 EST'),
    updated: null
  })));
  vi.spyOn(Tag, 'getAllByPostId').mockImplementation(vi.fn().mockReturnValue(Promise.resolve([
    { id: '1', name: 'javascript', created: new Date('2024-01-26 EST') }
  ]))
  );

  // @ts-expect-error server components aren't built into RTL render function yet
  render(await Page({ params: { postSlug: 'test-post' } }));
  expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
})