package help4karma.activities;

import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import java.util.List;

import help4karma.R;
import help4karma.adapters.ProjectListAdapter;
import help4karma.models.Project;
import help4karma.services.LocationService;
import help4karma.services.RestServiceConsumer;

public class ListActivity extends ActionBarActivity {


    private final RestServiceConsumer service = new RestServiceConsumer();
    private ProjectListAdapter listAdapter;


    public ListActivity() {

    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        Button switchToMapButton = (Button) this.findViewById(R.id.switchToMapButton);
        switchToMapButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListActivity.this,MapsActivity.class);
                startActivity(intent);
            }
        });

        listAdapter = new ProjectListAdapter(this, R.layout.project_list_item, service);
        ListView projectList = (ListView) findViewById(R.id.projectListView);
        projectList.setAdapter(listAdapter);

        // Try to get a location
        Location l = LocationService.getLastKnownLocation(this);

        // Do a query for projects
        service.search(l, new RestServiceConsumer.SearchCallback() {
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
            public void failure(final String reason) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(ListActivity.this, reason, Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
