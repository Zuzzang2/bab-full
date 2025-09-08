import NavBar from '@/components/Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
