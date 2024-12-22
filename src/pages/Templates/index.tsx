import { useState } from "react";
import { templates } from "../../assets/images";
import TemplateList from "../TemplateList";
import TemplateEditor from "../TemplateEditor";
import Header from "../../components/Header";

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <div className="h-full bg-gray-900 pb-10">
      <Header />
      <div className="mt-10 flex flex-col items-center">
        {!selectedTemplate ? (
          <TemplateList templates={templates} onSelect={setSelectedTemplate} />
        ) : (
          <TemplateEditor />
        )}
      </div>
    </div>
  );
}

export default Templates;
