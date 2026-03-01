import { Pencil, Trash2, UploadCloud, FileCheck } from "lucide-react";
import { useRef, useState } from "react";

const Document = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="p-4 bg-slate-50 min-h-screen">

      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        Submit Documents
      </h4>

      {/* 60 / 40 Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-4">

        {/* LEFT — FORM */}
        <div className="xl:col-span-6 bg-white rounded-lg shadow-sm p-4 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <Input label="Company Name" />
            <Input label="Company Petition No" />

            <Select label="Select Branch Officer" />
            <Input label="Date of Winding Up" type="date" />

            <Select label="Main Folder" />
            <Select label="Sub Folder" />

            {/* Upload */}
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-600 mb-1">
                Upload Document <p className="text-red-500 inline">*</p> UID: <p className="text-blue-500 inline">0132-0101-2627-0001</p>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <div
                onClick={handleClick}
                className="border border-dashed border-blue-400 bg-blue-50 rounded-md p-4 text-center cursor-pointer hover:bg-blue-100 transition"
              >
                <UploadCloud className="mx-auto text-slate-400" size={18} />
                <p className="mt-1 text-xs text-slate-600">
                  {fileName || "Click to upload file"}
                </p>
              </div>
            </div>
            {/* Upload multiple file*/}
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-600 mb-1">
               Multiple File Upload 
              </label>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple={true}
                max={5}
                onChange={handleFileChange}
              />

              <div
                onClick={handleClick}
                className="border border-dashed border-blue-400 bg-blue-50 rounded-md p-4 text-center cursor-pointer hover:bg-blue-100 transition"
              >
                <UploadCloud className="mx-auto text-slate-400" size={18} />
                <p className="mt-1 text-xs text-slate-600">
                  {fileName || "Click to upload file"}
                </p>
              </div>
            </div>
            {/* <Input label="Applicant Name" /> */}
            <Input label="File Physical Location" />

            <div className="flex items-center gap-4 text-xs text-slate-600">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-600" />
                Important
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-600" />
                Hindi
              </label>
            </div>

            <div className="md:col-span-2 flex gap-2 pt-1">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md text-xs transition no-button-style">
                Submit
              </button>
              <button className="flex-1 bg-slate-200 hover:bg-slate-300 py-1.5 text-white rounded-md text-xs transition no-button-style">
                Print
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-md text-xs transition no-button-style">
                Receipt
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT — TABLE */}
        <div className="xl:col-span-4 bg-white rounded-lg shadow-sm p-4 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Uploaded Documents
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">

              <thead className="bg-slate-100 text-slate-600 uppercase">
                <tr>
                  <th className="px-2 py-1 text-left">UID</th>
                  <th className="px-2 py-1 text-left">Company</th>
                  <th className="px-2 py-1 text-center">View</th>
                  <th className="px-2 py-1 text-center">Edit</th>
                  <th className="px-2 py-1 text-center">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-2 py-1">DOC-001</td>
                  <td className="px-2 py-1">
                    A.H.Baily Associates Pvt. Ltd.
                  </td>

                  <td className="px-2 py-1 text-center">
                    <FileCheck size={14} className="mx-auto text-slate-600 hover:text-green-600 cursor-pointer" />
                  </td>

                  <td className="px-2 py-1 text-center">
                    <Pencil size={14} className="mx-auto text-slate-600 hover:text-blue-600 cursor-pointer" />
                  </td>

                  <td className="px-2 py-1 text-center">
                    <Trash2 size={14} className="mx-auto text-slate-600 hover:text-red-600 cursor-pointer" />
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Document;


/* Reusable Components */

const Input = ({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) => (
  <div>
    <label className="block text-xs text-slate-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400 transition"
    />
  </div>
);

const Select = ({ label }: { label: string }) => (
  <div>
    <label className="block text-xs text-slate-600 mb-1">
      {label}
    </label>
    <select className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400 transition">
      <option>Select Option</option>
    </select>
  </div>
);