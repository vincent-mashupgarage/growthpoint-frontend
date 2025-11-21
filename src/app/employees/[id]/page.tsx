'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEmployeeStore } from '@/stores/employeeStore';
import { ArrowLeft, Mail, Phone, MapPin, Building, Briefcase, Calendar, Shield, Award, User, Settings } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

export default function EmployeeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { getEmployeeById } = useEmployeeStore();
    const employee = getEmployeeById(params.id as string);

    if (!employee) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee not found</h2>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* Header / Breadcrumb */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Employee Profile</h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border dark:border-gray-800">
                    {/* Cover / Top Section */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800"></div>

                    <div className="px-6 pb-6">
                        <div className="relative flex flex-col sm:flex-row items-end -mt-12 mb-6">
                            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <Image
                                    src={employee.imageUrl}
                                    alt={`${employee.name}, ${employee.role} at ${employee.department}`}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{employee.role}</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 flex space-x-3">
                                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email
                                        </button>
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Radix Tabs */}
                        <Tabs.Root defaultValue="public" className="flex flex-col">
                            <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-6" aria-label="Employee Information">
                                <Tabs.Trigger
                                    value="public"
                                    className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 outline-none cursor-pointer transition-colors flex items-center"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Public Information
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="private"
                                    className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 outline-none cursor-pointer transition-colors flex items-center"
                                >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Private Information
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="settings"
                                    className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 outline-none cursor-pointer transition-colors flex items-center"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    HR Settings
                                </Tabs.Trigger>
                            </Tabs.List>

                            <Tabs.Content value="public" className="outline-none">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column: Info */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* About */}
                                        <section>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2 mb-4">About</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {employee.bio || "No bio available."}
                                            </p>
                                        </section>

                                        {/* Contact & Work Info */}
                                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Contact</h4>
                                                <ul className="space-y-3">
                                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <Mail className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                                                        <span className="truncate">{employee.email}</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <Phone className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                                                        <span>{employee.phone}</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <MapPin className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                                                        <span>{employee.location}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Work</h4>
                                                <ul className="space-y-3">
                                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <Building className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                                                        <span>{employee.department}</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <Briefcase className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                                                        <span>{employee.role}</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <Shield className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                                                        <span>{employee.managerId ? `Reports to Manager #${employee.managerId}` : 'Team Lead'}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>

                                        {/* Skills */}
                                        <section>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2 mb-4">Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {employee.skills.map(skill => (
                                                    <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                                        <Award className="w-3 h-3 mr-1.5" />
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Status & Meta */}
                                    <div className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Status</h3>
                                            <div className="flex items-center">
                                                <span
                                                    className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(employee.status)}`}
                                                    aria-label={getStatusLabel(employee.status)}
                                                    title={getStatusLabel(employee.status)}
                                                ></span>
                                                <span className="text-lg font-medium text-gray-900 dark:text-white">{employee.status}</span>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span>Joined Oct 2023</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Content>

                            <Tabs.Content value="private" className="outline-none py-4">
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-md p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Shield className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Restricted Access</h3>
                                            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                                <p>
                                                    This section contains sensitive information (Home Address, Bank Account, etc.) and is only visible to HR Managers.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50 pointer-events-none select-none blur-[2px]">
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Private Contact</h4>
                                        <p className="text-gray-900 dark:text-gray-300">123 Fake Street, Springfield</p>
                                        <p className="text-gray-900 dark:text-gray-300">+1 555 0199</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Citizenship</h4>
                                        <p className="text-gray-900 dark:text-gray-300">United States</p>
                                        <p className="text-gray-900 dark:text-gray-300">Passport: ********</p>
                                    </div>
                                </div>
                            </Tabs.Content>

                            <Tabs.Content value="settings" className="outline-none py-4">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">HR Settings</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage employee type, contracts, and working hours.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employee Type</label>
                                            <div className="mt-1">
                                                <input type="text" disabled value="Full-time" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Related User</label>
                                            <div className="mt-1">
                                                <input type="text" disabled value={employee.name} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Content>
                        </Tabs.Root>

                    </div>
                </div>
            </main>
        </div>
    );
}
