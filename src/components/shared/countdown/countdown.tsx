type CountdownProps = {
  hours: number;
  minutes: number;
  seconds: number;
  label?: string;
};

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function Countdown({ hours, minutes, seconds, label }: CountdownProps) {
  const parts = [
    { label: "Horas", value: pad(hours) },
    { label: "Min", value: pad(minutes) },
    { label: "Seg", value: pad(seconds) },
  ];

  return (
    <div>
      {label ? <p className="mb-3 text-caption text-muted-foreground">{label}</p> : null}
      <div className="grid grid-cols-3 gap-2">
        {parts.map((part) => (
          <div
            key={part.label}
            className="rounded-2xl bg-card p-3 text-center shadow-soft"
          >
            <p className="font-heading text-2xl font-semibold tabular-nums">
              {part.value}
            </p>
            <p className="text-caption text-muted-foreground">{part.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
