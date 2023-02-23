import { newSpecPage } from '@stencil/core/testing';
import { SearchAndIntersectComponent } from '../search-and-intersect-component';

describe('search-and-intersect-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SearchAndIntersectComponent],
      html: `<search-and-intersect-component></search-and-intersect-component>`,
    });
    expect(page.root).toEqualHtml(`
      <search-and-intersect-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </search-and-intersect-component>
    `);
  });
});
