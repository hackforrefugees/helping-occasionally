package help4karma.models;

import org.json.JSONException;
import org.json.JSONObject;

import java.security.Policy;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by marcus on 2015-12-05.
 */
public class Project {

    public Project(String name) {
        this.name = name;
    }

    public Project (String name, double lat, double lon) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    private String name;
    private String description;

    private Double lat;
    private Double lon;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public boolean hasLocation() {
        return (lat != null) && (lon != null);
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public String getDescription() {
        return description;
    }

    public static List<Project> createProjectsFromJson(JSONObject object) throws JSONException {
        List<Project> projectList = new ArrayList<>();
        projectList.add(new Project(object.getString("name"))); // Todo
        return projectList;
    }


}
