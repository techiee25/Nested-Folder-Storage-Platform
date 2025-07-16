import  { useState } from "react";
import { ChevronRight, ChevronDown, Folder, Database, FileText, Clock, User } from "lucide-react";

const FileNode = ({ node, onFileClick }: any) => {
  const [expanded, setExpanded] = useState(false);
  const isFolder = node.type === "folder";

  const toggle = () => setExpanded(!expanded);

  const renderIcon = () => {
    if (isFolder) return <Folder className="w-4 h-4 text-blue-500" />;
    if (node.fileType === "csv") return <Database className="w-4 h-4 text-green-500" />;
    if (node.fileType === "pdf") return <FileText className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getFileTypeColor = () => {
    if (isFolder) return "hover:bg-blue-50";
    if (node.fileType === "csv") return "hover:bg-green-50";
    if (node.fileType === "pdf") return "hover:bg-red-50";
    return "hover:bg-slate-50";
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center space-x-2 px-2 py-2 rounded-lg cursor-pointer transition-all duration-150 ${getFileTypeColor()}`}
        onClick={() => (isFolder ? toggle() : onFileClick(node))}
      >
        {/* Expand/Collapse Arrow */}
        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {isFolder ? (
            expanded ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
        </div>

        {/* File/Folder Icon */}
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>

        {/* File/Folder Info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-900 truncate">{node.name}</p>
            {node.type === "file" && (
              <span className="text-xs text-slate-500 uppercase font-medium px-2 py-1 bg-slate-100 rounded-full ml-2">
                {node.fileType}
              </span>
            )}
          </div>
          
          {/* File metadata */}
          <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(node.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{node.modifiedBy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {expanded && isFolder && node.children.length > 0 && (
        <div className="ml-6 mt-1 space-y-1 border-l border-slate-200 pl-4">
          {node.children.map((child: any, idx: number) => (
            <FileNode key={idx} node={child} onFileClick={onFileClick} />
          ))}
        </div>
      )}

      {/* Empty folder indicator */}
      {expanded && isFolder && node.children.length === 0 && (
        <div className="ml-6 mt-1 border-l border-slate-200 pl-4">
          <div className="text-xs text-slate-500 italic py-2">Empty folder</div>
        </div>
      )}
    </div>
  );
};

export default FileNode;