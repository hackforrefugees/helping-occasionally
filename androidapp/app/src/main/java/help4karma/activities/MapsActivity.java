package help4karma.activities;

import android.location.Location;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.List;

import help4karma.R;
import help4karma.models.Project;
import help4karma.services.LocationService;
import help4karma.services.RestServiceConsumer;

public class MapsActivity extends FragmentActivity {

    private GoogleMap map; // Might be null if Google Play services APK is not available.
    private final RestServiceConsumer service = new RestServiceConsumer();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        setUpMapIfNeeded();
    }

    @Override
    protected void onResume() {
        super.onResume();
        setUpMapIfNeeded();
    }

    private void setUpMapIfNeeded() {
        // Do a null check to confirm that we have not already instantiated the map.
        if (map == null) {
            // Try to obtain the map from the SupportMapFragment.
            map = ((SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map))
                    .getMap();
            // Check if we were successful in obtaining the map.
            if (map != null) {
                setUpMap();
            }
        }
    }

    private void setUpMap() {
        Location l = LocationService.getLastKnownLocation(this);
        map.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(l.getLatitude(),l.getLongitude())));


        service.search(l, new RestServiceConsumer.SearchCallback() {
            @Override
            public void success(final List<Project> projects) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        for (Project project : projects) {
                            if (project.hasLocation()) {
                                map.addMarker(new MarkerOptions().position(new LatLng(project.getLat(), project.getLon())).title(project.getName()));
                            }
                        }
                    }
                });

            }

            @Override
            public void failure(String reason) {
                // Todo
            }
        });
    }
}
