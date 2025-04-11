
import Header from "../Header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen">
      <Header />
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="flex justify-center items-center w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
