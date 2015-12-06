package help4karma.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.security.Policy;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by marcus on 2015-12-05.
 */
public class Project {

    public Project(String id, String name) {
        this.name = name;
        this.id = id;
    }

    public Project (String id, String name, double lat, double lon) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    private final String id;
    private String name;
    private String description;

    private String date; // Todo: should be a proper date
    private String location;

    private int maxNumberOfCandidates;
    private int currentNumberOfCandidates;

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

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMaxNumberOfCandidates() {
        return maxNumberOfCandidates;
    }

    public void setMaxNumberOfCandidates(int maxNumberOfCandidates) {
        this.maxNumberOfCandidates = maxNumberOfCandidates;
    }

    public int getCurrentNumberOfCandidates() {
        return currentNumberOfCandidates;
    }

    public void setCurrentNumberOfCandidates(int currentNumberOfCandidates) {
        this.currentNumberOfCandidates = currentNumberOfCandidates;
    }

    public String getDescription() {
        return description;
    }

    public static List<Project> createProjectsFromJson(JSONObject object) throws JSONException {
        List<Project> projectList = new ArrayList<>();
        JSONArray jsonProjects = object.getJSONArray("data");

        for (int i = 0; i<jsonProjects.length(); i++) {
            JSONObject jsonProject = jsonProjects.getJSONObject(i);
            Project project = new Project(jsonProject.getString("_id"), jsonProject.getString("name"));
            project.setDate(jsonProject.getString("date"));
            project.setLocation(jsonProject.getString("location"));
            project.setDescription(jsonProject.getString("description"));
            project.setCurrentNumberOfCandidates(jsonProject.getInt("numberCandidate"));
            project.setMaxNumberOfCandidates(jsonProject.getInt("maxNumberCandidate"));
            projectList.add(project);
        }

        return projectList;
    }


}
