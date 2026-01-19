import React from 'react';
import { Users, Palette, BookOpen, GraduationCap, Search, ShoppingCart } from 'lucide-react';

export function Sidebar({ onNavigate }) {
  const icons = [
    { icon: Users, label: 'Creators', page: 'creators' },
    { icon: Palette, label: 'Customize', page: 'customize' },
    { icon: BookOpen, label: 'Stories', page: 'stories' },
    { icon: GraduationCap, label: 'Workshops', page: 'workshops' },
    { icon: Search, label: 'Search', page: 'search' },
    { icon: ShoppingCart, label: 'Cart', page: 'cart' },
  ];

  return (
    <div className="fixed top-1/3 left-0 flex flex-col gap-3 bg-white p-2 rounded-r-xl shadow">
      {icons.map(item => (
        <button
          key={item.label}
          onClick={() => onNavigate(item.page)}
          className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          title={item.label}
        >
          <item.icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}
