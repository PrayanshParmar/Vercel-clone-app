"use client";
import { Project, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import NotFoundDashboard from "./not-found-dashboard";
import FoundDashboard from "./found-dashboard";
import DashboardSKL from "../skeletons/dashboard-skl";
import {  AlertCircle } from "lucide-react";

interface UserProps {
  User: User;
  Project?: Project;
}

const Dashboard = ({ User, Project }: UserProps) => {
  const fetchProjects = async () => {
    const response = await fetch("/api/project");
    return response.json();
  };
  const { data, status } = useQuery({
    queryKey: ["projects", User.id],
    queryFn: fetchProjects,
  });

  if (status === "pending") {
    return (
     <DashboardSKL/>
    );
  }

  if (status === "error") {

    return <div className=" w-full h-full flex flex-col items-center justify-start mt-52 space-y-3 ">
        <AlertCircle width={50} height={50} className=" fill-red-500" />
        Something went wrong</div>;
  }

  if (data.length === 0) {
    return <NotFoundDashboard User={User} />;
  }

  return <FoundDashboard user={User} projects={data}  />;
};

export default Dashboard;
