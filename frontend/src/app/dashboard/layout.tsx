
import DashboardSideBar from "./_components/DashboardSideBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <DashboardSideBar />
        {children}
      
    </div>
  );
}
