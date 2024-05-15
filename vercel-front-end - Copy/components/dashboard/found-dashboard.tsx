import SearchBar from "../search-bar";
import ProjectCard from "./project-card";
import { User, Project } from "@prisma/client";

interface FoundDashboardProps {
  user: User;
  projects: Project[];
}

const FoundDashboard = ({ user, projects }: FoundDashboardProps) => {
  return (
    <>
      <div className=" w-full h-fit flex items-center justify-center py-3 ">
        <SearchBar User={user} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 ">
        {projects?.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            subdomain={project.subDomain}
            gitRepo={project.gitUrl}
            branch={project.branch}
            date={project.updatedAt}
            full_name={project.full_name}
            username={user.username}
          />
        ))}
      </div>
    </>
  );
};

export default FoundDashboard;
