import { Layout } from 'antd';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Layout.Footer className="bg-green-600 text-white text-center py-6">
      <div className="max-w-6xl mx-auto">
        <ul className="flex justify-center gap-6 mb-4">
          <li>
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/brands" className="text-white hover:underline">
              Brands
            </Link>
          </li>
          <li>
            <Link to="/lists" className="text-white hover:underline">
              Products
            </Link>
          </li>
        </ul>
        <div>© 2025 Sideways. All rights reserved.</div>
      </div>
    </Layout.Footer>
  );
}