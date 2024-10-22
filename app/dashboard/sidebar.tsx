"use client";
import {
  ChevronRight,
  ChevronDown,
  Users,
  ClipboardList,
  CalendarCheck,
  QrCode,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "";

export default function SidebarGym() {
  const [activePage, setActivePage] = useState("Gym Details");
  const [isTrainerOpen, setIsTrainerOpen] = useState<boolean>(false);
  const [IsAttendanceOpen, setIsAttendanceOpen] = useState<boolean>(false);
  interface SubItmestype {
    name: string;
    link: string;
  }

  interface menuItem {
    name: string;
    icon: any;
    label: string;
    subItems?: SubItmestype[];
    link?: string;
  }
  const AttendanceSubItems = [
    { name: "Today's Attendance", link: "/attendance/today" },
    { name: "Show QR", link: "/attendance/qr" },
  ];

  const trainerSubItems = [
    {
      name: "View Trainers",
      link: "/trainers/view",
      label: "viewtrainers",
    },
    {
      name: "Add Trainers",
      link: "/trainers/add",
      label: "addtrainers",
    },
  ];

  const menuItems = [
    {
      name: "Gym Details",
      icon: Users,
      link: "/gym-details",
      label: "gymdetails",
    },
    {
      name: "Trainers",
      icon: UserCheck,
      subItems: trainerSubItems,
      label: "trainers",
    },
    {
      name: "Users-Trainers Assignment",
      icon: ClipboardList,
      link: "/users-trainers-assignment",
      label: "userstrainersassignment",
    },
    {
      name: "Attendance",
      icon: CalendarCheck,
      subItems: [
        { name: "Today's Attendance", link: "/attendance/today" },
        { name: "Show QR", link: "/attendance/qr" },
      ],
      label: "attendance",
    },
  ];

  const handleItemClick = (item: menuItem) => {
    // navigate(item.link);
    if (item.name === "Attendance") {
      setIsAttendanceOpen(!IsAttendanceOpen);
    }
    if (item.name === "Trainers") {
      setIsTrainerOpen(!isTrainerOpen);
    }
  };

  //   useEffect(() => {
  //     setActivePage(acRoute);
  //   }, [acRoute]);

  return (
    <div className="flex flex-col bg-gray-900 text-white w-full py-8 h-screen">
      <div className="flex items-center mb-8 px-2 relative left-1">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
          {/* <img src={Gymdominator} alt="" className="cover" /> */}
        </div>
        <h1 className="text-2xl font-bold">Gym Management</h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleItemClick(item)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activePage === item.label?.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                aria-expanded={
                  item.name === "Trainers" ? isTrainerOpen : undefined
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
                {item.subItems &&
                  (isTrainerOpen ? (
                    <ChevronDown className="w-5 h-5 ml-auto" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  ))}
              </button>
              {/* isAttendance is open */}
              {item.name === "Attendance" && IsAttendanceOpen && (
                <ul className="ml-6 mt-2 space-y-2 transition-all duration-200 ease-in-out">
                  {AttendanceSubItems.map(
                    (subItem: { name: string; link: string }) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => {
                            setActivePage(subItem.name);
                            // navigate(subItem.link);
                          }}
                          className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                            activePage === subItem.name
                              ? "bg-blue-700 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          <span>{subItem.name}</span>
                        </button>
                      </li>
                    )
                  )}
                </ul>
              )}

              {item.name === "Trainers" && isTrainerOpen && (
                <ul className="ml-6 mt-2 space-y-2 transition-all duration-200 ease-in-out">
                {trainerSubItems.map(
                    (subItem: { name: string; link: string }) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => {
                            setActivePage(subItem.name);
                            // navigate(subItem.link);
                          }}
                          className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                            activePage === subItem.name
                              ? "bg-blue-700 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          <span>{subItem.name}</span>
                        </button>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <ChevronRight className="w-5 h-5 mr-3 text-red-400" />
          <span className="text-red-400">Logout</span>
        </button>
      </div>
    </div>
  );
}
