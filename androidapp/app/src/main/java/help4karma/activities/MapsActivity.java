package help4karma.activities;

import android.content.Intent;
import android.location.Location;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.List;

import help4karma.R;
import help4karma.models.Project;
import help4karma.services.LocationService;
import help4karma.services.RestServiceConsumer;

public class MapsActivity extends FragmentActivity {

    private GoogleMap map; // Might be null if Google Play services APK is not available.
    private final RestServiceConsumer service = new RestServiceConsumer();
    private final List<LatLng> latLngs = new ArrayList<>();
    private int currentMarker = -1;

    private static final float DEFAULT_ZOOM = 15.0F;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        setUpMapIfNeeded();
        Button switchToMapButton = (Button) this.findViewById(R.id.switchToListButton);
        switchToMapButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MapsActivity.this, ListActivity.class);
                startActivity(intent);
            }
        });
        final Button nextProject = (Button) this.findViewById(R.id.switchToNextProject);
        final Button previousProject = (Button) this.findViewById(R.id.switchToPreviousProject);
        if (latLngs.size() <= 1) {
            setOnClickListeners(nextProject, previousProject);
        } else {
            removeButtonsFromView(nextProject, previousProject);
        }
    }

    private void setOnClickListeners(final Button nextProject, final Button previousProject) {
        nextProject.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                currentMarker++;
                if (currentMarker >= latLngs.size()) {
                    currentMarker = 0;
                }
                updateMap(currentMarker);
            }
        });

        previousProject.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                currentMarker--;
                if (currentMarker < 0) {
                    currentMarker = latLngs.size() - 1;
                }
                updateMap(currentMarker);
            }
        });
    }

    private void updateMap(final int currentMarker) {
        final LatLng latLng = latLngs.get(currentMarker);
        if (latLng != null) {
            map.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, DEFAULT_ZOOM));
        }
    }

    private void removeButtonsFromView(final Button nextProject, final Button previousProject) {
        ViewGroup parent = (ViewGroup) nextProject.getParent();
        if (parent == null) {
            parent = (ViewGroup) previousProject.getParent();
            if (parent == null) {
                throw new RuntimeException();
            } else {
                parent.removeView(nextProject);
                parent.removeView(previousProject);
            }
        } else {
            parent.removeView(nextProject);
            parent.removeView(previousProject);
        }
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
        Location location = LocationService.getLastKnownLocation(this);
        final LatLng position = new LatLng(location.getLatitude(), location.getLongitude());
        map.moveCamera(CameraUpdateFactory.newLatLngZoom(position, DEFAULT_ZOOM));
        map.addMarker(new MarkerOptions().position(position).title("You")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN)));
        service.search(location, new RestServiceConsumer.SearchCallback() {
            @Override
            public void success(final List<Project> projects) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        for (Project project : projects) {
                            if (project.hasLocation()) {
                                final LatLng latLng = new LatLng(project.getLat(), project.getLon());
                                latLngs.add(latLng);
                                final MarkerOptions marker = new MarkerOptions().position(latLng)
                                        .snippet(String.format("%s - %s", project.getDate(), project.getDescription()))
                                        .title(project.getName());
                                map.addMarker(marker);
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
