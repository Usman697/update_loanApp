import { useEffect, useState } from "react";
import { CheckSession } from "../lib/other";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
const supabase=createClient('https://yhxxpvoesmnrgalhaafz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeHhwdm9lc21ucmdhbGhhYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc2MjYsImV4cCI6MjA2MDkwMzYyNn0.N2B6SNRhCYrUFKkhK8pl90RXUGP7-Kw3YzWXjcFDasQ')


export default function Overview() {
  const [loans, setLoans] = useState([]);
  const [pendingState, setPendingState] = useState(null);
  const [approvedState, setApprovedState] = useState(null);
  const [rejectedState, setRejectedState] = useState(null);
  const navigate = useNavigate()
  useEffect(()=>{
    async function checkSessionHandler() {
      const hero = await CheckSession();
      if (hero == null) {
        navigate('/signin');
      }
    }
    checkSessionHandler();
  
  },[])

  useEffect(() => {
    async function loanRequestUsers() {
      try {
        const { data, error } = await supabase.from("loanDetails").select();

        if (data) {
          console.log("Hello Fetch Bhai", data);
          setLoans(data);
          // Calculate counts here
          let pending = 0;
          let approved = 0;
          let rejected = 0;

          data.forEach((loan) => {
            if (loan.status === "pending") pending++;
            else if (loan.status === "approved") approved++;
            else if (loan.status === "rejected") rejected++;
          });

          setPendingState(pending);
          setApprovedState(approved);
          setRejectedState(rejected);
        }

        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    }
    loanRequestUsers();
  }, []);

  return (
    <section id="overview" className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">{"Pending Requests"}</h3>
          <p className="text-3xl">{pendingState}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">{"Approved Loans"}</h3>
          <p className="text-3xl">{approvedState}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">{"Rejected Loans"}</h3>
          <p className="text-3xl">{rejectedState}</p>
        </div>
        
      </div>
    </section>
  );
}
