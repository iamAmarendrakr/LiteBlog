import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../routes/AxiosInstance";

const UserName = () => {
  const [userName, setUserName] = useState([]);
  useEffect(() => {
    let UserName = async () => {
      let res = await AxiosInstance.get("/blogs");
      setUserName(res.data);
      console.log(res);
    };
    UserName();
  }, []);
  return (
    <div>
      {userName.map((user) => (
        <div key={user.id}>{user.UserName}</div>
      ))}
    </div>
  );
};

export default UserName;
