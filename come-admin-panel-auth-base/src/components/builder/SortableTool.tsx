import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '@/store/useBuilderStore';

type Props = { id: string; children: React.ReactNode };

export default function SortableTool({ id, children }: Props) {
  const { tools, setSelectedTool, cloneTool, deleteTool } = useBuilderStore();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const tool = tools.find((t) => t.id === id); // ✅ remove predicate

  if (!tool) return null;

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="border p-2 rounded">
      <div className="flex justify-between">
        {children}
        <div>
          <button onClick={() => setSelectedTool(tool.id)}>Edit</button>
          <button onClick={() => cloneTool(tool.id)}>Clone</button>
          <button onClick={() => deleteTool(tool.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
