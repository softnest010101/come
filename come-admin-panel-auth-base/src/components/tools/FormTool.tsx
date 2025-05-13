'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export type Field = {
  label: string;
  name: string;
  type: string;
};

export type FormConfig = {
  fields: Field[];
  validation: boolean;
  submitEndpoint: string;
};

type Props = {
  config: FormConfig;
};

export default function FormTool({ config }: Props) {
  const { fields, validation, submitEndpoint } = config;

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(true);

  // ✅ Tool config validation (optional future logic)
  useEffect(() => {
    const isValidConfig =
      Array.isArray(fields) &&
      fields.every(
        (f) =>
          typeof f.label === "string" &&
          typeof f.name === "string" &&
          typeof f.type === "string"
      );
    setIsValid(isValidConfig);
  }, [fields]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(submitEndpoint, formData);
      toast.success("✅ Form submitted successfully");
    } catch (err) {
      toast.error("❌ Failed to submit form");
      console.error(err);
    }
  };

  if (!isValid) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for FormTool.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="rounded border border-green-200 bg-green-50 p-4 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
        📄 Form Tool
      </h3>

      {/* ⚠ array field type warning */}
      {Array.isArray(fields) && fields.length > 0 ? (
        <div className="space-y-3">
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="block mb-1 text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={validation}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">
          ⚠️ No valid fields configured.
        </p>
      )}

      {/* 🧰 Future custom field editor trigger */}
      <div className="mt-3 text-sm text-green-700 italic">
        Custom Field Editor coming soon...
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
