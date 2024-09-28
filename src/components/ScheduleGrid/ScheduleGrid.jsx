import PropTypes from 'prop-types';
import '/style/schedule.css'; 

const ScheduleGrid = ({ schedule }) => {
    const timeBlocks = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];

    return (
        <table className="schedule_table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Task</th>
                </tr>
            </thead>
            <tbody>
                {timeBlocks.map((time, index) => {
                    const task = schedule[time];
                    if (task) {
                        const taskDuration = task.duration;
                        return (
                            <tr key={index}>
                                <td>{time}</td>
                                {/* Task spans multiple time slots based on duration */}
                                <td rowSpan={taskDuration}>
                                    {task.taskName} (Duration: {taskDuration} hours)
                                </td>
                            </tr>
                        );
                    } else {
                        // If there's no task at this time, just render an empty row
                        return (
                            <tr key={index}>
                                <td>{time}</td>
                                <td>Free</td>
                            </tr>
                        );
                    }
                })}
            </tbody>
        </table>
    );
};

// PropTypes validation
ScheduleGrid.propTypes = {
    schedule: PropTypes.object.isRequired, // Assuming 'schedule' is an object
};


export default ScheduleGrid;