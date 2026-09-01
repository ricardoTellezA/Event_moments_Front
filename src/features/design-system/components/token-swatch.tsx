type TokenSwatchProps = {
  name: string;
  className: string;
  value: string;
};

export function TokenSwatch({ name, className, value }: TokenSwatchProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className={`h-20 rounded-xl border border-border ${className}`} />
      <div className="mt-3">
        <p className="text-label">{name}</p>
        <p className="text-caption text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
