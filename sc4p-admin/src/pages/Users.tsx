import React from "react";
import { Button } from "@nextui-org/react";

const Users: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Users Page</h1>
      <Button color="primary" className="px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">Button</Button>
    </div>
  );
};

export default Users;
