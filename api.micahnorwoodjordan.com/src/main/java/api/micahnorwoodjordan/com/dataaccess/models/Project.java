package api.micahnorwoodjordan.com.dataaccess.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String subtitle;
    private String imageUrl;
    private String detail;

    protected Project() {}

    public Project(String title, String subtitle, String imageUrl, String detail) {
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
        this.detail = detail;
    }

    @Override
    public String toString() {
      return String.format("Project[id=%d, title='%s']", id, title);
    }

    public Long getId() {
      return id;
    }
    
    public String getTitle() {
      return title;
    }

    public String getSubtitle() {
      return subtitle;
    }

    public String getImageUrl() {
      return imageUrl;
    }

    public String getDetail() {
      return detail;
    }
}
