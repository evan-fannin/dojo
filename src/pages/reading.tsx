import Authenticated from '@/components/authenticated';
import Reading from '@/components/reading';
import Sidebar from '@/components/sidebar';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const ReadingPage = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    return (
        <Authenticated>
            <div className="flex-grow transition-all ease">
                <div className="relative top-0 left-0 h-2">
                    <button
                        className="text-gray-400 hover:text-gray-200"
                        onClick={toggleSidebar}
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                </div>
                <Reading />
            </div>
        </Authenticated>
    );
};

export default ReadingPage;
