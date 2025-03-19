import { FileCheck, Upload, X } from 'lucide-react';
import React, { ChangeEvent } from 'react';

interface FileUploadFieldProps {
  id: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  accept?: string;
  required?: boolean;
  selectedFile?: File | null;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  id,
  label,
  onChange,
  error,
  accept = 'image/*, application/pdf',
  required = false,
  selectedFile,
}) => {
  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <label
          htmlFor={id}
          className={`
            flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer
            ${error ? 'border-red-500 bg-red-50' : 'border-white bg-black bg-opacity-70 hover:bg-black'}
            transition-colors duration-200
          `}
        >
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-6 h-6 text-orange-400 mb-2" />
              <span className="text-sm text-white">
                Clique para selecionar ou arraste o arquivo aqui
              </span>
              <span className="text-xs text-gray-400 mt-1">
                Formatos aceitos: PDF, JPG, PNG
              </span>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between p-2 bg-black bg-opacity-80 rounded border border-white">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-medium text-white truncate"
                      title={selectedFile.name}
                    >
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-gray-300">
                      {formatFileSize(selectedFile.size)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    const input = document.getElementById(
                      id,
                    ) as HTMLInputElement;
                    if (input) {
                      input.value = '';
                      onChange({
                        target: input,
                      } as ChangeEvent<HTMLInputElement>);
                    }
                  }}
                  className="p-1 hover:bg-gray-700 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>
          )}
          <input
            id={id}
            name={id}
            type="file"
            className="hidden"
            onChange={onChange}
            accept={accept}
            required={required}
          />
        </label>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUploadField;
