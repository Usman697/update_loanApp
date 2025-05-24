import React, { useState, useEffect } from "react";
import { AllLoanUsers } from "../lib/other";
import { UpdateData } from "../lib/other";
import { useNavigate } from "react-router-dom";

function Sidebar({ setView }) {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      <ul className="space-y-6">
        <li>
          <button
            onClick={() => setView("loanRequests")}
            className="w-full text-left"
          >
            Loan Requests
          </button>
        </li>
        <li>
          <button
            onClick={() => setView("adminDetails")}
            className="w-full text-left"
          >
            Admin Details
          </button>
        </li>
      </ul>
    </div>
  );
}

function LoanRequests() {
  const [requests, setRequests] = useState([]);

  async function UsersData() {
    const requestData = await AllLoanUsers();
    setRequests(requestData);
  }

  const checkSession = JSON.parse(localStorage.getItem("currentSession"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkSession) {
      console.log(checkSession);
      console.log("hello");

      navigate("/signin");
    }
    UsersData();
  }, []);

  function acceptData(id) {
    console.log(id);
    requests.forEach(async (element) => {
      if (element.id === id) {
        console.log(element.id);
        // element.status = "approved"
        const result = await UpdateData({
          tableName: "loanDetails",
          statusResult: "approved",
          reqId: element.id,
        });
         console.log(result);
      }
    });
  }
  function rejectData(id) {
    console.log(id);
    requests.forEach(async (element) => {
      if (element.id === id) {
        console.log(element.id);
        // element.status = "approved"
        const result = await UpdateData({
          tableName: "loanDetails",
          statusResult: "rejected",
          reqId: element.id,
        });
        console.log(result);
      }
    });
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Loan Requests</h2>
      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
          >
            <div>
              <p className="font-medium">{req.name}</p>
              <p className="text-gray-600">Amount: {req.loanAmount}</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => acceptData(req.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Accept
              </button>
              <button
                onClick={() => rejectData(req.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDetails() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Details</h2>
      <div className="border p-6 rounded-lg shadow">
        <p className="mb-4">
          <span className="font-medium">Name:</span> Admin User
        </p>
        <p className="mb-4">
          <span className="font-medium">Email:</span> admin@example.com
        </p>
        <p>
          <span className="font-medium">Role:</span> Super Admin
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [view, setView] = useState("loanRequests");

  return (
    <div className="flex min-h-screen">
      <Sidebar setView={setView} />
      <div className="flex-1 bg-gray-100">
        {view === "loanRequests" && <LoanRequests />}
        {view === "adminDetails" && <AdminDetails />}
      </div>
    </div>
  );
}
