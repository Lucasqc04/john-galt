import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InsertNewsletter } from '../../../../domain/entities/Newsletter.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';
import { Loader } from '../../../components/Loader';

export function Newsletter() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<InsertNewsletter>();

  const { register, handleSubmit } = form;

  const onSubmit: SubmitHandler<InsertNewsletter> = async (data) => {
    setLoading(true);
    try {
      const { result } = await UseCases.newsletter.insert.execute(data);

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO!');
            return;
          default:
            alert('ERRO DESCONHECIDO');
            return;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) <Loader />;

  return (
    <div className="mx-auto bg-white dark:bg-gray-600 w-[80%] p-6 rounded-lg shadow-2xl">
      <div>
        <h3 className="dark:text-white text-2xl md:text-3xl font-bold text-center">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-xl mt-6 dark:text-white text-center">
          Subscribe to our newsletter and stay up to date with the latest news,
          updates, and exclusive offers. Get valuable insights. Join our
          community today!
        </p>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-transparent border border-gray-500 flex p-1 rounded-full mt-12"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="text-gray-300 w-full outline-none bg-transparent text-sm px-4 py-3"
              {...register('email')}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white hover:bg-orange-300 transition-all dark:text-white text-sm rounded-full px-6 py-3"
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
