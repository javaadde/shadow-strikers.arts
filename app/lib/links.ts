/** https://wa.me link for a phone in international digits-only form. */
export function whatsappLink(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

export function telLink(phone: string) {
  return `tel:+${phone.replace(/\D/g, "")}`;
}

/** "+91 98765 43210" for Indian numbers, "+<digits>" otherwise. */
export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}
