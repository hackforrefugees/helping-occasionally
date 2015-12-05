package help4karma.services;

import android.location.Location;
import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;

import help4karma.models.Project;

/**
 * Created by marcus on 2015-12-05.
 */
public class RestServiceConsumer {

    private String serviceUrl = "http://todo";

    public void search(Location location, SearchCallback callback) {

        (new startSearchTask(location,callback)).execute();
    }

    public void mockSearch(Location location, SearchCallback callback) {

        (new startMockSearchTask(callback)).execute();
    }

    private class startMockSearchTask extends AsyncTask<Void, Void, Void> {

        public startMockSearchTask(SearchCallback callback) {
            this.callback = callback;
        }

        private SearchCallback callback;

        @Override
        protected Void doInBackground(Void... params) {
            List<Project> projectList = new ArrayList<>();
            projectList.add(new Project("Hello",57.7089355,11.9669514));
            projectList.add(new Project("World"));
            projectList.add(new Project("Hello 1"));
            projectList.add(new Project("Hello 2"));
            projectList.add(new Project("Hello 3"));
            projectList.add(new Project("Hello 4"));
            projectList.add(new Project("Hello 5"));
            projectList.add(new Project("Hello 6"));
            projectList.add(new Project("Hello 7"));
            projectList.add(new Project("Hello 8"));
            projectList.add(new Project("Hello 9"));
            projectList.add(new Project("Hello 10"));
            projectList.add(new Project("Hello 12"));
            callback.success(projectList);
            return null;
        }
    }

    private class startSearchTask extends AsyncTask<Void, Void, Void> {

        private Location location;
        private SearchCallback callback;

        public startSearchTask(Location location, SearchCallback callback) {
            this.location = location;
            this.callback = callback;
        }



        @Override
        protected Void doInBackground(Void... params) {

            try {
                URL url = new URL(serviceUrl);
                URLConnection connection = null;
                connection = url.openConnection();
                JSONObject obj = new JSONObject(IOUtils.toString(connection.getInputStream(), "utf-8"));
                callback.success(Project.createProjectsFromJson(obj));
            } catch (IOException e) {
                e.printStackTrace();
                callback.failure("Network Error");
            } catch (JSONException e) {
                callback.failure("Invalid JSON");
            }

            return null;

        }
    }

    public interface SearchCallback {

        public void success(List<Project> projects);

        public void failure(String reason);

    }
}
