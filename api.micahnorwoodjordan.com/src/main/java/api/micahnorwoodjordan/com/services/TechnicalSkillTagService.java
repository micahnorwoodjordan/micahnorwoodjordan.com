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


@Service
public class TechnicalSkillTagService {

    @Autowired
    private TechnicalSkillTagRepository technicalSkillTagRepository;

    public List<TechnicalSkillTag> getTechnicalSkillTagsByType(String type) {
        return technicalSkillTagRepository.findBytype(type);
    }

    public List<TechnicalSkillTag> getAllTechnicalSkillTags() {
        return technicalSkillTagRepository.findAll();
    }

    public boolean bulkCommitTechnicalSkillTags(List<TechnicalSkillTag> technicalSkillTags) {
        boolean isSuccess = true;

        List<TechnicalSkillTag> tagsToSave = new ArrayList<>();
        List<String> tagTypes = Arrays.stream(TechnicalSkillTagType.values())
            .map(Enum::name)
            .collect(Collectors.toList());

        for (TechnicalSkillTag tag : technicalSkillTags) {
            if (tagTypes.contains(tag.getType())) {
                tagsToSave.add(tag);
            } else {
                isSuccess = false;
                System.out.println("Invalid tag type: " + tag.getType());
                break;
            }
        }

        if (isSuccess) {
            technicalSkillTagRepository.saveAll(tagsToSave);
        }
        return isSuccess;
    }
}
