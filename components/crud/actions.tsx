"use client";
import { Pencil, Trash2 } from "lucide-react";
export function RowActions({onEdit,onDelete}:{onEdit:()=>void;onDelete:()=>void}){return <div className="flex gap-1"><button onClick={onEdit} className="icon-button" title="Edit"><Pencil size={16}/></button><button onClick={onDelete} className="icon-button text-red-600" title="Delete"><Trash2 size={16}/></button></div>}
