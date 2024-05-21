import React, { useRef } from 'react';
import { useController } from 'react-hook-form';

interface FileInputProps {
  name: string;
  control: any;
  accept?: string;
  label?: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, control, accept, label = 'Choose File' }) => {
  const { field: { onChange, value } } = useController({ name, control });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={handleClick}>
        {label}
      </button>
    </div>
  );
};

export default FileInput;