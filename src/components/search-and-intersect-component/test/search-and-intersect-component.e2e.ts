import { newE2EPage } from '@stencil/core/testing';

describe('search-and-intersect-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<search-and-intersect-component></search-and-intersect-component>');

    const element = await page.find('search-and-intersect-component');
    expect(element).toHaveClass('hydrated');
  });
});
