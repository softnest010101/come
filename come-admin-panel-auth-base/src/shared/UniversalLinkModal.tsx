"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import api from "@/lib/api";

type UniversalLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sourceId: number;
  sourceModel: string;
};

type TargetOption = { id: number; name?: string };

const modelToEndpoint: Record<string, string> = {
  project: "/projects/my",
  page: "/pages/my",
  component: "/components/my",
  widget: "/widgets/my",
  template: "/templates/my",
  widgetInstance: "/widget-instances/my",
  componentInstance: "/component-instances/my",
};

export default function UniversalLinkModal({
  isOpen,
  onClose,
  onSuccess,
  sourceId,
  sourceModel,
}: UniversalLinkModalProps) {
  const [targetModel, setTargetModel] = useState<string>("");
  const [targetId, setTargetId] = useState<number | "">("");
  const [options, setOptions] = useState<TargetOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!targetModel) return setOptions([]);

    const endpoint = modelToEndpoint[targetModel];
    if (!endpoint) {
      toast.warn(`⚠️ No endpoint for model: ${targetModel}`);
      return;
    }

    api
      .get(endpoint)
      .then((res) => setOptions(res.data))
      .catch(() => toast.error(`❌ Failed to load ${targetModel}s`));
  }, [targetModel]);

  const handleLink = async () => {
    if (targetId === "" || isNaN(Number(targetId))) {
      toast.error("❌ Please select a valid item");
      return;
    }

    try {
      setIsLoading(true);
      await api.post(`/${sourceModel}s/${sourceId}/link/${targetModel}/${targetId}`);
      toast.success("✅ Linked successfully");
      onSuccess();
      onClose();
    } catch {
      toast.error("❌ Linking failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Dialog.Panel className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <Dialog.Title className="text-lg font-semibold text-[#4b3621] mb-4">
          🔗 Link {sourceModel} to {targetModel || "?"}
        </Dialog.Title>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#5b4636] mb-1">Target Model</label>
            <select
              value={targetModel}
              onChange={(e) => {
                setTargetModel(e.target.value);
                setTargetId("");
              }}
              className="w-full border rounded p-2 text-sm text-[#4b3621]"
            >
              <option value="">Select model...</option>
              {Object.keys(modelToEndpoint).map((model) => (
                <option key={model} value={model}>
                  {model.charAt(0).toUpperCase() + model.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {targetModel && (
            <div>
              <label className="block text-sm text-[#5b4636] mb-1">Select {targetModel}</label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(Number(e.target.value))}
                className="w-full border rounded p-2 text-sm text-[#4b3621]"
              >
                <option value="">Select {targetModel}</option>
                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name || "Untitled"} (ID: {item.id})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 text-[#4b3621] rounded hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleLink}
            disabled={isLoading || !targetModel || !targetId}
            className="px-4 py-2 text-sm bg-[#a67857] text-white rounded hover:bg-[#946548] disabled:opacity-50"
          >
            {isLoading ? "Linking..." : "Link"}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
