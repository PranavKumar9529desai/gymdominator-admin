"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "./sidebar";

interface SubItem {
  name: string;
  link: string;
  label: string;
  icon?: React.ElementType;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  label: string;
  link?: string;
  subItems?: SubItem[];
}

interface RouteState {
  parentLabel: string;
  subItem?: string;
}

export default function BottomNavigation() {
  const [activeRoute, setActiveRoute] = useState<RouteState | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedSubItems, setSelectedSubItems] = useState<Record<string, string>>(() => {
    return typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('selectedSubItems') || '{}')
      : {};
  });

  const pathname = usePathname();
  const router = useRouter();

  // Track current route
  useEffect(() => {
    const pathSegments = pathname.split('/');
    const mainRoute = pathSegments[2] || ''; // After /ownerdashboard/

    // Find parent menu item based on main route
    const parentItem = menuItems.find(item => {
      if (item.link && item.link.startsWith(`/${mainRoute}`)) {
        return true;
      }
      return item.subItems?.some(sub => sub.link.startsWith(`/${mainRoute}`));
    });
    
    if (parentItem) {
      setActiveRoute({
        parentLabel: parentItem.label,
        subItem: pathname
      });
    }
    console.log()
    console.log('activeRoute', activeRoute);
  }, []);

  // Save selections
  useEffect(() => {
    localStorage.setItem('selectedSubItems', JSON.stringify(selectedSubItems));
  }, [selectedSubItems]);

  const openSubRoutes = (label: string) => {
    setIsOpening(true);
    setActiveRoute({ parentLabel: label });
    setTimeout(() => {
      setIsOpening(false);
    }, 200);
  };

  const closeSubRoutes = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setActiveRoute(null);
    }, 300);
  };

  const isActiveParent = (item: MenuItem) => {
    // Get current route path
    const currentPath = pathname.split('/');
    const mainRoute = currentPath[2] || '';
  
    // Check if direct link matches
    if (item.link?.startsWith(`/${mainRoute}`)) {
      return true;
    }
  
    // Check if any subitem matches
    return item.subItems?.some(sub => sub.link.startsWith(`/${mainRoute}`));
  };

  const handleNavClick = (item: MenuItem) => {
    if (item.subItems) {
      openSubRoutes(item.label);
    } else if (item.link) {
      router.push(`/ownerdashboard${item.link}`);
      setActiveRoute({
        parentLabel: item.label,
        subItem: item.link
      });
    }
  };

  const handleSubItemClick = (parentLabel: string, subItem: SubItem) => {
    setSelectedSubItems(prev => ({
      ...prev,
      [parentLabel]: subItem.link
    }));
    router.push(`/ownerdashboard${subItem.link}`);
    setActiveRoute({
      parentLabel,
      subItem: subItem.link
    });
    closeSubRoutes();
  };

  const renderSubRoutes = (subItems: SubItem[], title: string) => (
    <div
      className={cn(
        "absolute left-0 right-0 bg-white p-4 rounded-t-lg shadow-lg transition-all duration-300 ease-in-out",
        isClosing ? "bottom-0 opacity-0" : "bottom-full opacity-100",
        isOpening ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="flex justify-center mb-2">
        <Button variant="ghost" onClick={closeSubRoutes} className="p-0">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </Button>
      </div>
      <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
      <div className="space-y-2">
        {subItems.map((subItem, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center justify-start w-full p-4 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            onClick={() => handleSubItemClick(title, subItem)}
          >
            {subItem.icon && (
              <subItem.icon className="h-5 w-5 mr-3 text-blue-600" />
            )}
            <span className="text-sm font-medium">{subItem.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="relative">
        {activeRoute &&
          menuItems.find((item) => item.label === activeRoute.parentLabel)?.subItems &&
          renderSubRoutes(
            menuItems.find((item) => item.label === activeRoute.parentLabel)!.subItems!,
            menuItems.find((item) => item.label === activeRoute.parentLabel)!.name
          )}
      </div>
      <nav className="flex justify-around items-center h-16 bg-gray-700">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center h-full w-full text-white",
                isActiveParent(item) ? "bg-blue-700" : ""
              )}
              onClick={() => handleNavClick(item)}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
