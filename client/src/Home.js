import { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "https://smsmongoserver-1.onrender.com/gs";
    axios.get(url)
      .then(res => setData(res.data))
      .catch(err => toast.warning("issue: " + err));
  }, [])

  const delStu = (rno) => {
    let d = { data: { rno } };
    let url = "https://smsmongoserver-1.onrender.com/rs";
    axios.delete(url, d)
      .then(res => {
        toast.warning("Record Deleted")
        window.location.reload();
      })
      .catch(err => toast.warning("issue:" + err))
  }

  const nav = useNavigate();
  const updateStu = (rno, name, marks) => {
    nav("/update", { state: { rno, name, marks } });
  }

  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-5">Home Page</h1>
        <table className="table-auto border-collapse border border-gray-400 w-3/4 text-center">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Rno</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">CGPI</th>
              <th className="border border-gray-400 px-4 py-2">Update</th>
              <th className="border border-gray-400 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e._id}>
                <td className="border border-gray-400 px-4 py-2">{e._id}</td>
                <td className="border border-gray-400 px-4 py-2">{e.name}</td>
                <td className="border border-gray-400 px-4 py-2">{e.marks}/10</td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="btn" onClick={() => { updateStu(e._id, e.name, e.marks) }}>Update</button>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="btn" onClick={() => { if (window.confirm("Are you sure??")) delStu(e._id, e.name, e.marks) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="mt-10 text-center">Made with ❤️ By Anurag Gaiwal</footer>
      </div>
    </>
  );
}
