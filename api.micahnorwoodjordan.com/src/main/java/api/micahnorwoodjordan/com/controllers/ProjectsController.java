package api.micahnorwoodjordan.com.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.response.APIResponse;

import api.micahnorwoodjordan.com.dataaccess.models.Project;
import api.micahnorwoodjordan.com.services.ProjectService;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;

import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


// TODO: use standardized API responses
// TODO: implement error handling
// TODO: implement logging
@RestController
@RequestMapping("/projects")
public class ProjectsController {
        private LogService logger = new LogService(ProjectsController.class.getName());
    
        @Autowired
        private ProjectService projectService;
    
        @GetMapping("")
            public ResponseEntity<List<Project>> getProjects() {
                    return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
            }
}
