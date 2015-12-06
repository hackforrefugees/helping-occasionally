package help4karma.adapters;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import help4karma.R;
import help4karma.models.Project;
import help4karma.services.RestServiceConsumer;

/**
 * Created by marcus on 2015-12-05.
 */
public class ProjectListAdapter extends ArrayAdapter {

    private List<Project> projects = new ArrayList<>();
    private Context context;
    private LayoutInflater inflater;
    private int resource;
    private final RestServiceConsumer service;

    public ProjectListAdapter(Context context, int resource, RestServiceConsumer service) {
        super(context, resource);
        this.resource = resource;
        this.context = context;
        this.service = service;
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
        final Project project = projects.get(position);

        ((TextView)convertView.findViewById(R.id.textViewTitle)).setText(project.getName());
        ((TextView)convertView.findViewById(R.id.textViewMetadata)).setText(project.getDescription());
        final Button appliedButton = (Button)convertView.findViewById(R.id.applyButton);
        appliedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean status = service.applyForProject(project);
                if (status) {
                    ((Activity) context).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            appliedButton.setText(R.string.applied_button_applied_text);
                            Toast.makeText(
                                    context,
                                    context.getString(R.string.applied_toast, project.getName()),
                                    Toast.LENGTH_LONG)
                                    .show();
                        }
                    });
                }
            }
        });

        return convertView;
    }
}
