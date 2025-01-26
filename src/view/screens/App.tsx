import { TourProvider } from '@reactour/tour';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from '../routes/BrowserRouter';

const isFirstVisit = !localStorage.getItem('tourCompleted');

export function App() {
  const { t } = useTranslation();

  const steps = [
    {
      selector: '.image-step',
      content: t('guide.imageStep'),
      highlightedSelectors: ['.ReactModal__Content'],
      mutationObservables: ['.ReactModal__Overlay'],
    },
    {
      selector: '.brl-step',
      content: t('guide.brlStep'),
    },
    {
      selector: '.proceed-button-step',
      content: t('guide.proceedButtonStep'),
    },
  ];
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <TourProvider
        steps={steps}
        disableInteraction={isFirstVisit}
        defaultOpen={isFirstVisit}
        beforeClose={() => localStorage.setItem('tourCompleted', 'true')}
      >
        <BrowserRouter />
      </TourProvider>
    </>
  );
}
