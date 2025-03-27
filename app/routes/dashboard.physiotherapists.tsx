import { AddPhysiotherapistDialog } from "~/components/dashboard/physiotherapists/add-physiotherapist-dialog";
import { columns } from "~/components/dashboard/physiotherapists/columns";
import { DataTable } from "~/components/data-table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Physiotherapist } from "~/types/user/physiotherapist.type";

const physiotherapists: Physiotherapist[] = [
  {
    id: "1",
    apellidoPaterno: "Doe",
    apellidoMaterno: "Smith",
    cedula: "123456",
    fotoUrl: "https://randomuser.me/api/portraits",
    nombre: "John",
  },
];

export default function DashboardPhysiotherapistsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
        <CardTitle pageTitle>Mis fisioterapeutas</CardTitle>
        <CardDescription>
          <AddPhysiotherapistDialog />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={physiotherapists} />
      </CardContent>
    </Card>
  );
}
