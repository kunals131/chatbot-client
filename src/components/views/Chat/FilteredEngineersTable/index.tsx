import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EngineerSearchResult } from "../Chat.types";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function DataTable({ records, caption }: Props) {
  return (
    <Table className="w-[750px]">
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-fit">ResumeId</TableHead>
          <TableHead>FT Status</TableHead>
          <TableHead>PT Status</TableHead>
          <TableHead className="w-[170px]">Skills</TableHead>
          <TableHead className="text-right">FT Salary</TableHead>
          <TableHead className="text-right">PT Salary</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records?.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.id}</TableCell>
            <TableCell>{record.ftAvailability}</TableCell>
            <TableCell>{record.ptAvailability}</TableCell>
            <TableCell className="">{record.skills}</TableCell>
            <TableCell className="text-right">{record.ftSalary}</TableCell>
            <TableCell className="text-right">{record.ptSalary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type Props = {
  caption?: string;
  records: EngineerSearchResult[];
};
