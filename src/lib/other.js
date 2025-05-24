import { createClient } from '@supabase/supabase-js'
import { data } from 'react-router-dom'


const supabase=createClient('https://yhxxpvoesmnrgalhaafz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeHhwdm9lc21ucmdhbGhhYWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc2MjYsImV4cCI6MjA2MDkwMzYyNn0.N2B6SNRhCYrUFKkhK8pl90RXUGP7-Kw3YzWXjcFDasQ')

export default async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function insertuser(Name,Email,ID) {
  try {
    const { data, error } = await supabase
  .from('users')
  .insert({ email: Email, name:Name , id:ID })
  .select()
  if(data) {console.log('data insert successfully')
    if(error) throw error
  }
  } catch (error) {
    console.log(error)
    
  }
  
}


export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select()
    if (data) {
      console.log(data)
      return {
        success: true,
        data: data,
        message: "User list succesfully Fetch",
      };
    }

    if (error) throw error;

  } catch (error) {
    console.log(error);

  }

}

export async function LogOutUser() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
  } catch (error) {
    console.log(error);

  }
}

export async function CheckSession() {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (data) {
      console.log(data);
    }

    if (error) throw error
    return data;
  } catch (error) {
    console.log(error);

  }
}


export async function AllLoanUsers() {
  try {
    const { data, error } = await supabase
      .from('loanDetails')
      .select()
    if (data) {
      // console.log(data);
      return data;
    }
    if (error) throw error;
  } catch (error) {
    console.log(error);

  }

}

export async function UpdateData({tableName, statusResult, reqId}) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update({ status: statusResult })
      .eq('id', reqId)
      .select()

    if(data){
      console.log(data);
      // return data;
    }  
    if(error) throw error;
  } catch (error) {
    console.log(error);
    
  }
}