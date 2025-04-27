import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: {
      rollNo: string | undefined;
      email: string | undefined;
      role: string;
    } = jwtDecode(token);

    return decoded;
  } catch (err) {
    return null;
  }
};
