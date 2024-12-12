import { atom, RecoilState } from "recoil";

interface OwnerAtomType {
  name: string;
  email: string;
  role: Rolestype;
}

export const ownerAtom: RecoilState<OwnerAtomType> = atom({
  key: "ownerAtom",
  default: {
    name: "",
    email: "",
    role: "owner" as Rolestype,
  },
});
