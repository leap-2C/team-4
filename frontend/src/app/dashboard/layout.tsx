
import DashboardSideBar from "./_components/DashboardSideBar";
import Header from "../Header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Header/>
      <div className="px-[80px] pt-[40px] flex">
        <DashboardSideBar />
        {children}
      </div>
        
    </div>
  );
}
