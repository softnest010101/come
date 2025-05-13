'use client';

export type ChatBotConfig = {
  welcomeMessage: string;
  model: string;
};

type Props = {
  config: ChatBotConfig;
};

export default function ChatBotTool({ config }: Props) {
  const { welcomeMessage, model } = config;

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-purple-800 mb-2 flex items-center gap-2">
        🤖 ChatBot Tool
      </h3>
      <ul className="text-sm text-purple-900 space-y-1">
        <li>
          <strong>Welcome Message:</strong> {welcomeMessage}
        </li>
        <li>
          <strong>Model:</strong> {model}
        </li>
      </ul>
      <div className="mt-4 italic text-xs text-gray-600">
        This is a preview. Chat logic will be implemented soon.
      </div>
    </div>
  );
}
