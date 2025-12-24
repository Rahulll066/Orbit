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
      } items-center justify-between px-4 sm:px-10 md:px-20 lg:px-32 py-12 sm:py-20 md:py-20 gap-6 sm:gap-10 md:gap-16 bg-white`}
    >
      {/* Text */}
      <div className="flex-1 w-full">
        <p className="text-sm sm:text-base text-yellow-500 font-semibold mb-3 sm:mb-4">{tag}</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center w-full">
        <img
          src={image}
          alt={title}
          className="rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl w-full max-w-[300px] sm:max-w-[450px] md:max-w-[550px] h-auto object-cover"
        />
      </div>
    </div>
  );
}


