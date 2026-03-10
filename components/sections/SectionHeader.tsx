import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  viewAllHref?: string;
  viewAllLabel?: string;
  accentColor?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  viewAllHref,
  viewAllLabel = 'Voir tout',
  accentColor = 'text-emerald-400',
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-2.5">
          {Icon && <Icon className={`h-5 w-5 ${accentColor}`} />}
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-sm text-white/40 mt-1 ml-7">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={`text-sm font-medium ${accentColor} hover:opacity-70 transition-opacity`}
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
