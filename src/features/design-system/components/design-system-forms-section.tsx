import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemFormsSection() {
  return (
    <DesignSection title="Forms">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-label">Nombre del evento</span>
          <Input placeholder="Boda Ana & Luis" />
        </label>
        <label className="grid gap-2">
          <span className="text-label">Estado focus</span>
          <Input placeholder="Focus visible al navegar con teclado" />
        </label>
        <label className="grid gap-2">
          <span className="text-label">Disabled</span>
          <Input placeholder="No editable" disabled />
        </label>
        <label className="grid gap-2">
          <span className="text-label text-destructive">Error</span>
          <Input aria-invalid placeholder="Campo requerido" />
          <span className="text-caption text-destructive">
            Este campo es obligatorio.
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-label">Tipo de evento</span>
          <Select defaultValue="wedding">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">Boda</SelectItem>
              <SelectItem value="birthday">Cumpleanos</SelectItem>
              <SelectItem value="trip">Viaje</SelectItem>
            </SelectContent>
          </Select>
        </label>
        <label className="grid gap-2 lg:col-span-2">
          <span className="text-label">Mensaje para invitados</span>
          <Textarea placeholder="Comparte tus mejores recuerdos del evento." />
        </label>
        <div className="flex flex-wrap items-center gap-5">
          <label className="flex items-center gap-2 text-body-sm">
            <Checkbox defaultChecked /> Album publico
          </label>
          <label className="flex items-center gap-2 text-body-sm">
            <Switch defaultChecked /> Reveal automatico
          </label>
        </div>
        <RadioGroup defaultValue="24h" className="grid gap-3 sm:grid-cols-3">
          {["12h", "24h", "48h"].map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3 text-body-sm"
            >
              <RadioGroupItem value={value} />
              {value}
            </label>
          ))}
        </RadioGroup>
      </div>
    </DesignSection>
  );
}
