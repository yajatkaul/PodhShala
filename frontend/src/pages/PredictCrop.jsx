import React, { useState } from "react";
import usePredictCrop from "../hooks/usePredictCrop";
import Header from "./components/Header";
import locations from "../../data/location.json";
import toast from "react-hot-toast";

const PredictCrop = () => {
  const [inputs, setInputs] = useState({
    nitrogen: "",
    phosphorous: "",
    pottasium: "",
    ph: "",
    raifall: "",
    temperature: "",
    humidity: "",
  });
  const [res, setRes] = useState("");
  const { loading, predict } = usePredictCrop();

  const predictAction = async () => {
    if (
      !inputs.nitrogen ||
      !inputs.phosphorous ||
      !inputs.pottasium ||
      !inputs.ph ||
      !inputs.raifall ||
      !inputs.temperature ||
      !inputs.humidity
    ) {
      toast.error("Fill all the fields");
    }

    const dat = await predict(inputs);
    setRes(dat.result);
  };
  return (
    <>
      <Header />
      <div className="flex h-full justify-center items-center flex-col gap-[20px]">
        <p className="text-[30px] mt-[30px]">Crop Predections</p>
        <input
          type="number"
          placeholder="Nitrogen"
          className="input input-bordered w-full max-w-xs"
          value={inputs.nitrogen}
          onChange={(e) => setInputs({ ...inputs, nitrogen: e.target.value })}
        />
        <input
          type="number"
          placeholder="Phosphorous"
          className="input input-bordered w-full max-w-xs"
          value={inputs.phosphorous}
          onChange={(e) =>
            setInputs({ ...inputs, phosphorous: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Pottasium"
          className="input input-bordered w-full max-w-xs"
          value={inputs.pottasium}
          onChange={(e) => setInputs({ ...inputs, pottasium: e.target.value })}
        />
        <input
          type="number"
          placeholder="PH level"
          className="input input-bordered w-full max-w-xs"
          value={inputs.ph}
          onChange={(e) => setInputs({ ...inputs, ph: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rainfall (in mm)"
          className="input input-bordered w-full max-w-xs"
          value={inputs.raifall}
          onChange={(e) => setInputs({ ...inputs, raifall: e.target.value })}
        />
        <input
          type="number"
          placeholder="Temperature"
          className="input input-bordered w-full max-w-xs"
          value={inputs.temperature}
          onChange={(e) =>
            setInputs({ ...inputs, temperature: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Humidity"
          className="input input-bordered w-full max-w-xs"
          value={inputs.humidity}
          onChange={(e) => setInputs({ ...inputs, humidity: e.target.value })}
        />
        <button className="btn btn-wide" onClick={predictAction}>
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Predict"
          )}
        </button>
        <p>Crop you need is {res ? res : "..."}</p>
      </div>
    </>
  );
};

export default PredictCrop;
