'use client';

import type { FC } from 'react';

type Props = {
  currentAccept: string[];
  onClose: () => void;
};

const COMMON_MIME_TYPES = [
  { label: 'Images', value: 'image/*' },
  { label: 'PDF', value: 'application/pdf' },
  { label: 'Word Docs', value: 'application/msword' },
  { label: 'Excel', value: 'application/vnd.ms-excel' },
  { label: 'Text', value: 'text/plain' },
  { label: 'ZIP', value: 'application/zip' },
];

const FileUploadHelperModal: FC<Props> = ({ currentAccept, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-md w-full max-w-md p-6 relative">
        <h3 className="text-lg font-bold mb-4">📚 MIME Types Helper</h3>

        <ul className="mb-4 space-y-2 text-sm text-gray-700">
          {COMMON_MIME_TYPES.map((type) => (
            <li key={type.value}>
              <strong>{type.label}</strong>: <code>{type.value}</code>{' '}
              {currentAccept.includes(type.value) && (
                <span className="text-green-600 ml-2">✓</span>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FileUploadHelperModal;
