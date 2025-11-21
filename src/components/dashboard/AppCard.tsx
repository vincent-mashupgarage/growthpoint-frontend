import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface AppCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color: string;
    status?: 'active' | 'coming_soon';
}

export default function AppCard({ title, description, icon: Icon, href, color, status = 'active' }: AppCardProps) {
    const CardContent = () => (
        <div className={`relative group h-full p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${status === 'coming_soon' ? 'opacity-75 cursor-not-allowed' : 'hover:-translate-y-1'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${color}`}>
                <Icon className="w-7 h-7 text-white" />
            </div>

            <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>

            {status === 'coming_soon' && (
                <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Coming Soon
                    </span>
                </div>
            )}

            {status === 'active' && (
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Open Module &rarr;
                </div>
            )}
        </div>
    );

    if (status === 'coming_soon') {
        return <div className="h-full"><CardContent /></div>;
    }

    return (
        <Link href={href} className="block h-full outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl">
            <CardContent />
        </Link>
    );
}
