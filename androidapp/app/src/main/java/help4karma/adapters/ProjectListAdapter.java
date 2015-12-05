package help4karma.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import java.util.ArrayList;
import java.util.List;

import help4karma.R;
import help4karma.models.Project;

/**
 * Created by marcus on 2015-12-05.
 */
public class ProjectListAdapter extends ArrayAdapter {

    private List<Project> projects = new ArrayList<>();
    private Context context;
    private LayoutInflater inflater;
    private int resource;

    public ProjectListAdapter(Context context, int resource) {
        super(context, resource);
        this.resource = resource;
        this.context = context;
        inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    public void update(List<Project> projects) {
        this.projects = projects;
    }

    @Override
    public int getCount() {
        return projects.size();
    }

    @Override
    public Object getItem(int position) {
        return projects.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position; // Todo ??
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if( convertView == null ){
            //We must create a View:
            convertView = inflater.inflate(resource, parent, false);
        }
        Project project = projects.get(position);

        ((TextView)convertView.findViewById(R.id.textViewTitle)).setText(project.getName());
        ((TextView)convertView.findViewById(R.id.textViewMetadata)).setText(project.getName());

        return convertView;
    }
}
