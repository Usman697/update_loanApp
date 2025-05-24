// import { loanRequestUsers } from "../lib/other";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase=createClient('https://yhxxpvoesmnrgalhaafz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeHhwdm9lc21ucmdhbGhhYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc2MjYsImV4cCI6MjA2MDkwMzYyNn0.N2B6SNRhCYrUFKkhK8pl90RXUGP7-Kw3YzWXjcFDasQ')


export default function LoanRequests() {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    async function loanRequestUsers() {
      try {
        const { data, error } = await supabase.from("loanDetails").select();

        if (data) {
          console.log("Hello Fetch Bhai", data);
          setLoans(data);
        }

        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    }
    loanRequestUsers();
  }, []);

  return (
    <section id="loan-requests" className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Loan Requests</h2>
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-t">
                <td className="p-2">{loan.id}</td>
                <td className="p-2">{loan.name}</td>
                <td className="p-2">{loan.loanAmount}</td>
                <td className="p-2">{loan.status}</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
