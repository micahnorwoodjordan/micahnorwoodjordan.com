package api.micahnorwoodjordan.com.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.response.APIResponse;

import api.micahnorwoodjordan.com.dataaccess.models.Project;
import api.micahnorwoodjordan.com.services.ProjectService;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;

import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


@RestController
@RequestMapping("/projects")
public class ProjectsController {
        private LogService logger = new LogService(ProjectsController.class.getName());
    
        @Autowired
        private ProjectService projectService;
    
        @GetMapping("")
            public ResponseEntity<APIResponse<List<Project>>> getProjects() {
                try{
                        return ResponseEntity.ok(APIResponse.success("Success", projectService.getAllProjects()));
                } catch (DatabaseOperationException e) {
                        logger.logMessage(LogLevel.ERROR, "Error retrieving projects: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                } catch (Exception e) {
                        logger.logMessage(LogLevel.ERROR, "Error retrieving projects: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }   
            }
}
