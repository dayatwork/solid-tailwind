import { HiSolidCalendar } from "solid-icons/hi";
import { Badge } from "../../../components";
import { formatDate } from "../../../utils/date";
import { PROJECT_STATUS_COLOR } from "../constant";
import { ProjectWithMembers } from "../type";

interface ProjectInfoProps {
  project: ProjectWithMembers;
}

export function ProjectInfo(props: ProjectInfoProps) {
  return (
    <>
      <div class="mt-1 flex items-center space-x-2 -ml-1.5">
        <Badge color={PROJECT_STATUS_COLOR[props.project.status]}>
          {props.project.status}
        </Badge>
      </div>

      <div class="flex items-center space-x-2">
        {/* <!-- Heroicon name: mini/calendar --> */}
        <span class="text-gray-700">
          <HiSolidCalendar size={18} />
        </span>
        <span class="text-sm font-medium text-gray-900">
          Created on{" "}
          <time datetime={props.project.created_at}>
            {formatDate(props.project.created_at, "en-EN")}
          </time>
        </span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-gray-700">
          <HiSolidCalendar size={18} />
        </span>
        <span class="text-sm font-medium text-gray-900">
          Last updated on{" "}
          <time datetime={props.project.updated_at}>
            {formatDate(props.project.updated_at, "en-EN")}
          </time>
        </span>
      </div>
    </>
  );
}
