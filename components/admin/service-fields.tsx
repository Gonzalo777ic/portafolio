"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SERVICE_COLORS,
  SERVICE_ICON_NAMES,
  type ServiceColor,
  type ServiceIconName,
} from "@/lib/service";

type ServiceFieldsProps = {
  idPrefix: string;
  title?: string;
  description?: string;
  icon: ServiceIconName;
  iconColor: ServiceColor;
  sortOrder?: number;
  onIconChange: (value: ServiceIconName) => void;
  onColorChange: (value: ServiceColor) => void;
};

export function ServiceFields({
  idPrefix,
  title,
  description,
  icon,
  iconColor,
  sortOrder = 0,
  onIconChange,
  onColorChange,
}: ServiceFieldsProps) {
  return (
    <div className="space-y-4">
      <input type="hidden" name="icon" value={icon} />
      <input type="hidden" name="iconColor" value={iconColor} />

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-title`} className="text-white">
          Título
        </Label>
        <Input
          id={`${idPrefix}-title`}
          name="title"
          required
          defaultValue={title}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-description`} className="text-white">
          Descripción
        </Label>
        <Textarea
          id={`${idPrefix}-description`}
          name="description"
          required
          defaultValue={description}
          rows={4}
          className="bg-white/5 border-white/10 text-white min-h-28"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-white">Icono</Label>
          <Select
            value={icon}
            onValueChange={(value) => onIconChange(value as ServiceIconName)}
          >
            <SelectTrigger className="h-11 w-full bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_ICON_NAMES.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Color</Label>
          <Select
            value={iconColor}
            onValueChange={(value) => onColorChange(value as ServiceColor)}
          >
            <SelectTrigger className="h-11 w-full bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_COLORS.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-order`} className="text-white">
            Orden
          </Label>
          <Input
            id={`${idPrefix}-order`}
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={sortOrder}
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>
    </div>
  );
}
