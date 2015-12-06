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

    private final String serviceUrl = "http://hack4refugees.svanefalk.com/api/";

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
            projectList.add(new Project("1","Hello",57.7089355,11.9669514));
            projectList.add(new Project("2","World"));
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
                URL url = new URL(serviceUrl + "projects");
                URLConnection connection = null;
                connection = url.openConnection();
                JSONObject obj = new JSONObject(IOUtils.toString(connection.getInputStream(), "utf-8"));
                if (obj.getString("status") == null || !obj.getString("status").equals("success")) {
                    callback.failure("Status on successful");
                } else {
                    callback.success(Project.createProjectsFromJson(obj));
                }
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
