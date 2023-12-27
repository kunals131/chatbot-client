import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { FaEye } from "react-icons/fa";
import { EngineerSearchResult } from "../Chat.types";
import { parseArrayValue } from "../Chat.helpers";

type EngineerDetailItemProps = {
  label: string;
  value?: string;
};

const parseLocation = (location?: string) => {
  if (!location) return " - ";
  try {
    const parsedLocation = JSON.parse(location);
    return `City: ${parsedLocation?.city} | Country: ${parsedLocation?.country}`;
  } catch {
    return " - ";
  }
};

const EngineerDetailItem = ({
  label,
  value = "-",
}: EngineerDetailItemProps) => {
  return (
    <div className="mt-2">
      <div className="">{label}</div>
      <div className="text-base text-white">{value}</div>
    </div>
  );
};

type Props = {
  record: EngineerSearchResult;
};
const EngineerDetailsDialog = ({ record }: Props) => {
  console.log(record, "Record");
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full flex items-center pr-5 text-sm cursor-pointer opacity-70 hover:opacity-100 transition-all justify-end">
          <FaEye />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-white">
              Resume{" "}
              <span className="font-light text-sm">
                #{record?.id?.substring(0, 6)}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-y-4 gap-4 gap-x-6">
                <EngineerDetailItem label="Full name" value={record?.name} />
                <EngineerDetailItem
                  label="Preffered Role"
                  value={record?.preferredRole}
                />
                <EngineerDetailItem
                  label="Email"
                  value={parseArrayValue(record?.email)}
                />
                <EngineerDetailItem
                  label="Email"
                  value={parseArrayValue(record?.phone)}
                />
              </div>
              <EngineerDetailItem label="Education" value={record?.Education || '-'} />
              <EngineerDetailItem label="Skills" value={record?.skills || '-'} />
              <EngineerDetailItem
                label="Previous Companies"
                value={record?.WorkExperience || '-'}
              />
              <div className="grid grid-cols-2 gap-y-4 gap-4 gap-x-6">
                <EngineerDetailItem
                  label="Full Time Status"
                  value={record?.ftAvailability || '-'}
                />
                <EngineerDetailItem
                  label="Full Time Salary"
                  value={`${record?.fullTimeSalary} ${record?.fullTimeSalaryCurrency}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-4 gap-x-6">
                <EngineerDetailItem
                  label="Part Time Status"
                  value={record?.ptAvailability}
                />
                <EngineerDetailItem
                  label="Part Time Salary"
                  value={`${record?.ptSalary} ${record?.partTimeSalaryCurrency}`}
                />
              </div>
              <EngineerDetailItem
                label="Location"
                value={parseLocation(record?.location)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EngineerDetailsDialog;
