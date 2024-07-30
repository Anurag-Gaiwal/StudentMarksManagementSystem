import { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Update() {
  const rRno = useRef();
  const rName = useRef();
  const rMarks = useRef();

  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const hName = (event) => { setName(event.target.value); };
  const hRno = (event) => { setRno(event.target.value); };
  const hMarks = (event) => { setMarks(event.target.value); };

  const loc = useLocation();

  useEffect(() => {
    setRno(loc.state.rno);
    setName(loc.state.name);
    setMarks(loc.state.marks);
  }, [])

  const nav = useNavigate();

  const save = (event) => {
    event.preventDefault();
    let data = { rno, name, marks };
    let url = "https://smsmongoserver-1.onrender.com/us";
    if (rno.trim() === "") {
      toast.warning("Roll number cannot be blank");
	  rRno.current.focus();
      return;
    }
    if (name.trim() === "") {
      toast.warning("Name cannot be blank");
	  rName.current.focus();
      return;
    }
    if (marks.trim() === "") {
      toast.warning("Marks cannot be blank");
	  rMarks.current.focus();
      return;
    }
    axios.put(url, data)
      .then(res => {
        toast.success("Record Updated");
        nav("/");
      })
      .catch(err => toast.warning("issue: " + err))
  }

  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-5">Update record</h1>
        <form onSubmit={save} className="w-full max-w-md">
          <input
            type="number"
            placeholder="Enter your Roll No"
            onChange={hRno}
            ref={rRno}
            value={rno}
            disabled={true}
            className="input"
          />
          <input
            type="text"
            placeholder="Enter your Name"
            onChange={hName}
            ref={rName}
            value={name}
            className="input"
          />
          <input
            type="number"
            placeholder="Enter your pointers out of 10"
            onChange={hMarks}
            ref={rMarks}
            value={marks}
            className="input"
          />
          <input
            type="submit"
            value="Update"
            className="btn mt-4"
          />
        </form>
        <footer className="mt-10 text-center">Made with ❤️ By Anurag Gaiwal</footer>
      </div>
    </>
  );
}
