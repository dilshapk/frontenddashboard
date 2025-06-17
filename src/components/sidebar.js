import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const pages = [
  "Products List", "Marketing List", "Order List", "Media Plans",
  "Offer Pricing SKUs", "Clients", "Suppliers",
  "Customer Support", "Sales Reports", "Finance & Accounting"
];

export default function Sidebar() {
  const loc = useLocation().pathname;
  return (
    <div className="bg-light border-end p-3" style={{ width: 240, minHeight: '100vh' }}>
      <h5>Pages</h5>
      <div className="list-group">
        {pages.map(p => {
          const link = `/page/${encodeURIComponent(p)}`;
          return (
            <Link key={p} to={link}
                  className={`list-group-item list-group-item-action ${loc === link ? 'active' : ''}`}>
              {p}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
