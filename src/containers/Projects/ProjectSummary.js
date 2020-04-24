import React from 'react';

const ProjectSummary = ({project}) => {
  return(
    <div>
      <p>{project.id}</p><p>{project.name}</p> 
    </div>
  );
}

export default ProjectSummary;