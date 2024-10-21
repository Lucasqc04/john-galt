import { BlogLinks } from './partials/BlogLinks';
import { Hero } from './partials/Hero';
import { PositivePoints } from './partials/PositivePoints';
import { Products } from './partials/Products';
import { Statistics } from './partials/Statistics';

export function Page() {
  return (
    <>
      <Hero />
      <PositivePoints />
      <Statistics />
      <Products />
      <BlogLinks />
    </>
  );
}
