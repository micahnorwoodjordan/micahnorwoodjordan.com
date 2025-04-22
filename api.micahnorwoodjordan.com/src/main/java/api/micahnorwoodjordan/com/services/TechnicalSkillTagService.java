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
import api.micahnorwoodjordan.com.exceptions.DatabaseOperationException;


@Service
public class TechnicalSkillTagService {

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
                throw new DatabaseOperationException("an unknown database communication error occurred while attempting to retrieve technical skill tags");  // TODO: log this
            }
        } else{
            throw new TechnicalSkillTagServiceException("an invalid tag type was provided: " + type);  // TODO: log this
        }
    }

    public List<TechnicalSkillTag> geTechnicalSkillTags() throws DatabaseOperationException {
        try {
            return technicalSkillTagRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseOperationException("an unknown database communication error occurred while attempting to retrieve technical skill tags");  // TODO: log this
        }
    }

    public void bulkCommitTechnicalSkillTags(List<TechnicalSkillTag> technicalSkillTags) throws TechnicalSkillTagServiceException, DatabaseOperationException {
        List<TechnicalSkillTag> tagsToSave = new ArrayList<>();
        List<String> tagTypes = Arrays.stream(TechnicalSkillTagType.values())
            .map(Enum::name)
            .collect(Collectors.toList());

        for (TechnicalSkillTag tag : technicalSkillTags) {
            if (tagTypes.contains(tag.getType())) {
                tagsToSave.add(tag);
            } else {
                throw new TechnicalSkillTagServiceException("an invalid tag type was provided: " + tag.getType());  // TODO: log this
            }
        }
        try {
            technicalSkillTagRepository.saveAll(tagsToSave);
        } catch (Exception e) {
            throw new DatabaseOperationException("an unknown database communication error occurred while attempting to commit technical skill tags");  // TODO: log this
        }
    }
}
