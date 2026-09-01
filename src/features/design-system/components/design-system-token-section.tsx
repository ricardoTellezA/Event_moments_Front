import { DesignSection } from "@/features/design-system/components/design-section";
import { TokenSwatch } from "@/features/design-system/components/token-swatch";
import { tokenSwatches } from "@/features/design-system/data/design-system-tokens";

export function DesignSystemTokenSection() {
  return (
    <DesignSection title="Tokens">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tokenSwatches.map((token) => (
          <TokenSwatch key={token.name} {...token} />
        ))}
      </div>
    </DesignSection>
  );
}
