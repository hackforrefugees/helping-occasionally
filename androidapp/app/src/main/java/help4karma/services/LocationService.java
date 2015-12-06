package help4karma.services;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;

/**
 * Created by marcus on 2015-12-05.
 */
public class LocationService {
    public static Location getLastKnownLocation(Context context) {
        LocationManager locationManager = (LocationManager) context.getSystemService(context.LOCATION_SERVICE);
        if (locationManager != null) {
            return locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
        } else {
            return null;
        }
    }
}
