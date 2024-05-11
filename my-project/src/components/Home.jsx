import React, { useEffect, useState } from "react";
import {GoogleGenerativeAI} from '@google/generative-ai'
import { TypeAnimation } from 'react-type-animation';


const Home = () => {
  const [symptons, setsymptons] = useState("");

  const [output, setoutput] = useState("");
  const [history, sethistory] = useState([]);

  const [loading, setloading] = useState(false);

  const handleSearch=async()=>{
    if(!symptons){
        alert("Enter symptoms");
        return;
    }
    setloading(true);
    const genAI=new GoogleGenerativeAI(import.meta.env.VITE_GEN_API_KEY);
    console.log("Bansi")
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `i am having ${symptons} which doctor should i see only give specialization of doctors`

    const result = await model.generateContent(prompt);
    console.log(result)
    const response = await result.response;
    const text = response.text();
    // const arr=text.split('*');
    // console.log(arr);

    sethistory((prev)=>{
        return [...prev, {inp:symptons, out:text}]
    })
    setoutput(text);
    console.log(text);
    setloading(false);
  }

  useEffect(()=>{
    console.log(history.length)
  }, [history])
  return (
    <div>

     {loading?<div className="max-w-[1000px] h-full min-h-[90vh] mx-auto flex flex-col justify-center gap-5
     text-2xl text-center items-center py-20 font-medium text-purple-500"> <TypeAnimation
     sequence={[
       // Same substring at the start will only be typed out once, initially
       'Generating results',
       1000, // wait 1s before replacing "Mice" with "Hamsters"
       'Generating results',
       1000, // wait 1s before replacing "Mice" with "Hamsters"
     ]}
     wrapper="span"
     speed={50}
     style={{ fontSize: '2em', display: 'inline-block' }}
     repeat={Infinity}
   /></div>:
     <div className="max-w-[1000px] h-full mx-auto flex flex-col items-start justify-start py-5 gap-5">
      
      <div className="inp w-full flex flex-col items-start gap-2">
        <label htmlFor="symp">
          Enter your symptoms to discover the medical specialties of available
          doctors.
        </label>
        <input
          type="text"
          id="symp"
          value={symptons}
          className="border w-full py-2 rounded-md px-4 focus:outline-none
            "
          placeholder="Enter symptoms"
          onChange={(e) => {
            setsymptons(e.target.value);
          }}
        />
      </div>

      <button onClick={handleSearch}
        className="btn bg-purple-500 text-white px-4 py-2 rounded-md
        "
      >
        Discover Speciality
      </button>

      {history.map((his, idx)=>{
        return <div key={idx} className="res flex flex-col items-start justify-start gap-2">

        <div className="flex flex-col items-start justify-start gap-0">

        <div className="text-lg font-medium">You 👨🏼‍🦰</div>
        <div className="text-base text-gray-800">
        {his.inp}
        </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-0">

        <div className="text-lg font-medium">Chatbot 🤖</div>
        <div className="text-base text-gray-800">
          {his.out}
        </div>
        </div>
      </div>
      })}

     {/* {output && <div className="res flex flex-col items-start justify-start gap-2">

        <div className="text-lg font-medium">Chatbot 👻</div>
        <div className="text-base text-gray-800">
          {output}
        </div>
      </div>} */}
    </div>}

    
    
    </div>
  );
};

export default Home;
