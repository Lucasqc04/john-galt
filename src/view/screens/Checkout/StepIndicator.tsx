type Step = {
  title: string;
};

type StepIndicatorProps = {
  currentStep: number;
  steps: Step[];
};

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full flex items-center py-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full justify-between">
          <div className="flex flex-col items-center justify-end gap-y-1 px-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                index + 1 === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 border-blue-500 dark:bg-gray-700 dark:text-blue-300 dark:border-blue-300'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm text-center max-w-24 dark:text-gray-300">
              {step.title}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`flex-grow h-1 ${
                index + 1 < currentStep
                  ? 'bg-blue-500'
                  : 'bg-gray-100 dark:bg-gray-600'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
