import React from "react";
import propTypes from "prop-types";
import { useState } from "react";
import { useRef } from "react";
function PinTab({ length, maxChar, setOtp }) {
  let inputRef = useRef([]);
  let [PinTabLength] = useState(new Array(length).fill("0"));
  let [PinTabValue] = useState(new Array(length).fill(""));
  let changeHandler = (e, index) => {
    // console.log(e);
    if (e.target.value.length == maxChar && index != length - 1) {
      inputRef.current[index + 1].focus();
    }
    PinTabValue[index] = e.target.value;
    setOtp(PinTabValue.join(""));
  };
  let handleKeyUP = (e, index) => {
    if (e.keyCode == 8 && index != 0 && PinTabValue[index].length == 0) {
      inputRef.current[index - 1].focus();
    } else {
      changeHandler(e, index);
    }
  };

  let handlePaste = (e) => {
    let data = e.clipboardData.getData("text").split("");
    data = data.filter((item, index) => index < maxChar * length);
    let values = [];
    for (let i = 0; i < length * maxChar; i += maxChar) {
      let temp = "";
      for (let j = i; j < i + maxChar; j++) {
        temp += data[j];
      }
      values.push(temp);
    }
    values.forEach((elem, index) => {
      PinTabValue[index] = elem;
      inputRef.current[index].value = elem;

    });
  };
  return (
    <div onPaste={handlePaste}>
      {PinTabLength.map((elem, index) => {
        return (
          <input
            key={index}
            maxLength={maxChar}
            ref={(elem) => {
              inputRef.current[index] = elem;
            }}
            onKeyUp={(e) => handleKeyUP(e, index)}
          />
        );
      })}
    </div>
  );
}

export default PinTab;

PinTab.propTypes = {
  length: propTypes.number.isRequired,
  maxChar: propTypes.number,
};
