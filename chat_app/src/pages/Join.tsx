import { useState } from "react";
import { CommonInput, CommonButton } from "../components";
import { English } from "../Constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Join = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <div className="bg-slate-100 rounded-md h-1/2 w-1/2 flex flex-col items-center p-3">
        <h1 className="text-slate-900 text-3xl uppercase font-semibold">{English.E1}</h1>
        <div className="flex flex-col justify-center h-full w-full gap-5  mt-2.5">
          <CommonInput
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name="join"
            placeholder={English.E3}
          />
          <CommonButton
            content={English.E2}
            className="normal__button"
            type="button"
            onClick={(e) => {
              if (value.trim().length === 0) {
                console.log("Inside here...");
                toast.error(English.E4);
                return;
              }
              e.stopPropagation();
              e.preventDefault();
              navigate("/chat", {
                state: {
                  user: value,
                },
              });
              setValue("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Join;
