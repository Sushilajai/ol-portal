import { Pencil, Trash2 } from "lucide-react";

const AddCompany = () => {
  return (
    <div className="p-3 bg-slate-50 min-h-screen">

      <h4 className="text-lg font-semibold text-slate-800 mb-3">
        Add Company Details
      </h4>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">

        {/* LEFT — FORM */}
        <div className="xl:col-span-2 bg-white rounded-md shadow-sm p-3 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Company Information
          </h2>

          <div className="space-y-2">

            <div>
              <label className="text-[11px] text-slate-600">
                Company Name
              </label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600">
                Company Petition No
              </label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600">
                Select Liquidation Section
              </label>
              <select
                className="w-full mt-1 px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-200 focus:outline-none"
              >
                <option>Section 34</option>
                <option>Section 45</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-600">
                Date of Winding Up
              </label>
              <input
                type="date"
                className="w-full mt-1 px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded text-xs transition no-button-style">
              Submit
            </button>

          </div>
        </div>

        {/* RIGHT — TABLE */}
        <div className="xl:col-span-3 bg-white rounded-md shadow-sm p-3 border border-slate-200">

          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Company List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">

              <thead className="bg-slate-100 text-slate-600 uppercase">
                <tr>
                  <th className="text-left px-2 py-1">Company Name</th>
                  <th className="text-left px-2 py-1">Petition No</th>
                  <th className="text-left px-2 py-1">Section</th>
                  <th className="text-left px-2 py-1">Winding Date</th>
                  <th className="text-center px-2 py-1">Edit</th>
                  <th className="text-center px-2 py-1">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-2 py-1">ABC Pvt Ltd</td>
                  <td className="px-2 py-1">CP-2024/01</td>
                  <td className="px-2 py-1">Section 34</td>
                  <td className="px-2 py-1">12-05-2024</td>

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

export default AddCompany;