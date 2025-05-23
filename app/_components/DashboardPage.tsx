import React from "react";
import Navbar from "./Navbar";
import Features from "./Features";
import Orders from "./Orders";

function DashboardPage() {
  return (
    <div>
      <Navbar />
      <Features />
      <Orders />
    </div>
  );
}

export default DashboardPage;
