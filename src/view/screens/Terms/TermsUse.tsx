import { useTranslation } from 'react-i18next';
export function TermsOfUse() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto p-6 mt-[20%] sm:mt-[10%] mb-20">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          {t('termsOfUse.title')}
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            1. {t('termsOfUse.platformTitle')}
          </h2>
          <p className="text-black dark:text-white">
            {t('termsOfUse.platformDescription1')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.platformDescription2')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.platformDescription3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            2. {t('termsOfUse.transactionsTitle')}
          </h2>
          <ol className="list-decimal pl-5 text-black dark:text-white">
            <li>{t('termsOfUse.transactionsStep1')}</li>
            <li>{t('termsOfUse.transactionsStep2')}</li>
            <li>{t('termsOfUse.transactionsStep3')}</li>
            <li>{t('termsOfUse.transactionsStep4')}</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            3. {t('termsOfUse.transactionDurationTitle')}
          </h2>
          <p className="text-black dark:text-white">
            {t('termsOfUse.transactionDurationDescription1')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.transactionDurationDescription2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            4. {t('termsOfUse.kycPoliciesTitle')}
          </h2>
          <p className="text-black dark:text-white">
            {t('termsOfUse.kycPoliciesDescription1')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.kycPoliciesDescription2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            5. {t('termsOfUse.globalReachTitle')}
          </h2>
          <p className="text-black dark:text-white">
            {t('termsOfUse.globalReachDescription1')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.globalReachDescription2')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.globalReachDescription3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            6. {t('termsOfUse.disputesTitle')}
          </h2>
          <ul className="list-disc pl-5 text-black dark:text-white">
            <li>{t('termsOfUse.disputesStep1')}</li>
            <li>{t('termsOfUse.disputesStep2')}</li>
            <li>{t('termsOfUse.disputesStep3')}</li>
            <li>{t('termsOfUse.disputesStep4')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            7. {t('termsOfUse.conductTitle')}
          </h2>
          <p className="text-black dark:text-white">
            {t('termsOfUse.conductDescription1')}
          </p>
          <ul className="list-disc pl-5 mt-4 text-black dark:text-white">
            <li>{t('termsOfUse.conductPenalty1')}</li>
            <li>{t('termsOfUse.conductPenalty2')}</li>
            <li>{t('termsOfUse.conductPenalty3')}</li>
            <li>{t('termsOfUse.conductPenalty4')}</li>
          </ul>
          <p className="text-black dark:text-white mt-4">
            {t('termsOfUse.conductDescription2')}
          </p>
        </section>

        <footer className="mt-8">
          <p className="text-black dark:text-white">{t('termsOfUse.footer')}</p>
        </footer>
      </div>
    </>
  );
}
