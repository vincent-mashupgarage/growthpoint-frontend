'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useInventoryStore } from '@/stores/inventoryStore';
import { ArrowLeft, MapPin, Package, Calendar, DollarSign, Tag, Wrench, AlertTriangle, FileText } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

export default function InventoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const items = useInventoryStore((state) => state.items);

    // Find item by ID
    const item = items.find(i => i.id === params.id);

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Item not found</h2>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-blue-600 hover:text-blue-500"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => router.back()}
                                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.sku}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${item.status === 'Available' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                    item.status === 'In Use' ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                                        item.status === 'Maintenance' ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' :
                                            item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                                'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                }`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image & Key Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-900">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white flex items-center mt-1">
                                        <Tag className="w-4 h-4 mr-2 text-gray-400" />
                                        {item.category}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white flex items-center mt-1">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        {item.location}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white flex items-center mt-1">
                                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                                        {item.quantity} Units
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Detailed Tabs */}
                    <div className="lg:col-span-2">
                        <Tabs.Root defaultValue="details" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700">
                                <Tabs.Trigger
                                    value="details"
                                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
                                >
                                    Item Details
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="maintenance"
                                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
                                >
                                    Maintenance
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="history"
                                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
                                >
                                    Usage History
                                </Tabs.Trigger>
                            </Tabs.List>

                            <div className="p-6">
                                <Tabs.Content value="details" className="space-y-6 outline-none">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Description</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Specifications</h4>
                                            <dl className="space-y-2">
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Manufacturer</dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{item.manufacturer || 'N/A'}</dd>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Model</dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{item.model || 'N/A'}</dd>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <dt className="text-sm text-gray-600 dark:text-gray-400">SKU</dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{item.sku}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Purchase Info</h4>
                                            <dl className="space-y-2">
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Purchase Date</dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                                                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                                                        {item.purchaseDate}
                                                    </dd>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <dt className="text-sm text-gray-600 dark:text-gray-400">Value</dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                                                        <DollarSign className="w-3 h-3 mr-1 text-gray-400" />
                                                        ${item.value.toLocaleString()}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </Tabs.Content>

                                <Tabs.Content value="maintenance" className="space-y-6 outline-none">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Maintenance Schedule</h3>
                                        <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                            + Log Maintenance
                                        </button>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-start space-x-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Next Scheduled Maintenance</p>
                                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                                                    {item.nextMaintenance || 'Not scheduled'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Last performed: {item.lastMaintenance || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Logs</h4>
                                        {/* Mock Maintenance Logs */}
                                        {[1, 2].map((log) => (
                                            <div key={log} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors">
                                                <div className="mt-0.5">
                                                    <Wrench className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Routine Inspection</p>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Oct 15, 2023</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Checked fluid levels, tire pressure, and hydraulic systems. All nominal.
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.Content>

                                <Tabs.Content value="history" className="space-y-6 outline-none">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Usage History</h3>
                                    </div>

                                    <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8 py-2">
                                        {/* Mock History Items */}
                                        <div className="relative pl-8">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Returned to Warehouse A</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Today at 9:00 AM</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Item checked in by John Doe.</p>
                                            </div>
                                        </div>
                                        <div className="relative pl-8">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Checked out to Site B</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Nov 18, 2023</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Assigned to Project X.</p>
                                            </div>
                                        </div>
                                        <div className="relative pl-8">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Completed</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Nov 10, 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </Tabs.Content>
                            </div>
                        </Tabs.Root>
                    </div>
                </div>
            </main>
        </div>
    );
}
