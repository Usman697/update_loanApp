import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from 'react-toastify';
const supabase=createClient('https://yhxxpvoesmnrgalhaafz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeHhwdm9lc21ucmdhbGhhYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc2MjYsImV4cCI6MjA2MDkwMzYyNn0.N2B6SNRhCYrUFKkhK8pl90RXUGP7-Kw3YzWXjcFDasQ')


export default function CreateLoanForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [documents, setDocuments] = useState(null);

  async function submitDetail() {
    console.log(name);
    console.log(detail);  
    console.log(documents);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser.userId);

    try {
      const { data, error } = await supabase
        .from("loanDetails")
        .insert({
          name: name,
          loanAmount: detail,
          userId: currentUser.userId,
          cnicUrl: null,
          status: 'pending'
        })
        .select();

      if (data) {
        console.log("Data inserted Successfully");
        if (documents.length > 0) {
          try {
            const { data: docData, error: docError } = await supabase.storage
              .from("cnic-image")
              .upload(`public/${data[0].id}`, documents[0], {
                cacheControl: "3600",
                upsert: false,
              });

            if (docData) {
              console.log("Hello Data");
              try {
                const { data: createPublicUrl } = supabase.storage
                  .from("cnic-image")
                  .getPublicUrl(`${docData.path}`);

                if (createPublicUrl) {
                  console.log("hello Link", createPublicUrl);
                  try {
                    const { data: updateData, error: updateError } =
                      await supabase
                        .from("loanDetails")
                        .update({ cnicUrl: createPublicUrl.publicUrl })
                        .eq("userId", currentUser.userId)
                        .select();

                    if (updateData) {
                      console.log("Data Updated Successfull");
                      setStep((s) => s + 1);
                    }

                    if (updateError) throw updateError;
                  } catch (error) {
                    console.log(error);
                  } finally {
                    toast.success('Loan created successfully!');

                  }
                }
              } catch (error) {
                console.log(error);
              }
            }

            if (docError) throw docError;
          } catch (error) {
            console.log(error);
          }
        }
      }

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  function nextStep() {
    setStep((s) => s + 1);
  }
  function prevStep() {
    setStep((s) => s - 1);
  }

  return (
    <section id="create-loan" className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Create Loan Request</h2>
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
        {step === 1 && (
          <>
            <h3 className="text-lg mb-4">Personal Information</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded mb-4"
            />
            <h3 className="text-lg mb-4">Loan Amount</h3>
            <input
              type="number"
              placeholder="Loan Amount"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="border p-2 w-full rounded mb-4"
            />
            <h3 className="text-lg mb-4">Upload CNIC</h3>
            <input
              onChange={(e) => setDocuments(e.target.files)}
              type="file"
              className="border p-2 w-full rounded mb-4"
            />
            <button
              onClick={nextStep}
              className="px-4 py-2  text-black bg-blue-500 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg mb-4">Review & Submit</h3>
            <p className="mb-4">
              Review your information here before submitting.
            </p>
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded me-5"
            >
              Back
            </button>
            <button
              onClick={submitDetail}
              className="px-4 py-2 bg-green-500 text-black rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
