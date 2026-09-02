export type PhoneNumber = {
  id: string;
  label: string;
  number: string;
  sortOrder: number;
};

/** Digits for tel:/wa.me; keeps leading + if present. */
export function phoneTelHref(number: string) {
  const trimmed = number.trim();
  const digits = trimmed.replace(/[^\d+]/g, "");
  if (!digits) return "";
  return `tel:${digits}`;
}

export function phoneWhatsAppHref(number: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}`;
}
