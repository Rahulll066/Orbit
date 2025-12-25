interface FeatureSectionProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export function FeatureSection({
  tag,
  title,
  description,
  image,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center px-3 sm:px-4 md:px-20 lg:px-32 py-4 sm:py-8 md:py-12 gap-3 sm:gap-4 md:gap-8 bg-white`}
    >
      {/* Text */}
      <div className="w-full md:flex-1 flex flex-col justify-center">
        <p className="text-xs sm:text-sm text-yellow-500 font-semibold mb-2 sm:mb-3 md:mb-4">{tag}</p>
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="w-full md:flex-1 flex justify-center">
        <img
          src={image}
          alt={title}
          className="rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] h-auto object-cover"
        />
      </div>
    </div>
  );
}


