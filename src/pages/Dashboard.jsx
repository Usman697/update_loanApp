import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import LoanRequests from "./LoanRequest";
import CreateLoanForm from "./CreateLoanForm";
import Profile from "./Profile";
import LogoutButton from "./LogOutButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const checkSession = JSON.parse(localStorage.getItem("currentSession"));
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!checkSession) {
      console.log(checkSession);
      console.log("hello");

      navigate("/signin");
    }
  }, []);

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <aside className="w-64 h-full bg-white border-r p-6 flex flex-col shadow-md">
        <Sidebar />
      </aside>

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/loan-requests" element={<LoanRequests />} />
          <Route path="/create-loan" element={<CreateLoanForm />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/AfterCreateLoan" element={<AfterCreateLoan />} /> */}
          <Route path="/logout" element={<LogoutButton />} />
        </Routes>
      </main>
    </div>
  );
}
