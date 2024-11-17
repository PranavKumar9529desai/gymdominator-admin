"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  ChevronDown,
  Users,
  ClipboardList,
  CalendarCheck,
  UserCheck,
  LogOut,
} from "lucide-react";
import IconImage from "@/app/assests/gym-manager.webp";

interface SubItem {
  name: string;
  link: string;
  label: string;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  label: string;
  subItems?: SubItem[];
  link?: string;
}

export default function Sidebar() {
  const [activePage, setActivePage] = useState<string>("viewGymDetails");
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
 
  // why this harcocded 
  let gymid = "10";

  const menuItems: MenuItem[] = [
    {
      name: "Gym Details",
      icon: Users,
      label: "gymDetails",
      subItems: [
        {
          name: "View Details",
          // currently gymid has the hardcoded value later on the value come from the cookies and the session
          link: `/gymdetails/viewgymdetails?gymid=${gymid}`,
          label: "viewGymDetails",
        },
        {
          name: "Edit Details",
          link: "/gymdetails/editgymdetails",
          label: "editGymDetails",
        },
      ],
    },
    {
      name: "Trainers",
      icon: UserCheck,
      label: "trainers",
      subItems: [
        {
          name: "View Trainers",
          link: "/trainers/viewtrainers",
          label: "viewTrainers",
        },
        {
          name: "Add Trainers",
          link: "/trainers/addtrainers",
          label: "addTrainers",
        },
      ],
    },
    {
      name: "Users-Trainers Assignment",
      icon: ClipboardList,
      link: "/userstrainersassignment",
      label: "userstrainersassignment",
    },
    {
      name: "Attendance",
      icon: CalendarCheck,
      label: "attendance",
      subItems: [
        {
          name: "Today's Attendance",
          link: "/attendance/todaysattendance",
          label: "todaysAttendance",
        },
        { name: "Show QR", link: "/attendance/showqr", label: "showQR" },
      ],
    },
  ];

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      setOpenMenus((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
      if (!openMenus[item.label]) {
        setActivePage(item.label);
      }
    } else if (item.link) {
      setActivePage(item.label);
      router.push(`/ownerdashboard${item.link}`);
    }
  };

  const handleSubItemClick = (subItem: SubItem, parentLabel: string) => {
    setActivePage(subItem.label);
    setOpenMenus((prev) => ({ ...prev, [parentLabel]: true }));
    router.push(`/ownerdashboard${subItem.link}`);
  };

  const isActiveParent = (item: MenuItem) => {
    return item.subItems
      ? item.subItems.some((subItem) => subItem.label === activePage) ||
          (!openMenus[item.label] && activePage === item.label)
      : activePage === item.label;
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white w-64 h-screen">
      <div className="px-4 w-full flex items-center justify-center ">
        <Image
          src={IconImage}
          alt="Gym Manager Icon"
          className="rounded-full "
        />
      </div>

      <nav className="flex-grow px-4 py-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name} className="whitespace-nowrap">
              <button
                onClick={() => handleItemClick(item)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 
                  ${
                    isActiveParent(item)
                      ? "bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
                {item.subItems &&
                  (openMenus[item.label] ? (
                    <ChevronDown className="w-5 h-5 ml-auto" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  ))}
              </button>
              {item.subItems && openMenus[item.label] && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <button
                        onClick={() => handleSubItemClick(subItem, item.label)}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 
                          ${
                            activePage === subItem.label
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                      >
                        <span>{subItem.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <button className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
