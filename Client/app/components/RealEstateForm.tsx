import React from "react";
import type { DetailItemProps, LabelProps, RealEstateFormProps } from "../types";
import type { PropertyDetails } from "../types";

export const REAL_ESTATE_PROPERTY_DETAILS: PropertyDetails = {
  address: "12012 Crest Ct, Beverly Hills, CA 90210",
  price: "$10,183,985",
  bedrooms: 5,
  bathrooms: 6.5,
  squareFootage: 6100,
  features:
    "Luxury estate, three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location.",
};

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-slate-300 mb-1 ${className}`}
    >
      {children}
    </label>
  );
}

export const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div>
      <span className="font-semibold text-slate-200">{label}:</span>
      <span className="text-slate-300 ml-2">{value}</span>
    </div>
  );
};

export const RealEstateForm = ({
  formData,
  onFormChange,
  onSubmit,
  isLoading,
}: RealEstateFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFormChange({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const TOUR_STYLE_OPTIONS = [
    "Luxury Showcase",
    "Family-Friendly Walkthrough",
    "Modern & Sleek",
    "Cozy & Charming",
    "Investor's Brief",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div>
        <h3 className="text-lg font-semibold text-sky-400 mb-3">
          Property Details (Fixed)
        </h3>
        <div className="space-y-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
          <DetailItem
            label="Address"
            value={REAL_ESTATE_PROPERTY_DETAILS.address}
          />
          <DetailItem
            label="Price"
            value={REAL_ESTATE_PROPERTY_DETAILS.price}
          />
          <DetailItem
            label="Bedrooms"
            value={REAL_ESTATE_PROPERTY_DETAILS.bedrooms}
          />
          <DetailItem
            label="Bathrooms"
            value={REAL_ESTATE_PROPERTY_DETAILS.bathrooms}
          />
          <DetailItem
            label="Sq. Footage"
            value={`${REAL_ESTATE_PROPERTY_DETAILS.squareFootage.toLocaleString()} sq ft`}
          />
          <div className="pt-1">
            <span className="font-semibold text-slate-200">Features:</span>
            <p className="text-slate-300 text-sm mt-1">
              {REAL_ESTATE_PROPERTY_DETAILS.features}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="tourStyle">Select Tour Style</Label>
        <select
          id="tourStyle"
          name="tourStyle"
          value={formData.tourStyle}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-200 text-slate-100"
        >
          {TOUR_STYLE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-6 py-3 font-semibold text-white rounded-lg transition-all duration-300 ease-in-out
                    ${
                      isLoading
                        ? "bg-slate-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:ring-4 focus:ring-sky-300 focus:outline-none transform hover:scale-105 active:scale-95"
                    }`}
      >
        {isLoading
          ? "Generating Tour Script..."
          : "Generate Real Estate Tour Script"}
      </button>
    </form>
  );
};
