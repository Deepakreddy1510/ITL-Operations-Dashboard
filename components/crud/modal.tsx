"use client";
import { X } from "lucide-react";

export function Modal({open,title,onClose,children}:{open:boolean;title:string;onClose:()=>void;children:React.ReactNode}){
  if(!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4" onMouseDown={onClose}>
    <div className="card max-h-[92vh] w-full max-w-2xl overflow-y-auto p-6" onMouseDown={e=>e.stopPropagation()}>
      <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold">{title}</h2><button className="icon-button" onClick={onClose}><X size={18}/></button></div>
      {children}
    </div>
  </div>
}
