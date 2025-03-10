import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { columns } from '~/components/dashboard/patients/columns';
import { DataTable } from '~/components/data-table/data-table';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Patient } from '~/interfaces/user/patient.interface';

const patients: Patient[] = [
  {
    id: '1',
    fotoUrl: 'https://randomuser.me/api/portraits',
    nombre: 'John',
    apellidoPaterno: 'Doe',
    apellidoMaterno: 'Smith',
    estatus: 'aceptado',
  },
  {
    id: '2',
    fotoUrl: 'https://randomuser.me/api/portraits',
    nombre: 'Andrea',
    apellidoPaterno: 'Aguilar',
    apellidoMaterno: 'Musk',
    estatus: 'pendiente',
  },
];

export default function DashboardPatientsPage() {
  const codigoVinculacion = crypto.randomUUID().toString();

  const onCopy = (value: string) => {
    // Validate if the clipboard is available
    if (!navigator.clipboard) {
      toast.error(
        'Tu navegador no soporta la funcionalidad de copiar al portapapeles'
      );
      return;
    }

    navigator.clipboard.writeText(value);
    toast.success('Código de vinculación copiado al portapapeles');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Mis pacientes</CardTitle>
        <div className="flex items-center gap-2">
          <p className="text-gray-700">
            Código de vinculación:{' '}
            <span className="text-primary">{codigoVinculacion}</span>
          </p>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onCopy(codigoVinculacion)}
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={patients} />
      </CardContent>
    </Card>
  );
}
