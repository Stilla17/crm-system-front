import { EmployeeProfile } from "src/components/hr/employee-profile";

export default async function EmployeeProfilePage({
  params,
}: PageProps<"/hr/[id]">) {
  const { id } = await params;

  return <EmployeeProfile employeeId={id} />;
}
