import TrackingView from "@/components/tracking-view";
export default async function TrackingPage({params}:{params:Promise<{token:string}>}){const {token}=await params;return <TrackingView token={token}/>}
