import { CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const Cards = ({home,InputDiv, setInputDiv}) => {
  const data = [
    {
      title: "The Best Coding Channel",
      desc: "I have to create my channel the best-ever coding channel in Hindi for those who want to learn.",
      status:"Complete",
    },
    {
      title: "CPP Concepts",
      desc: "I need to clear the basics of C++. Topics: Abstraction, Inheritance, Polymorphism, etc.",
      status:"In Complete",
    },
    {
      title: "Assignment",
      desc: "My assignment is due on 20th March. I have to complete it.",
      status:"In Complete",
    },
    {
      title: "Projects",
      desc: "For projects, I need to see tutorials on The Code Master's YouTube channel.",
      status:"Complete",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-gray-800 text-white p-4 rounded-sm"
          >
            <div>
              <h3 className="text-xl font-semibold ">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button className={`${item.status === 'In Complete' ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/6`}>
                {item.status}
              </button>
              <div className="text-white  p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button>
                  <CiHeart />
                </button>
                <button>
                  <FaEdit />
                </button>
                <button>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
        {home == "true" && (
          <button className="flex flex-col justify-center items-center bg-gray-800 text-gray-300 p-4 rounded-sm hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick={()=>setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-5xl"/>
            <h2 className="text-2xl mt-4">Add Task</h2>
          </button>
        )}
    </div>
  );
};


export default Cards;

