package api.micahnorwoodjordan.com.services;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.micahnorwoodjordan.com.dataaccess.TechnicalSkillTagRepository;
import api.micahnorwoodjordan.com.dataaccess.models.TechnicalSkillTag;
import api.micahnorwoodjordan.com.dataaccess.enums.TechnicalSkillTagType;

import api.micahnorwoodjordan.com.exceptions.TechnicalSkillTagServiceException;
import api.micahnorwoodjordan.com.services.enums.LogLevel;
import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


@Service
public class TechnicalSkillTagService {

    private LogService logger = new LogService(EmailMessageService.class.getName());

    @Autowired
    private TechnicalSkillTagRepository technicalSkillTagRepository;

    public List<TechnicalSkillTag> geTechnicalSkillTags(String type) throws TechnicalSkillTagServiceException, DatabaseOperationException {
        List<String> tagTypes = Arrays.stream(TechnicalSkillTagType.values())
        .map(Enum::name)
        .collect(Collectors.toList());

        if (tagTypes.contains(type)) {
            try {
                return technicalSkillTagRepository.findBytype(type);
            } catch (Exception e) {
                logger.logMessage(LogLevel.DEBUG, "ERROR AT geTechnicalSkillTags: " + e.getMessage());
                throw new DatabaseOperationException("an unknown database communication error occurred while attempting to retrieve technical skill tags");
            }
        } else{
            String msg = "an invalid tag type was provided: " + type;
            logger.logMessage(LogLevel.DEBUG, msg);
            throw new TechnicalSkillTagServiceException(msg);
        }
    }

    public List<TechnicalSkillTag> geTechnicalSkillTags() throws DatabaseOperationException {
        try {
            return technicalSkillTagRepository.findAll();
        } catch (Exception e) {
            logger.logMessage(LogLevel.DEBUG, "ERROR AT geTechnicalSkillTags: " + e.getMessage());
            throw new DatabaseOperationException("an unknown database communication error occurred while attempting to retrieve technical skill tags");
        }
    }

    public void bulkCommitTechnicalSkillTags(List<TechnicalSkillTag> technicalSkillTags) throws TechnicalSkillTagServiceException, DatabaseOperationException {
        String logErrorMessagePrefix = "ERROR AT bulkCommitTechnicalSkillTags: ";
        List<TechnicalSkillTag> tagsToSave = new ArrayList<>();
        List<String> tagTypes = Arrays.stream(TechnicalSkillTagType.values())
            .map(Enum::name)
            .collect(Collectors.toList());

        for (TechnicalSkillTag tag : technicalSkillTags) {
            if (tagTypes.contains(tag.getType())) {
                tagsToSave.add(tag);
            } else {
                String msg = "an invalid tag type was provided: " + tag.getType();
                logger.logMessage(LogLevel.DEBUG, logErrorMessagePrefix + msg);
                throw new TechnicalSkillTagServiceException(msg);
            }
        }
        try {
            technicalSkillTagRepository.saveAll(tagsToSave);
        } catch (Exception e) {
            logger.logMessage(LogLevel.DEBUG, "ERROR AT bulkCommitTechnicalSkillTags: " + e.getMessage());
            throw new DatabaseOperationException("an unknown database communication error occurred while attempting to commit technical skill tags");
        }
    }
}
