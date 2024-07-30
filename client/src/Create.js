import { useState, useRef } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
  const rRno = useRef();
  const rName = useRef();
  const rMarks = useRef();

  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const hName = (event) => { setName(event.target.value); };
  const hRno = (event) => { setRno(event.target.value); };
  const hMarks = (event) => { setMarks(event.target.value); };

  const save = (event) => {
    event.preventDefault();
    let data = { rno, name, marks };
    let url = "https://smsmongoserver-1.onrender.com/save";
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
    axios.post(url, data)
      .then(res => {
        if (res.data.insertedId === rno) {
          toast.success("Record Created successfully",{position: "bottom-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",});
          setRno("");
          setName("");
          setMarks("");
          rRno.current.focus();
        } else {
          toast.warning("Roll Number already exists");
          setRno("");
          rRno.current.focus();
        }
      })
      .catch(err => toast.warning("issue: " + err))
  }
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-5">Create new record</h1>
        <form onSubmit={save} className="w-full max-w-md">
          <input
            type="number"
            placeholder="Enter your Roll No"
            onChange={hRno}
            ref={rRno}
            value={rno}
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
            className="btn mt-4"
            value="Save"
          />
        </form>
        <footer className="mt-10 text-center">Made with ❤️ By Anurag Gaiwal</footer>
      </div>
    </>
  );
}
