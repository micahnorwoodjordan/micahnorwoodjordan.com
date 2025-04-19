package api.micahnorwoodjordan.com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.micahnorwoodjordan.com.dataaccess.TechnicalSkillTagRepository;
import api.micahnorwoodjordan.com.dataaccess.models.TechnicalSkillTag;


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
}
