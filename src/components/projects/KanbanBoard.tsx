'use client';

import React from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    pointerWithin,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskStatus } from '@/types/project';
import { useProjectStore } from '@/stores/projectStore';
import { GripVertical, MoreHorizontal, Calendar, User } from 'lucide-react';

// --- Types ---
interface KanbanBoardProps {
    projectId: string;
}

type ColumnType = {
    id: TaskStatus;
    title: string;
    color: string;
};

const COLUMNS: ColumnType[] = [
    { id: 'Todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'Review', title: 'Review', color: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { id: 'Done', title: 'Done', color: 'bg-green-50 dark:bg-green-900/20' },
];

// --- Sortable Task Item ---
function SortableTaskItem({ task }: { task: Task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id, data: { type: 'Task', task } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const priorityColors = {
        'Low': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 ring-1 ring-slate-500/10',
        'Medium': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-blue-500/20',
        'High': 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 ring-1 ring-orange-500/20',
        'Critical': 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/20',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 mb-3"
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 leading-snug">
                {task.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                {task.description}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No date'}
                </div>
                {task.assigneeId && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
                        U
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Column Component ---
function KanbanColumn({ column, tasks }: { column: ColumnType, tasks: Task[] }) {
    const { setNodeRef } = useSortable({ id: column.id, data: { type: 'Column', column } });

    return (
        <div className="flex flex-col h-full min-w-[300px] w-80">
            <div className="flex items-center justify-between p-4 mb-2">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${column.id === 'Todo' ? 'bg-slate-400' :
                            column.id === 'In Progress' ? 'bg-blue-500' :
                                column.id === 'Review' ? 'bg-orange-500' : 'bg-green-500'
                        }`} />
                    <h3 className="font-bold text-sm text-gray-700 dark:text-gray-200">{column.title}</h3>
                </div>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {tasks.length}
                </span>
            </div>
            <div
                ref={setNodeRef}
                className="flex-1 p-2 bg-gray-50/50 dark:bg-gray-900/20 rounded-xl border-2 border-dashed border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-colors overflow-y-auto min-h-[500px]"
            >
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => (
                        <SortableTaskItem key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

// --- Main Board ---
export default function KanbanBoard({ projectId }: KanbanBoardProps) {
    const allTasks = useProjectStore(state => state.tasks);
    const tasks = React.useMemo(() =>
        allTasks.filter(t => t.projectId === projectId),
        [allTasks, projectId]
    );
    const moveTask = useProjectStore(state => state.moveTask);

    const [activeId, setActiveId] = React.useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement before drag starts (prevents accidental clicks)
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        // Find the containers
        const activeId = active.id;
        const overId = over.id;

        // If over a column, we might want to move it visually (optional for simple implementation)
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeTask = tasks.find(t => t.id === active.id);
        const overContainerId = over.data.current?.sortable?.containerId || over.id; // Column ID or Task ID's container

        // Determine the target status
        // If dropped on a column directly
        let newStatus: TaskStatus | undefined;

        if (COLUMNS.some(c => c.id === over.id)) {
            newStatus = over.id as TaskStatus;
        } else {
            // Dropped on another task, find that task's status
            const overTask = tasks.find(t => t.id === over.id);
            if (overTask) {
                newStatus = overTask.status;
            }
        }

        if (activeTask && newStatus && activeTask.status !== newStatus) {
            moveTask(activeTask.id, newStatus);
        }

        setActiveId(null);
    };

    return (
        <div className="h-full overflow-x-auto pb-4">
            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 h-full min-w-fit px-4">
                    {COLUMNS.map(col => (
                        <KanbanColumn
                            key={col.id}
                            column={col}
                            tasks={tasks.filter(t => t.status === col.id)}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeId ? (
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-blue-500 rotate-2 cursor-grabbing opacity-90">
                            {/* Simplified overlay preview */}
                            <h4 className="font-bold text-gray-900 dark:text-white">Moving Task...</h4>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
