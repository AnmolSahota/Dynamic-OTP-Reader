import { useState } from "react";
import "./App.css";
import PinTab from "./component/PinTab";

function App() {
  let [otp, setOtp] = useState("");
  return (
    <div className="App">
      <PinTab length={3} maxChar={1} setOtp={setOtp} />
      OTP is {otp}
    </div>
  );
}

export default App;
