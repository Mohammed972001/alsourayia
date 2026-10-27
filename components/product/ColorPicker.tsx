'use client';

import { useState } from 'react';

/** The «available colours» chips; only the highlighted chip is client state. */
export function ColorPicker({ colors }: { colors: { name: string; value: string }[] }) {
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <p className="text-sm text-[#6B7280] mb-3">الألوان المتوفرة</p>
            <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                    <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelected(index)}
                        aria-pressed={selected === index}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm ${
                            selected === index ? 'border-[#1A1A1A] bg-[#F9FAFB]' : 'border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color.value }} />
                        <span className="text-[#4A4A4A]">{color.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
