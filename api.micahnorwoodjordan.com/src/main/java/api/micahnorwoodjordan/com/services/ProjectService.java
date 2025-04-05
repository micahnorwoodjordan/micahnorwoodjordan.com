package api.micahnorwoodjordan.com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.micahnorwoodjordan.com.dataaccess.ProjectRepository;
import api.micahnorwoodjordan.com.dataaccess.models.Project;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project getProject(long projectId) {
        return projectRepository.findById(projectId);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

}
 