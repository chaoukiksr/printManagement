"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { updateCostSettings } from "@/store/statistic/statisticHandler";

// Helper function to format numbers with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return formatNumber(amount.toFixed(2));
};

export default function PriceConfig() {
  const dispatch = useDispatch();
  const { costSettings } = useSelector((state) => state.statistics);
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrices] = useState(costSettings);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCostSettings(prices));
    setIsOpen(false);
  };

  const handlePriceChange = (field, value) => {
    const numValue = value === '' ? 0 : Math.max(0, parseFloat(value) || 0);
    setPrices(prev => ({ ...prev, [field]: numValue }));
  };

  const totalCostPerPage = prices.printCost + prices.paperCost;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
      >
        <Cog6ToothIcon className="w-5 h-5" />
        <span>Set Costs Settings</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Configure Print Costs</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Print Cost per Page
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={prices.printCost}
                      onChange={(e) => handlePriceChange('printCost', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="0.00"
                    />
                    <span className="absolute left-3 top-2 text-gray-500">DA</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Cost to print one page</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    A4 Paper Cost
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={prices.paperCost}
                      onChange={(e) => handlePriceChange('paperCost', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="0.00"
                    />
                    <span className="absolute left-3 top-2 text-gray-500">DA</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Cost of one A4 paper</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Total cost per page: <span className="font-medium">{formatCurrency(totalCostPerPage)} DA</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (Print cost + Paper cost)
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 