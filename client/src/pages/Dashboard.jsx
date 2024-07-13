import React, { useState } from "react";
import moment from "moment";
import clsx from "clsx";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { Chart } from "../components/Chart";
import UserInfo from "../components/UserInfo";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import Loader from "../components/Loader";
import AddTask from "../components/task/AddTask";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";

const TaskTable = ({ tasks }) => {
  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 hidden md:block">
        <span className="text-base text-gray-600">
          {new Date(task?.date).toDateString()}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <thead className="border-b border-gray-300 ">
          <tr className="text-black text-left">
            <th className="py-2">Project Title</th>
            <th className="py-2">Team</th>
            <th className="py-2 hidden md:block">Project Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200  text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
            <span className="text-center">{user && user.name ? user.name.charAt(0) : ''}</span>
          </div>
          <div>
            <p> {user.name}</p>
            <span className="text-xs text-black">{user?.role}</span>
          </div>
        </div>
      </td>
      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-yellow-100" : "bg-blue-200"
          )}
        >
          {user?.isActive ? "Disabled" : "Active"}
        </p>
      </td>
      <td className="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
      <table className="w-full mb-5">
        <thead className="border-b border-gray-300 ">
          <tr className="text-black text-left">
            <th className="py-2">Full Name</th>
            <th className="py-2">Status</th>
            <th className="py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="py-10">
        <Loader />
      </div>
    );
  }

  const stats = [
    {
      _id: "1",
      label: "TOTAL PROJECTS",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "TOTAL TASK",
      total: data?.totalSubtasks || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TOTAL PROJECT MEMBERS ",
      total: data?.users.length,
      icon: <FaArrowsToDot />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "ADD PROJECT",
      onClick: () => setOpen(true), // Open modal when clicked
    },
  ];

  const Card = ({ label, count, bg, icon, onClick }) => (
    <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
      <div className="h-full flex flex-1 flex-col justify-between">
        <p className="text-base text-gray-600">{label}</p>
        <span className="text-2xl font-semibold">{count}</span>
        {onClick && (
          <div className="flex justify-end mb-7 mr-20">
            <button
              onClick={onClick}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white font-semibold"
            >
              <LuClipboardEdit />
            </button>
          </div>
        )}
      </div>
      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total, onClick }, index) => (
          <Card
            key={index}
            icon={icon}
            bg={bg}
            label={label}
            count={total}
            onClick={onClick}
          />
        ))}
      </div>
      <AddTask open={open} setOpen={setOpen} />
      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">
          Task Chart by Priority
        </h4>
        <Chart data={data?.graphData} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable tasks={data?.last10Task} />
        <UserTable users={data?.users} />
      </div>
    </div>
  );
};

export default Dashboard;
