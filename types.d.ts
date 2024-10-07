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
