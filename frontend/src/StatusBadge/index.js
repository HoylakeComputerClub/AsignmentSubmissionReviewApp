import { Badge } from "react-bootstrap";

const StatusBadge = (props) => {
    const { text } = props;
    // className="mb-2 text-muted" ?? maybe??

    function getBadgeColour() {
        if (text === "Completed")
            return "success";
        else if (text === "Pending Submission")
            return "warning";
        else if (text === "In Review")
            return "secondary";
        else if (text === "Submitted")
            return "primary";
        else if (text === "Resubmitted")
            return "info";
        else if (text === "Needs Update")
            return "danger";
    }

    return (
        <Badge
          pill
          bg={getBadgeColour()}
          style={{
            fontSize: "1em",
          }}
        >
          {text}
        </Badge>
      );
} 

export default StatusBadge;