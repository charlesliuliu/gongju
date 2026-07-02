type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageCard({ src, alt, className = '' }: Props) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-md border border-gray-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
