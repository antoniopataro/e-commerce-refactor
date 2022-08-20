import React, { useState } from "react";

interface Props {
  label: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function Checkbox({ label, tags, setTags }: Props) {
  const labelToSlug = (tag: string) => {
    return tag.toLowerCase().replace(/ /g, "-");
  };

  const [checked, setChecked] = useState(tags.includes(labelToSlug(label)));

  const handleTagClick = () => {
    setChecked(!checked);

    if (tags.includes(labelToSlug(label))) {
      setTags(tags.filter((tag) => tag !== labelToSlug(label)));
      return;
    }

    setTags([...tags, labelToSlug(label)]);
  };

  return (
    <label onChange={() => handleTagClick()} className="flex items-center gap-2 pl-4">
      <input name="label" type="checkbox" className="hidden" />
      <span
        className={`relative flex w-4 h-4 items-center justify-center rounded ring-1 ring-gray-300 cursor-pointer transition-colors after:absolute after:content-[''] after:w-[4px] after:h-[6px] after:border-b-2 after:border-r-2 after:border-white after:rotate-[40deg] after:transition-opacity after:bg-transparent ${
          checked
            ? "ring-0 bg-violet-700 hover:bg-violet-900 after:opacity-100"
            : "bg-gray-100 hover:bg-gray-300  after:opacity-0"
        }  `}
      />
      <span className={`text-sm ${checked ? "text-violet-700" : "text-gray-300"}`}>{label}</span>
    </label>
  );
}

export default Checkbox;
