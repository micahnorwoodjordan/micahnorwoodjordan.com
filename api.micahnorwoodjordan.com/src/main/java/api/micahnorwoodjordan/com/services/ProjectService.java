package api.micahnorwoodjordan.com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.micahnorwoodjordan.com.dataaccess.ProjectRepository;
import api.micahnorwoodjordan.com.dataaccess.models.Project;

import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project getProjects(long projectId) throws DatabaseOperationException, IllegalArgumentException {
        try {
            if (projectId < 0) {
                throw new IllegalArgumentException("Project ID must be >= 0");
            }
            return projectRepository.findById(projectId);
        } catch (IllegalArgumentException e) {
            throw new DatabaseOperationException("Invalid project ID: " + e.getMessage());
        } catch (Exception e) {
            throw new DatabaseOperationException("Error retrieving project: " + e.getMessage());
        }
    }

    public List<Project> getProjects() throws DatabaseOperationException {
        try {
            return projectRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseOperationException("Error retrieving projects: " + e.getMessage());
        }
    }
}
 