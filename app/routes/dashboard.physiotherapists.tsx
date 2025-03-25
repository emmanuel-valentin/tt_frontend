import { columns } from "~/components/dashboard/physiotherapists/columns";
import { DataTable } from "~/components/data-table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
      <CardHeader>
        <CardTitle pageTitle>Mis fisioterapeutas</CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={physiotherapists} />
      </CardContent>
    </Card>
  );
}
