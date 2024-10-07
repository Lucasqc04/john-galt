import { BlogLinks } from './partials/BlogLinks';
import { Hero } from './partials/Hero';
import { Newsletter } from './partials/Newsletter/Newsletter';
import { PositivePoints } from './partials/PositivePoints';
import { Services } from './partials/Services';

export function Page() {
  return (
    <>
      <Hero />
      <PositivePoints />
      <BlogLinks />
      <Services />
      <Newsletter />
    </>
  );
}
