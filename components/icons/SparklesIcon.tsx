
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.75.75V9h3.75a.75.75 0 010 1.5H9.75V15a.75.75 0 01-1.5 0v-4.25H4.5a.75.75 0 010-1.5H8.25V5.25A.75.75 0 019 4.5zM13.5 15a.75.75 0 01.75.75V19.5h3.75a.75.75 0 010 1.5H14.25V25.5a.75.75 0 01-1.5 0v-4.25H9a.75.75 0 010-1.5h3.75V15.75a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
    <path d="M4.5 3.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM21 3.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3 20.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H3zM21 20.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM16.5 3.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
  </svg>
);

export default SparklesIcon;
