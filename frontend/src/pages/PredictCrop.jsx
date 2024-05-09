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
    state: "",
    city: "",
  });
  const [res, setRes] = useState("");
  const { loading, predict } = usePredictCrop();

  const predictAction = async () => {
    if (
      !inputs.nitrogen ||
      !inputs.phosphorous ||
      !inputs.pottasium ||
      !inputs.ph ||
      !inputs.raifall
    ) {
      toast.error("Fill all the fields");
    }
    if (inputs.state === "") {
      toast.error("Select State");
      return;
    }
    if (inputs.city === "") {
      toast.error("Select City");
      return;
    }

    const dat = await predict(inputs);
    setRes(dat.prediction);
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
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            setInputs({ ...inputs, state: e.target.value });
          }}
          value={inputs.state}
        >
          <option disabled selected>
            State
          </option>
          <option>Select</option>
          {locations.states.map((stateObj) => {
            return <option key={stateObj.state}>{stateObj.state}</option>;
          })}
        </select>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            setInputs({ ...inputs, city: e.target.value });
          }}
          value={inputs.city}
        >
          <option disabled selected>
            City
          </option>
          <option>Select</option>
          {locations.states.map((stateObj) => {
            return stateObj.state === inputs.state
              ? stateObj.districts.map((district, index) => (
                  <option key={index}>{district}</option>
                ))
              : null;
          })}
        </select>
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
