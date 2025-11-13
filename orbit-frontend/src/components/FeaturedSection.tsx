interface FeatureSectionProps {
  tag: string;
  title: string;
  description: string;
  image: string;
}

export function FeatureSection({
  tag,
  title,
  description,
  image,
}: FeatureSectionProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-32 py-32 gap-20 bg-white">
      <div className="flex-1">
        <p className="text-yellow-500 font-semibold mb-4">{tag}</p>
        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={image}
          alt={title}
          className="rounded-2xl shadow-xl w-[550px] h-auto object-cover"
        />
      </div>
    </div>
  );
}

