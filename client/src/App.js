import './App.css';
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import Error from "./Error";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
	<center>
		<BrowserRouter>
			<Routes>
			<Route path="/" element={<Home/>}></Route>
			<Route path="/create" element={<Create/>}></Route>
			<Route path="/update" element={<Update/>}></Route>
			<Route path="*" element={<Error/>}></Route>
			</Routes>
		</BrowserRouter>
	</center>
    </>
  );
}

export default App;
