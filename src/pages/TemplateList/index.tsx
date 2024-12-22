// import React from "react";

function TemplateList({ templates, onSelect }: any) {
  return (
    <div className="flex items-start flex-wrap gap-5 h-full bg-gray-900">
      {templates.map((template: any) => (
        <div
          key={template.id}
          className="template-card"
          onClick={() => onSelect(template)}
        >
          <img
            className="h-[100vh] w-[40vw] gap-5 "
            src={template.image}
            alt={template.name}
          />
          <h3>{template.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default TemplateList;
