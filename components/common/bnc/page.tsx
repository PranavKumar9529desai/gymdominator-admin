"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  ClipboardList,
  UserCheck,
  ChevronDown,
  Eye,
  UserPlus,
  CalendarCheck,
  QrCode,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type Route =
  | "gymdetails"
  | "trainers"
  | "userstrainersassignment"
  | "attendance";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  route: Route;
}

interface SubRoute {
  icon: React.ReactNode;
  label: string;
  route: string;
  onClick: () => void;
}

interface RouteState {
  parentRoute: string;
  subRoute?: string;
}

export default function BottomNavigation() {
  const [activeRoute, setActiveRoute] = useState<RouteState | null>(null);
  const [, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedSubRoutes, setSelectedSubRoutes] = useState<
    Record<string, string>
  >({});

  const router = useRouter();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-6 w-6" />,
      label: "Gym Details",
      route: "gymdetails",
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "Trainers",
      route: "trainers",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      label: "Assignments",
      route: "userstrainersassignment",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      label: "Attendance",
      route: "attendance",
    },
  ];

  const trainerSubRoutes: SubRoute[] = [
    {
      icon: <Eye className="h-6 w-6 text-indigo-500" />,
      label: "View Trainers",
      route: "viewtrainers",
      onClick: () => console.log("Navigate to View Trainers"),
    },
    {
      icon: <UserPlus className="h-6 w-6 text-indigo-500" />,
      label: "Add Trainers",
      route: "addtrainers",
      onClick: () => console.log("Navigate to Add Trainers"),
    },
  ];

  const attendanceSubRoutes: SubRoute[] = [
    {
      icon: <CalendarCheck className="h-6 w-6 text-indigo-500" />,
      label: "Today's Attendance",
      route: "todaysattendance",
      onClick: () => console.log("Navigate to Today's Attendance"),
    },
    {
      icon: <QrCode className="h-6 w-6 text-indigo-500" />,
      label: "Show Qr",
      route: "showqr",
      onClick: () => console.log("Navigate to Show QR"),
    },
  ];

  // Update active route based on current path
  useEffect(() => {
    const parentRoute = pathname.split("/")[2]; // Adjust based on your route structure
    if (parentRoute) {
      setActiveRoute({
        parentRoute,
        subRoute: selectedSubRoutes[parentRoute],
      });
    }
  }, [pathname]);

  const handleNavClick = (route: string) => {
    const hasSubRoutes = getSubRoutes(route).length > 0;

    if (hasSubRoutes && !selectedSubRoutes[route]) {
      // Only show dialog if no subroute is selected for this parent
      setIsOpening(true);
      setActiveRoute({ parentRoute: route });
    } else {
      // Navigate to selected subroute or main route
      const targetRoute = selectedSubRoutes[route] || route;
      router.push(`/ownerdashboard/${targetRoute}`);
    }
  };

  const handleSubRouteSelect = (parentRoute: string, subRoute: string) => {
    setSelectedSubRoutes((prev) => ({
      ...prev,
      [parentRoute]: subRoute,
    }));
    setIsClosing(true);
    router.push(`/ownerdashboard/${subRoute}`);
  };

  const getSubRoutes = (route: string) => {
    switch (route) {
      case "trainers":
        return trainerSubRoutes;
      // Add other subroutes here
      default:
        return [];
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.route}
            onClick={() => handleNavClick(item.route)}
            className={`flex flex-col items-center p-2 ${
              activeRoute?.parentRoute === item.route
                ? "text-primary"
                : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      {isOpening && activeRoute && (
        <Dialog open={isOpening} onOpenChange={setIsClosing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Option</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {getSubRoutes(activeRoute.parentRoute).map((subRoute) => (
                <Button
                  key={subRoute.route}
                  variant="outline"
                  onClick={() =>
                    handleSubRouteSelect(
                      activeRoute.parentRoute,
                      subRoute.route
                    )
                  }
                >
                  {subRoute.icon}
                  <span className="ml-2">{subRoute.label}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </nav>
  );
}
