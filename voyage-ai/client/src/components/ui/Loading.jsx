export default function LoadingSpinner({ size = 'md', label }) {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-14 w-14 border-4',
  };

  return (
    <div className="relative">
      <div className={`animate-spin rounded-full ${sizes[size]} border-voyage-100 border-t-voyage-600 mx-auto`} />
      {size === 'lg' && (
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-navy-50 border-t-navy-800 mx-auto absolute inset-0" />
      )}
      {label && (
        <p className="mt-3 text-sm text-navy-400 text-center">{label}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-56 bg-navy-800" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-navy-800 rounded w-1/2" />
        <div className="h-4 bg-navy-800 rounded w-1/3" />
        <div className="h-4 bg-navy-800 rounded w-full" />
        <div className="h-4 bg-navy-800 rounded w-2/3" />
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-16 px-6">
      {Icon && (
        <div className="mx-auto w-16 h-16 bg-voyage-50 rounded-2xl flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-voyage-500" />
        </div>
      )}
      <h3 className="text-lg font-bold text-navy-800 mb-1">{title}</h3>
      {description && <p className="text-sm text-navy-400 mb-6 max-w-sm mx-auto">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}