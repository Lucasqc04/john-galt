import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InsertNewsletter } from '../../../../domain/entities/Newsletter.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';

export function useNewsletter() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

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

  return {
    t,
    form,
    loading,
    register,
    onsubmit: handleSubmit(onSubmit),
  };
}
