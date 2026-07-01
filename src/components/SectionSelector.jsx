import { standardMenuSections, premiumMenuSections } from "../data/menuConfig";

export default function SectionSelector({ value, onChange, isPremiumUser = false }) {
  const menuSections = isPremiumUser
    ? [...standardMenuSections, ...premiumMenuSections]
    : standardMenuSections;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded mb-4 font-medium"
    >
      {menuSections.map((section) => (
        <option key={section.value} value={section.value}>
          {section.label}
        </option>
      ))}
    </select>
  );
}
