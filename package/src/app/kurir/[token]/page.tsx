import DriverPortal from "@/components/driver-portal";
export default async function DriverPage({params}:{params:Promise<{token:string}>}){const {token}=await params;return <DriverPortal token={token}/>}
