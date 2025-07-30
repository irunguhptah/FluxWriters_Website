import React from "react";

export default function WriterPreferenceSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Writer Preference</label>
      <select
        className="w-full border rounded p-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="any">Any Qualified Writer</option>
        <option value="top-rated">Top Rated Writer</option>
        <option value="subject-expert">Subject Expert</option>
        <option value="preferred">My Preferred Writer</option>
      </select>
    </div>
  );
}