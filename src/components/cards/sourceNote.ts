import { photoSource } from "../Photo";

/** The source note on a picture that is not the owner's own photo (constitution: say where a picture comes from). */
export function sourceNote(name: string): string | null {
  const source = photoSource(name);
  if (source === "art") return "رسم توضيحي";
  if (source === "ai") return "رسمة توضيحية";
  if (source === "catalog") return "من الكتالوج";
  return null;
}
