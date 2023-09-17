import Authenticated from '@/components/authenticated';
import Speaking from '@/components/speaking';
import Sidebar from '@/components/sidebar';

const SpeakingPage = () => {
    return (
        <Authenticated>
            <div className="flex h-screen">
                <div className="flex-grow">
                    <Speaking />
                </div>
            </div>
        </Authenticated>
    );
};

export default SpeakingPage;
