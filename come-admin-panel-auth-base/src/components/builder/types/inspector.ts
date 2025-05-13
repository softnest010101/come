export type InspectorFieldType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'array'; // ✅ დამატებულია 'array'

/**
 * Defines one editable field in the Tool Inspector UI
 */
export type InspectorField<T> = {
  key: keyof T;
  label: string;
  type: InspectorFieldType;
  options?: string[];
};
