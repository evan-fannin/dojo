import Authenticated from '@/components/authenticated';
import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';

const ChatPage = () => {
    return (
        <Authenticated>
            {/* <Sidebar links={[]} /> */}
            <Chat />
        </Authenticated>
    );
};
export default ChatPage;
