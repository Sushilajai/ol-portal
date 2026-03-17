import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { mockCompanies } from "../data/mockData";

interface CompanyAutocompleteProps {
  value: string;
  onChange: (compId: string, compName: string) => void;
  placeholder?: string;
}

const CompanyAutocomplete = ({ value, onChange, placeholder = "Search company..." }: CompanyAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = mockCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.comp_id.includes(searchTerm)
    );
    setFilteredCompanies(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (company: typeof mockCompanies[0]) => {
    onChange(company.comp_id, company.name);
    setSearchTerm("");
    setIsOpen(false);
  };

  const selectedCompany = mockCompanies.find((c) => c.comp_id === value);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          {selectedCompany ? (
            <div>
              <p className="text-sm font-medium text-slate-900">{selectedCompany.name}</p>
              <p className="text-xs text-slate-500">{selectedCompany.comp_id}</p>
            </div>
          ) : (
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400"
            />
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.comp_id}
                onClick={() => handleSelect(company)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors duration-200"
              >
                <p className="text-sm font-medium text-slate-900">{company.name}</p>
                <p className="text-xs text-slate-500">{company.comp_id} • {company.status}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              No companies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyAutocomplete;
