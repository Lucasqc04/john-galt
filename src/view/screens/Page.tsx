import { useEffect } from 'react';
import { BlogLinks } from './partials/BlogLinks';
import { Hero } from './partials/Hero';
import { PositivePoints } from './partials/PositivePoints';
import { Products } from './partials/Products';
import { Statistics } from './partials/Statistics';

export function Page() {
  useEffect(() => {
    const fetchData = async () => {
      await fetch(import.meta.env.VITE_API_URL);
    };

    fetchData();
  }, []);

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
