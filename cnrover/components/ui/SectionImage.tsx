type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export default function SectionImage({ src, alt, caption }: Props) {
  return (
    <figure className="my-8">
      <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
