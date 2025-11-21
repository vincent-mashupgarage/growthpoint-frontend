import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InventoryItem } from '@/types/inventory';
import { MapPin, Package, AlertTriangle, Wrench } from 'lucide-react';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

interface InventoryCardProps {
    item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
    return (
        <Link href={`/inventory/${item.id}`} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-900">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Available' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                item.status === 'In Use' ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                                    item.status === 'Maintenance' ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' :
                                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                            'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                            }`}>
                            {item.status}
                        </span>
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.category}</p>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                {item.name}
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                        {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 dark:text-gray-300 mt-auto">
                        <div className="flex items-center">
                            <Package className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="truncate">{item.location}</span>
                        </div>
                        <div className="col-span-2 flex items-center text-xs text-gray-500 font-mono mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                            SKU: {item.sku}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
