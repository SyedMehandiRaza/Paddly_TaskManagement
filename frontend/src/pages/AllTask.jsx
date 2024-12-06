import { IoAddCircleSharp } from "react-icons/io5"
import Cards from "../components/Home/Cards"
import InputData from "../components/Home/InputData"
import { useState } from "react"

const AllTask = () => {
  const [InputDiv, setInputDiv] = useState("hidden")
  return (
    <>
      <div>
        <div className="w-full flex justify-end py-4">
          <button onClick={() => setInputDiv("fixed")}>
              <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        <Cards home={"true"} InputDiv={InputDiv} setInputDiv={setInputDiv}/>
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv}/>
    </>
  ) 
}

export default AllTask
