"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

type Department = {
  id: number;
  name: string;
  createdAt: string;
};

function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchDepartments = async () => {
    const res = await fetch("/api/departments");
    let data = await res.json();
    if (!Array.isArray(data)) data = [];
    setDepartments(data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async () => {
    setError("");
    if (!name.trim()) {
      setError("Departman adı boş olamaz.");
      return;
    }
    const res = await fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      fetchDepartments();
    } else {
      setError("Departman eklenemedi.");
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/departments/${id}`, { method: "DELETE" });
    fetchDepartments();
  };

  const startEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleEditSave = async (id: number) => {
    if (!editingName.trim()) {
      setError("Departman adı boş olamaz.");
      return;
    }
    await fetch(`/api/departments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName }),
    });
    setEditingId(null);
    setEditingName("");
    setError("");
    fetchDepartments();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setError("");
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-0">
        <div className="flex flex-col items-start w-full max-w-full md:max-w-3xl mt-6 md:mt-12">
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mb-4 md:mb-6">
            <input
              type="text"
              placeholder="Departman adı"
              className="border border-gray-200 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full md:flex-1 text-xs md:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="bg-teal-500 text-white px-6 md:px-8 py-2 rounded font-semibold hover:bg-teal-600 transition w-full md:w-auto text-xs md:text-base"
              onClick={handleAdd}
              style={{ minWidth: 80 }}
            >
              Kaydet
            </button>
          </div>
          {error && (
            <div className="text-red-500 mb-2 md:mb-4 text-xs md:text-base">
              {error}
            </div>
          )}
          <div className="bg-white rounded-xl md:rounded-2xl p-0 w-full max-w-full shadow-md border border-gray-100">
            <div className="flex px-2 md:px-8 pt-4 md:pt-8 pb-1 md:pb-2 text-gray-400 text-xs md:text-sm font-semibold">
              <div className="flex-1">Departman Adı</div>
              <div className="w-40">Kaydedilme Tarihi</div>
              <div className="w-20 text-center">İşlem</div>
            </div>
            <div className="px-1 md:px-4 pb-2 md:pb-6">
              {departments.map((dep) => (
                <div
                  key={dep.id}
                  className="flex flex-col md:flex-row items-start md:items-center px-2 md:px-4 py-2 md:py-4 bg-white rounded-lg md:rounded-xl mb-1 md:mb-4 border-b border-gray-200 shadow-sm"
                >
                  <div className="flex-1 font-medium text-gray-700 break-words text-xs md:text-base">
                    {editingId === dep.id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="border border-gray-200 rounded px-2 py-1 w-full"
                        autoFocus
                      />
                    ) : (
                      dep.name
                    )}
                  </div>
                  <div className="w-40 text-gray-400 text-xs md:text-base">
                    {new Date(dep.createdAt).toLocaleString("tr-TR")}
                  </div>
                  <div className="w-20 flex flex-row gap-2 justify-center items-center mt-2 md:mt-0">
                    {editingId === dep.id ? (
                      <>
                        <button
                          className="text-green-600 hover:bg-green-50 rounded p-1"
                          onClick={() => handleEditSave(dep.id)}
                          title="Kaydet"
                        >
                          <FiCheck />
                        </button>
                        <button
                          className="text-gray-400 hover:bg-gray-100 rounded p-1"
                          onClick={cancelEdit}
                          title="İptal"
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-500 hover:bg-blue-50 rounded p-1"
                          onClick={() => startEdit(dep.id, dep.name)}
                          title="Düzenle"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="text-red-500 hover:bg-red-50 rounded p-1"
                          onClick={() => handleDelete(dep.id)}
                          title="Kaldır"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {departments.length === 0 && (
                <div className="text-gray-300 text-center py-2 md:py-4 text-xs md:text-base">
                  Henüz departman yok.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DepartmentPage;
