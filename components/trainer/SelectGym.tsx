"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { GymAtom } from "@/app/state/Atoms/gymAtom";

export interface gym {
  id: string;
  name: string;
  img: string;
}

export default function SelectGym({ gyms }: { gyms: gym[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGym, setSelectedGym] = useState<gym | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGymSelected, setIsGymSelected] = useState(false);
  const setGymAtom = useSetRecoilState(GymAtom);
  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGymSelect = (gym: gym) => {
    setIsOpen(false);
    Swal.fire({
      title: "Confirm Selection",
      text: `Are you sure you want to select ${gym.name}?`,
      icon: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, select it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      console.log("Result from SweetAlert2:", result);
      if (result.isConfirmed) {
        setSelectedGym(gym);
        setIsGymSelected(true);
        // atom  is used to store data
        setGymAtom(gym);
        router.push(`/selectgym/${gym.id}`);
      } else {
        console.log("User canceled the selection.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white text-gray-800 border-gray-200">
        {!isGymSelected && (
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">
              Select Your Gym
            </DialogTitle>
          </DialogHeader>
        )}

        <div>
          <Input
            type="text"
            placeholder="Search for a gym..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <div
            className="grid gap-4 py-4"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {filteredGyms.map((gym) => (
              <div
                key={gym.name}
                className="cursor-pointer transition-all duration-300 hover:text-indigo-600 border-gray-200 p-4 h-10 flex items-center"
                onClick={() => handleGymSelect(gym)}
              >
                <h3 className="text-xl mb-2 text-gray-900">{gym.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
