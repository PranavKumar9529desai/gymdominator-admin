import { atom, RecoilState } from "recoil";

export const TrainersAtom: RecoilState<TrainerType[]> = atom({
  key: "TrainersAtom",
  default: [
    {
      name: "default trainer",
      img: "",
      id: "1",
      shift: "All",
    },
  ],
});
