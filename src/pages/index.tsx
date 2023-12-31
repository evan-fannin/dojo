import Authenticated from '@/components/authenticated';
import Options from '@/components/options';
import Sidebar from '@/components/sidebar';

type Message = {
    role: string;
    content: string;
};

const Home = () => {
    return (
        <Authenticated>
            <div className="flex h-screen">
                {/* <Sidebar links={[]} /> */}
                <div className="flex-grow">
                    <Options />
                </div>
            </div>
        </Authenticated>
    );
};

export default Home;
