type gender = "Male" | "Female";
interface mockUsersType {
  id: number;
  name: string;
  gender: gender;
  todaysAttendance: boolean;
}

interface FormData {
  username: string;
  password: string;
}

interface User {
  name: string;
  HealthProfile: {
    diet: string;
    id: number;
    fullname: string;
    contact: string;
    weight: number;
    height: number;
    address: string;
    userid: number;
  };
}

interface FetchUserType {
  msg: string;
  data: User[];
}

interface User {
  id: number;
  name: string;
  gender: string;
  goal: string;
  assignedTrainer: string | null;
}

interface Trainer {
  id: number;
  name: string;
}
