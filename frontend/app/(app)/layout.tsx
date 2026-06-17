import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="shrink-0">
                <Header />
            </div>
            
            <div className="flex flex-1 overflow-hidden">
                <div className="shrink-0 border-r border-r-(--gray)">
                    <Sidebar />
                </div>
                
                <div className="flex-1 overflow-y-auto bg-(--bg-accent) p-6 hide-scrollbar">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}