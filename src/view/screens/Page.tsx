import { Products } from '../components/Products/Products';
import { BlogLinks } from './partials/BlogLinks';
import { Hero } from './partials/Hero';
import { PositivePoints } from './partials/PositivePoints';
import { Statistics } from './partials/Statistics';
// import { Services } from './partials/Services';

export function Page() {
  return (
    <>
      <Hero />
      <PositivePoints />
      <Statistics />
      <Products />
      <BlogLinks />
      {/* <Services /> */}
    </>
  );
}
