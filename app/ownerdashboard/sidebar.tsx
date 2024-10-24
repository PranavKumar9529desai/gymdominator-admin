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
import { useRouter } from "next/navigation";
import Image from "next/image";
import IconImage from "@/app/assests/gym-manager.webp";
export default function SideBar() {
  const [activePage, setActivePage] = useState<string>("gymdetails");
  const [isTrainerOpen, setIsTrainerOpen] = useState<boolean>(false);
  const [IsAttendanceOpen, setIsAttendanceOpen] = useState<boolean>(false);
  const router = useRouter();
  interface SubItmestype {
    name: string;
    link: string;
    label: string;
  }

  interface menuItem {
    name: string;
    icon: any;
    label: string;
    subItems?: SubItmestype[];
    link?: string;
  }
  const AttendanceSubItems = [
    {
      name: "Today's Attendance",
      link: "/attendance/today",
      label: "todaysattendance",
    },
    { name: "Show QR", link: "/attendance/qr", label: "showqr" },
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
    // using next router
    console.log("route is changed to", item.label);
    setActivePage(item.label);
    // if label is Trainers or Attendance then should not change the rout
    if (item.label === "trainers" || item.label === "attendance") {
      console.log("no change in route");
    } else {
      router.push(`/ownerdashboard/${item.label}`);
    }
    if (item.name === "Attendance") {
      setIsAttendanceOpen(!IsAttendanceOpen);
    }
    if (item.name === "Trainers") {
      setIsTrainerOpen(!isTrainerOpen);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white w-full  h-screen">
      <div className="rounded-full w-30 h-25flex items-center justify-center ">
        <Image src={IconImage} alt="Inconimage" className="object-cover  w-full h-full  rounded-full" />
        {/* <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
        </div> */}
        {/* <h1 className="text-2xl font-bold">Gym Management</h1> */}
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name} className="whitespace-nowrap group">
              <button
                // @ts-ignore
                onClick={() => handleItemClick(item)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200  
                  group-hover:bg-gray-800
            ${
              activePage === item.label
                ? "!bg-blue-700 text-white "
                : "text-gray-300 hover:text-4xl"
            }}`}
                aria-expanded={
                  item.name === "Trainers" ? isTrainerOpen : undefined
                }
              >
                <item.icon className="w-5 h-5 mr-3 " />
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
                    (subItem: {
                      name: string;
                      link: string;
                      label: string;
                    }) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => {
                            setActivePage(subItem.name);
                            router.push(
                              `/ownerdashboard/attendance/${subItem.label}`
                            );
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

              {/* Trainers subitem  */}
              {item.name === "Trainers" && isTrainerOpen && (
                <ul className="ml-6 mt-2 space-y-2 transition-all duration-200 ease-in-out">
                  {trainerSubItems.map(
                    (subItem: {
                      name: string;
                      link: string;
                      label: string;
                    }) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => {
                            setActivePage(subItem.name);
                            router.push(`/ownerdashboard/trainers/${subItem.label}`);
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
