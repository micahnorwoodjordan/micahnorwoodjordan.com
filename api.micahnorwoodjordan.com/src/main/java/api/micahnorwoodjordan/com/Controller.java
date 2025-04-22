package api.micahnorwoodjordan.com;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.micahnorwoodjordan.com.dataaccess.models.EmailMessage;
import api.micahnorwoodjordan.com.services.EmailMessageService;
import api.micahnorwoodjordan.com.dataaccess.models.Project;
import api.micahnorwoodjordan.com.services.ProjectService;
import api.micahnorwoodjordan.com.dataaccess.models.TechnicalSkillTag;
import api.micahnorwoodjordan.com.services.TechnicalSkillTagService;

import api.micahnorwoodjordan.com.exceptions.TechnicalSkillTagServiceException;
import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;

import api.response.APIResponse;


@RestController
@CrossOrigin(origins = {"http://192.168.0.136:4200", "http://localhost:4200", "https://micahnorwoodjordan.com"})
public class Controller {

    @Autowired
    private EmailMessageService emailMessageService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TechnicalSkillTagService technicalSkillTagService;

    @GetMapping("/ping")
	public ResponseEntity index() {
		return new ResponseEntity<>(HttpStatus.OK);
	}

    @PostMapping(path="/notifications/email/send")
    public ResponseEntity<String> sendEmailMessage(@RequestBody EmailMessage emailMessage) {
        boolean isSuccess = false;

        try {
            EmailMessage email = new EmailMessage(
                emailMessage.getMessageBody(),
                emailMessage.getSenderFirstName(),
                emailMessage.getSenderLastName(),
                emailMessage.getSenderEmailAddress()
            );
            isSuccess = emailMessageService.sendEmailMessage(email);
        } catch(Exception e) {
            System.out.println("exception occurred: " + e);  // Log this
        }

        if (isSuccess) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/notifications/email")
	public ResponseEntity<EmailMessage> getEmailMessage(@RequestParam(name = "id", required = true) long emailMessageId) {
		return new ResponseEntity<>(emailMessageService.getEmailMessage(emailMessageId), HttpStatus.OK);
	}

    @GetMapping("/projects")
	public ResponseEntity<List<Project>> getProjects() {
		return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
	}

    @GetMapping("/technicalskills")
    public ResponseEntity<APIResponse<Map<String, Object>>> getTechnicalSkills(@RequestParam(name = "type", required = false) String type) {
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponse.error(e.getMessage(), data));
        } catch (DatabaseOperationException e) {
            Map<String, Object> data = Map.of("technicalSkillTagType", type);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error(e.getMessage(), data));
        }
    }

    @PostMapping("/technicalskills")
    public ResponseEntity<APIResponse<Map<String, Object>>> commitTechnicalSkillTags(@RequestBody List<TechnicalSkillTag> technicalSkillTags) {
        Map<String, Object> data = Map.of(
            "technicalSkillTags", technicalSkillTags,
            "count", technicalSkillTags.size()
        );
        try {
            technicalSkillTagService.bulkCommitTechnicalSkillTags(technicalSkillTags);
            return ResponseEntity.ok(APIResponse.success("TechnicalSkillTag records created successfully", data));
        } catch (TechnicalSkillTagServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponse.error(e.getMessage(), data));
        } catch (DatabaseOperationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error(e.getMessage(), data));
        }
    }
}
