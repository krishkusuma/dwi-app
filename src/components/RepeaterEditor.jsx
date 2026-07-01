import FieldRenderer from "./FieldRenderer";

export default function RepeaterEditor({
  items,
  itemFields,
  onChange,
  maxItems = null, // null = tidak ada limit
  itemLabel = "Item",
}) {
  const isMaxReached = maxItems !== null && items.length >= maxItems;

  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    onChange(newItems);
  };

  const addItem = () => {
    if (isMaxReached) return;
    const emptyItem = {};
    itemFields.forEach((f) => (emptyItem[f.key] = ""));
    onChange([...items, emptyItem]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="border rounded p-3 mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">
              {itemLabel} #{index + 1}
            </span>
            <button
              onClick={() => removeItem(index)}
              className="text-xs text-red-500"
            >
              Hapus
            </button>
          </div>
          {itemFields.map((field) => (
            <FieldRenderer
              key={field.key}
              field={field}
              value={item[field.key]}
              onChange={(key, value) => updateItem(index, key, value)}
            />
          ))}
        </div>
      ))}

      <button
        onClick={addItem}
        disabled={isMaxReached}
        className={`text-sm px-3 py-1.5 border rounded w-full ${
          isMaxReached ? "text-gray-400 cursor-not-allowed" : ""
        }`}
      >
        {isMaxReached ? `Maksimal ${maxItems} ${itemLabel}` : `+ Tambah ${itemLabel}`}
      </button>
    </div>
  );
}
