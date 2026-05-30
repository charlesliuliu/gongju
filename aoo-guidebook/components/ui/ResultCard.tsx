interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  highlight?: boolean;
  icon?: string;
}

export default function ResultCard({
  title,
  value,
  unit,
  description,
  highlight = false,
  icon,
}: ResultCardProps) {
  return (
    <div
      className={`p-5 rounded-xl border transition-all duration-200 ${
        highlight
          ? 'bg-primary-50 border-primary-200 ring-1 ring-primary-200/50'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
      </div>
      <p className={`text-2xl font-bold tracking-tight ${highlight ? 'text-primary-700' : 'text-gray-900'}`}>
        {value}
        {unit && <span className="text-base font-medium text-gray-400 ml-1.5">{unit}</span>}
      </p>
      {description && (
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}
