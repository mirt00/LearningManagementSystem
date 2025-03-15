import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

//component
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");

  function handleTabChange(value) {
    setActiveTab(value);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          {/* <GraduationCap className="h-8 w-8 mr-4"/> */}
          <span className="font-extrabold text-xl">NeoLearn</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background"></div>
      <Tabs
        value={activeTab}
        defaultValue="signin"
        onValueChange={handleTabChange}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
export default AuthPage;
