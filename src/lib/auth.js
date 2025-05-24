import { createClient } from '@supabase/supabase-js'
import { insertuser } from './other';


const supabase=createClient('https://yhxxpvoesmnrgalhaafz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeHhwdm9lc21ucmdhbGhhYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc2MjYsImV4cCI6MjA2MDkwMzYyNn0.N2B6SNRhCYrUFKkhK8pl90RXUGP7-Kw3YzWXjcFDasQ')

export async function SignUp({Email,Password,Name}){
  console.log("Before RUnning");
  
  try {
    console.log("In try Catch RUnning");
    const { data, error } = await supabase.auth.signUp(
      {
        email: Email,
        password: Password,
        options: {
          data: {
            first_name: Name,
          }
        }
      }
    )
    console.log("After try Catch RUnning");
          if(data){
            console.log(data)
             alert('check your email')
             insertuser(Name,Email)
          }
          if(error) throw error
          return { data }
    } catch (error) {
        console.log(error)
        
    }
}

export async function signin({Email, Password}){
  try {const { data, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  })
  if(error)throw error
  if(data){console.log(data)
  }
  return data
    
  } catch (error) {
    console.log(error)
    
  }
}
// export async function signUp({Name, Email, Password}) {
//   try {
//       const { data, error } = await supabase.auth.signUp({
//           email: Email,
//           password: Password,
//           options: {
//               data: {
//                   firstName: Name,
//               }
//           }
//       })

//       if(data){
//           console.log(data);
//           alert("Successfull Sign Up")
//       }

//       if(error) throw error
//       return { data };
//   } catch (error) {
//       console.log(error);
      
//   }    
// }