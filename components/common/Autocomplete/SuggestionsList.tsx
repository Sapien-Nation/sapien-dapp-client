import React from 'react';

interface Props {
  cursor: number;
  suggestions: Array<{ name: string; id: string }>;
  onSuggestionClick: (figure: { name: string; id: string }) => void;
  onSuggestionHover: (index: number) => void;
}

const SuggestionsList = ({
  cursor,
  suggestions,
  onSuggestionClick,
  onSuggestionHover,
}: Props) => (
  <ul
    tabIndex={-1}
    className="bg-white rounded-lg w-full mt-1 z-10 absolute px-1 py-1 border-b border-gray-200"
  >
    {suggestions.map((figure, i) => (
      <li
        key={i}
        className={`w-full rounder-md text-left p-2 ${
          cursor === i ? 'bg-gray-50' : null
        }`}
        onMouseDown={() => onSuggestionClick(figure)}
        onMouseEnter={() => onSuggestionHover(i)}
      >
        <span>{figure.name}</span>
      </li>
    ))}
  </ul>
);

export default SuggestionsList;
