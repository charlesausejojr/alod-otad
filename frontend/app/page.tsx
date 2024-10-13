import Dashboard from "./ui/dashboard/dashboard";
import Sidenav from "./ui/sidenav";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidenav/>
      <Dashboard/>
    </div>
  );
}
