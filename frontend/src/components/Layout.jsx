import NavBar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
