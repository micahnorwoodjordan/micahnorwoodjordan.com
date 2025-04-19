package api.micahnorwoodjordan.com.dataaccess.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TechnicalSkillTag {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String type;

    protected TechnicalSkillTag() {}

    public TechnicalSkillTag(String title, String type) {
      this.type = type;
      this.title = title;
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
