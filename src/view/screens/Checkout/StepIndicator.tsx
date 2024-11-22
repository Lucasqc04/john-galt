import classNames from 'classnames';
import { ReactNode } from 'react';

type Step = {
  icon: ReactNode;
};

type StepIndicatorProps = {
  currentStep: number;
  steps: Step[];
  stepRanges: { [key: number]: number[] };
};

export function StepIndicator({
  currentStep,
  steps,
  stepRanges,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isActive = stepRanges[index + 1]?.includes(currentStep);

        return (
          <>
            <div key={index} className="flex items-center">
              <div
                className={classNames(
                  'w-12 h-12 flex items-center justify-center rounded-full border-2',
                  isActive
                    ? 'bg-orange-primary text-white'
                    : 'bg-primary-dark text-white',
                )}
              >
                {step.icon}
              </div>
            </div>
            {index !== steps.length - 1 && (
              <hr
                className={classNames(
                  'w-full mx-2',
                  isActive ? 'bg-gray-300' : 'bg-gray-100',
                )}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
