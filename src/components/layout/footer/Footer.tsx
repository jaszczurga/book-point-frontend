

export const Footer: React.FC = () => {
    return (
        <footer className="bg-colorHeader text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <div>
                    <h3 className="text-xl font-bold">Company</h3>
                    <ul>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Press</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Products</h3>
                    <ul>
                        <li>Features</li>
                        <li>Enterprise</li>
                        <li>Security</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Support</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>Terms of Service</li>
                        <li>Legal</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Contact</h3>
                    <ul>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>Instagram</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}