package api.micahnorwoodjordan.com.controllers;

import java.util.List;
import java.util.Map;

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

import api.micahnorwoodjordan.com.dataaccess.models.TechnicalSkillTag;
import api.micahnorwoodjordan.com.services.TechnicalSkillTagService;
import api.micahnorwoodjordan.com.exceptions.TechnicalSkillTagServiceException;

import api.micahnorwoodjordan.com.services.LogService;
import api.micahnorwoodjordan.com.services.enums.LogLevel;

import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


@RestController
@RequestMapping("/technicalskills")
public class TechnicalSkillsController {
    private LogService logger = new LogService(TechnicalSkillsController.class.getName());

    @Autowired
    private TechnicalSkillTagService technicalSkillTagService;

    @GetMapping("")
    public ResponseEntity<APIResponse<Map<String, Object>>> getTechnicalSkills(@RequestParam(name = "type", required = false) String type) {
        String errorLogMessagePrefix = "ERROR AT getTechnicalSkills: ";

        try {
            if (type == null) {
                List<TechnicalSkillTag> tags = technicalSkillTagService.geTechnicalSkillTags();
                Map<String, Object> data = Map.of("technicalSkillTags", tags, "count", tags.size());
                return ResponseEntity.ok(APIResponse.success("TechnicalSkillTag records retrieved successfully", data));
                
            }
            List<TechnicalSkillTag> tags = technicalSkillTagService.geTechnicalSkillTags(type);
            Map<String, Object> data = Map.of("technicalSkillTags", tags, "count", tags.size());
            return ResponseEntity.ok(APIResponse.success("TechnicalSkillTag records retrieved successfully", data));
        } catch (TechnicalSkillTagServiceException e) {
            Map<String, Object> data = Map.of("technicalSkillTagType", type);
            logger.logMessage(LogLevel.DEBUG, errorLogMessagePrefix + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponse.error(e.getMessage(), data));
        } catch (DatabaseOperationException e) {
            logger.logMessage(LogLevel.DEBUG, errorLogMessagePrefix + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error(e.getMessage(), null));
        } catch (Exception e) {
            logger.logMessage(LogLevel.DEBUG, errorLogMessagePrefix + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error("an unknown error has occurred", null));
        }
    }

    @PostMapping("")
    public ResponseEntity<APIResponse<Map<String, Object>>> commitTechnicalSkillTags(@RequestBody List<TechnicalSkillTag> technicalSkillTags) {
        Map<String, Object> data = Map.of("technicalSkillTags", technicalSkillTags, "count", technicalSkillTags.size());
        String errorLogMessagePrefix = "ERROR AT commitTechnicalSkillTags: ";

        try {
            technicalSkillTagService.bulkCommitTechnicalSkillTags(technicalSkillTags);
            return ResponseEntity.ok(APIResponse.success("TechnicalSkillTag records created successfully", data));
        } catch (TechnicalSkillTagServiceException e) {
            logger.logMessage(LogLevel.DEBUG, errorLogMessagePrefix+ e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponse.error(e.getMessage(), data));
        } catch (DatabaseOperationException e) {
            logger.logMessage(LogLevel.DEBUG, errorLogMessagePrefix + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error(e.getMessage(), data));
        } catch (Exception e) {
            logger.logMessage(LogLevel.DEBUG, errorLogMessagePrefix + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error("an unknown error has occurred", null));
        }
    }
}
