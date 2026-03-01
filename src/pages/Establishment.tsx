import { Pencil, Trash2,UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
const Establishment = () => {
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
    <div className="p-3 bg-slate-50 min-h-screen">

      <h4 className="text-lg font-semibold text-slate-800 mb-3">
        Establishment
      </h4>

      <div className="grid grid-cols-1 xl:grid-cols-10 gap-3">

        {/* LEFT — FORM (60%) */}
        <div className="xl:col-span-6 bg-white rounded-md shadow-sm p-3 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Establishment Details
          </h2>

          <div className="space-y-2">

            <Input label="Name" />

            <Select label="Document Type" />

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

            <Input label="File Physical Location" />

            <div className="flex items-center gap-3 text-xs text-slate-600">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-600" />
                Is Hindi
              </label>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded text-xs transition no-button-style">
                Submit
              </button>
              <button className="flex-1 bg-slate-200 hover:bg-slate-300 py-1.5 text-white rounded text-xs transition no-button-style">
                Print
              </button>
             
            </div>

          </div>
        </div>

        {/* RIGHT — TABLE (Optional List Section) */}
        <div className="xl:col-span-4 bg-white rounded-md shadow-sm p-3 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Establishment List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">

              <thead className="bg-slate-100 text-slate-600 uppercase">
                <tr>
                  <th className="px-2 py-1 text-left">Name</th>
                  <th className="px-2 py-1 text-left">Document Type</th>
                  <th className="px-2 py-1 text-center">Edit</th>
                  <th className="px-2 py-1 text-center">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-2 py-1">Company Policy</td>
                  <td className="px-2 py-1">Notification</td>

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

export default Establishment;


/* ---------- Compact Reusable Inputs ---------- */

const Input = ({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) => (
  <div>
    <label className="block text-[11px] text-slate-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-200 focus:outline-none"
    />
  </div>
);

const Select = ({ label }: { label: string }) => (
  <div>
    <label className="block text-[11px] text-slate-600 mb-1">
      {label}
    </label>
    <select className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-200 focus:outline-none">
      <option>Select Option</option>
    </select>
  </div>
);