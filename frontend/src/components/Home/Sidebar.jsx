// const Sidebar = () => {

//     const data = [
//         {
//             title:
//         }
//     ]
//     return (
//       <div className="flex flex-col">
//         <div>
//           <h2 className="text-xl font-semibold">The Code Master</h2>
//           <h4 className="mb-1 text-gray-400">syed19ee064@satiengg.in</h4>
//           <hr />
//         </div>
//         <div></div>
//       </div>
//     );
//   };

//   export default Sidebar;
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const data = [
    { title: "All tasks", icons: <CgNotes />, link:"/" },
    { title: "Important tasks", icons: <MdLabelImportant />, link:"/importantTasks" },
    { title: "Completed tasks", icons: <FaCheckDouble />, link:"/completedTasks" },
    { title: "Incompleted tasks", icons: <TbNotebookOff />, link:"/incompletedTasks" },
  ];

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-2">Task Categories</h2>
        <h4 className="mb-1 text-gray-400">syed19ee064@satiengg.in</h4>
        <hr className="mb-4" />
      </div>
      <div>
        {data.map((item, index) => (
          <Link to={item.link} key={index} className="mb-2">
            <h4 className="text-lg my-2 flex items-center hover:text-blue-400 cursor-pointer transition-all duration-300">
              {item.icons}
              &nbsp;
              {item.title}
            </h4>
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded">Log Out</button>
      </div>
    </>
  );
};

export default Sidebar;
