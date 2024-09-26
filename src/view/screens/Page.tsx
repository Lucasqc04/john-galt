import { BlogLinks } from './partials/BlogLinks';
import { Hero } from './partials/Hero';
import { Newsletter } from './partials/Newsletter';
import { PositivePoints } from './partials/PositivePoints';

export function Page() {
  return (
    <>
      <Hero />
      <PositivePoints />
      <BlogLinks />
      <Newsletter />
    </>
  );
}
