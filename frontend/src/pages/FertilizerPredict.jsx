import React, { useState } from "react";
import Header from "./components/Header";
import usePredictFertilizers from "../hooks/usePredictFertilizers";
import crops from "../../data/crops.json";
import toast from "react-hot-toast";

const FertizliersPredict = () => {
  const [inputs, setInputs] = useState({
    nitrogen: "",
    phosphorous: "",
    pottasium: "",
    crop: "",
  });
  const [res, setRes] = useState("");
  const { loading, predict } = usePredictFertilizers();

  const predictAction = async () => {
    if (!inputs.nitrogen || !inputs.phosphorous || !inputs.pottasium) {
      toast.error("Fill all the fields");
      return;
    }
    if (inputs.crop === "") {
      toast.error("Select crop");
      return;
    }

    const dat = await predict(inputs);
    setRes(dat);
  };
  return (
    <>
      <Header />
      <div className="flex h-full justify-center items-center flex-col gap-[20px]">
        <p className="text-[30px] mt-[30px]">Fertilizer Predections</p>
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
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            setInputs({ ...inputs, crop: e.target.value });
          }}
          value={inputs.crop}
        >
          <option disabled selected>
            Crop
          </option>
          <option>Select</option>
          {crops.crops.map((crop) => {
            return <option>{crop}</option>;
          })}
        </select>
        <button className="btn btn-wide" onClick={predictAction}>
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Predict"
          )}
        </button>
        <p>
          {res ? (
            <div
              className="flex flex-col ml-[10%] mb-[50px] mr-[10%] flex-wrap"
              dangerouslySetInnerHTML={{ __html: res }}
            ></div>
          ) : (
            "..."
          )}
        </p>
      </div>
    </>
  );
};

export default FertizliersPredict;
