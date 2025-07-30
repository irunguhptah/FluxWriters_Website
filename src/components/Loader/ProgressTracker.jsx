import { CheckCircle } from "lucide-react";

export default function ProgressTracker({ currentStep }) {
  const steps = ["Awaiting Writer", "Writer Assigned", "In Progress"];

  return (
    <div className="px-4 py-6">
      <div className="relative" style={{ minHeight: 64 }}>
        {/* Progress line */}
        <div
          className="absolute left-0 right-0 top-7/2 -translate-y-1/2 h-1 bg-gray-100 rounded-full"
          style={{ top: 28 / 2, zIndex: 0 }}
        />
        <div
          className="absolute left-0 top-7/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{
            top: 28 / 2,
            width:
              steps.length === 1
                ? "100%"
                : `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            zIndex: 1,
          }}
        />

        {/* Step Circles and Labels */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const left =
            steps.length === 1
              ? "50%"
              : `calc(${(index / (steps.length - 1)) * 100}% - 14px)`;

          return (
            <div
              key={step}
              className="flex flex-col items-center"
              style={{
                position: "absolute",
                left,
                top: 0,
                width: 56,
                zIndex: 2, // Ensure circles and labels are above the progress line
              }}
            >
              <div
                className={`flex items-center justify-center h-7 w-7 rounded-full border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-blue-500 border-blue-500 shadow-sm"
                      : isCurrent
                      ? "bg-white border-blue-500 shadow-md"
                      : "bg-gray-100 border-gray-200"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : (
                  <span
                    className={`text-sm transition-colors ${
                      isCurrent
                        ? "text-blue-600 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {stepNumber}
                  </span>
                )}
              </div>
              <span
                className={`mt-2 text-xs text-center max-w-[90px] truncate transition-all ${
                  isCurrent
                    ? "font-medium text-blue-600 scale-105"
                    : "text-gray-400"
                }`}
                style={{ width: 90 }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}