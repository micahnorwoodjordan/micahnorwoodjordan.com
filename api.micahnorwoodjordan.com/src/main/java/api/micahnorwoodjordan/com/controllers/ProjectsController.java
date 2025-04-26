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

        private static final String apiV2HeaderName = "useAPIV2";

        @Autowired
        private ProjectService projectService;

        // NOTE: this is to allow the frontend to migrate to the new API standard independently of when it gets deployed
        //      avoids breaking the current handling of the `getProjects` response so that the project components render properly while still using the old API response model
        @GetMapping(headers = {apiV2HeaderName})
        public ResponseEntity<APIResponse<List<Project>>> getProjects() {
                try {
                        return ResponseEntity.ok(APIResponse.success("Success", projectService.getProjects()));
                } catch (DatabaseOperationException e) {
                        logger.logMessage(LogLevel.ERROR, "Error retrieving projects: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                } catch (Exception e) {
                        logger.logMessage(LogLevel.ERROR, "Error retrieving projects: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }   
        }

        @GetMapping("")
        public ResponseEntity<List<Project>> getProjectsLegacy() {
                try {
                        return new ResponseEntity<>(projectService.getProjects(), HttpStatus.OK);
                } catch (DatabaseOperationException e) {
                        logger.logMessage(LogLevel.ERROR, "Error retrieving projects: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                } catch (Exception e) {
                        logger.logMessage(LogLevel.ERROR, "Error retrieving projects: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }   
        }
}
