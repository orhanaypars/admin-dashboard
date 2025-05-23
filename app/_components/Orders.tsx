import React from "react";
import { IoPencil } from "react-icons/io5";

function Orders() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-left text-teal-700">
        Satın alma siparişleri
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Ürün
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Adet
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Departmanı
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-3 flex items-center gap-2">
                  <IoPencil className="text-red-500" />
                  Tükenmez Kalem
                </td>
                <td className="px-6 py-3 text-gray-400">60</td>
                <td className="px-6 py-3 text-teal-700">
                  Muhasebe ve Finansman
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
