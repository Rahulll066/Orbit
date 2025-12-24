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
      } items-center justify-between px-10 md:px-32 py-24 md:py-20 gap-16 bg-white`}
    >
      {/* Text */}
      <div className="flex-1">
        <p className="text-yellow-500 font-semibold mb-4">{tag}</p>
        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={image}
          alt={title}
          className="rounded-2xl shadow-xl w-[550px] max-w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}


