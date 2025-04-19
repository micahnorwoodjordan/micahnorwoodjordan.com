package api.micahnorwoodjordan.com.dataaccess.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TechnicalSkillTag {
  enum TechnicalSkillTagType {
    PROGRAMMING_LANGUAGE,
    PROGRAMMING_LANGUAGE_FRAMEWORK,
    OPERATING_SYSTEM_PLATFORM,
    CLOUD_HOSTING_PLATFORM,
    GENERAL_SKILL
  }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String type;

    protected TechnicalSkillTag() {}

    public TechnicalSkillTag(String title, String type) {
      for (TechnicalSkillTagType t : TechnicalSkillTagType.values()) {
        if (t.name().equals(type)) {
          this.type = type;
          this.title = title;
          return;
        }
      }
      throw new IllegalArgumentException("Invalid type: " + type);
    }

    @Override
    public String toString() {
      return String.format("TechnicalSkillTag[id=%d, title='%s']", id, title);
    }

    public Long getId() {
      return id;
    }
    
    public String getTitle() {
      return title;
    }

    public String getType() {
      return type;
    }
}
