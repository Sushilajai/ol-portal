import { Pencil, Trash2 } from "lucide-react";

const Amalgamation = () => {
  return (
    <div className="p-3 bg-slate-50 min-h-screen">

      <h4 className="text-lg font-semibold text-slate-800 mb-3">
        Amalgamation
      </h4>

      <div className="grid grid-cols-1 xl:grid-cols-10 gap-3">

        {/* LEFT — FORM (60%) */}
        <div className="xl:col-span-6 bg-white rounded-md shadow-sm p-3 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Amalgamation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <Input label="Transferer Companies" />
            <Input label="Transferee Company" />

            <Input label="Advocate / CA Name" />
            <Input label="Company Scheme Petition No" />

            <Input label="Company Summons for Direction No" />
            <Input label="Amal No" />

            <Input label="Document 1" />
            <Input label="Document 2" />

            <Input label="Document 3" />
            <Input label="Document 4" />

            <Input label="Document 5" />
            <Input label="File Physical Location" />

            <div className="md:col-span-2">
              <label className="block text-[11px] text-slate-600 mb-1">
                Document Upload
              </label>
              <input
                type="file"
                className="w-full text-xs border border-slate-300 rounded px-2 py-1"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2 text-xs text-slate-600">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-600" />
                Is Hindi
              </label>
            </div>

            <div className="md:col-span-2 flex gap-2 pt-1">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded text-xs transition no-button-style">
                Submit
              </button>
              <button className="flex-1 bg-slate-200 hover:bg-slate-300 py-1.5 text-white rounded text-xs transition no-button-style">
                Print
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded text-xs transition no-button-style">
                List
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT — TABLE (40%) */}
        <div className="xl:col-span-4 bg-white rounded-md shadow-sm p-3 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Amalgamation List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">

              <thead className="bg-slate-100 text-slate-600 uppercase">
                <tr>
                  <th className="px-2 py-1 text-left">Transferer</th>
                  <th className="px-2 py-1 text-left">Transferee</th>
                  <th className="px-2 py-1 text-left">Petition No</th>
                  <th className="px-2 py-1 text-center">Edit</th>
                  <th className="px-2 py-1 text-center">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-2 py-1">ABC Pvt Ltd</td>
                  <td className="px-2 py-1">XYZ Pvt Ltd</td>
                  <td className="px-2 py-1">CP-2024/09</td>

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

export default Amalgamation;


/* ---------- Reusable Compact Input ---------- */

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