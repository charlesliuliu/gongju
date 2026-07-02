import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle: string;
  emoji?: string;
  bgImage?: string;
  gradient?: string;
  children?: ReactNode;
};

export default function HeroSection({
  title,
  subtitle,
  emoji,
  bgImage,
  gradient = 'from-primary-600 via-primary-700 to-emerald-800',
  children,
}: Props) {
  return (
    <section
      className={`relative bg-gradient-to-br ${gradient} py-20 md:py-28 overflow-hidden`}
    >
      {/* Background Image Overlay */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
        </>
      )}

      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />

      <div className="container-custom text-center relative">
        {emoji && <span className="inline-block text-5xl mb-6">{emoji}</span>}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
