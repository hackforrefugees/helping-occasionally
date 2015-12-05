package help4karma;

import android.location.Location;
import android.location.LocationManager;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;

import java.util.List;

import help4karma.adapters.ProjectListAdapter;
import help4karma.models.Project;
import help4karma.services.RestServiceConsumer;

public class ListActivity extends ActionBarActivity {


    private final RestServiceConsumer service = new RestServiceConsumer();
    private ProjectListAdapter listAdapter;


    public ListActivity() {

    }

    protected Location getLastKnownLocation() {
        LocationManager locationManager = (LocationManager) this.getSystemService(this.LOCATION_SERVICE);
        if (locationManager != null) {
            return locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
        } else {
            return null;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        listAdapter = new ProjectListAdapter(this, R.layout.project_list_item);
        ListView projectList = (ListView) findViewById(R.id.projectListView);
        projectList.setAdapter(listAdapter);

        // Try to get a location
        Location l = getLastKnownLocation();

        // Do a query for projects
        service.mockSearch(l, new RestServiceConsumer.SearchCallback() {
            @Override
            public void success(List<Project> projects) {
                listAdapter.update(projects);

                // Note: this might have to be done in the UI thread
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        listAdapter.notifyDataSetChanged();
                    }
                });
            }

            @Override
            public void failure(String reason) {
                // Todo: Notifiy the user. A toast maybe?
            }
        });
    }
}
