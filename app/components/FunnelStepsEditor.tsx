'use client';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  sublabel?: string;
  content: string;
  // ... other fields
}

function SortableStep({ step, onEdit }: { step: Step; onEdit: (step: Step) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-white border border-[#006E74]/10 rounded-xl hover:border-[#F35D2C]/30"
    >
      <button className="cursor-grab touch-none p-1" {...attributes} {...listeners}>
        <GripVertical size={18} className="text-[#6B5E5E]/40" />
      </button>
      <div className="flex-1">
        <h4 className="font-bold text-[#6B5E5E]">{step.label}</h4>
        {step.sublabel && <p className="text-xs text-[#6B5E5E]/60">{step.sublabel}</p>}
      </div>
      <button onClick={() => onEdit(step)} className="p-2 hover:bg-[#006E74]/10 rounded-lg">
        <Edit size={16} className="text-[#6B5E5E]/60" />
      </button>
    </div>
  );
}

export default function FunnelStepsEditor({
  steps,
  setSteps,
  onEditStep,
}: {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  onEditStep: (step: Step) => void;
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over?.id);
      const reordered = [...steps];
      const [removed] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, removed);
      setSteps(reordered);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {steps.map((step) => (
            <SortableStep key={step.id} step={step} onEdit={onEditStep} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}