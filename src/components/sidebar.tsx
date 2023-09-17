import Image from 'next/image';
import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useSession } from '@/libs/session';
import { Transition } from '@tailwindui/react';

type SidebarLink = {
    text: string;
    icon: string;
    active: boolean;
};

type SidebarProps = {
    links: SidebarLink[];
    showSidebar: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, links }) => {
    const session = useSession();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <>
            {showSidebar && (
                <div
                    className={
                        'w-60 transition-all ease duration-500 bg-gray-800 text-white w-64 h-screen flex flex-col border-r border-gray-700 '
                    }
                >
                    <div className="flex items-center justify-center h-16">
                        <div className="flex items-center">
                            <Image
                                src="/dojo.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />

                            <span className="text-lg font-semibold ml-2">
                                Dojo
                            </span>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <nav className="mt-6">
                            <ul>
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className={`flex items-center py-2 px-8 ${
                                                link.active
                                                    ? 'text-blue-500'
                                                    : 'text-gray-300'
                                            }`}
                                        >
                                            <i
                                                className={`mr-4 ${link.icon}`}
                                            />
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center justify-center h-16">
                        <button
                            className="text-gray-400 hover:text-gray-200"
                            onClick={() => session.logout()}
                        >
                            <i className="fas fa-sign-out-alt mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
