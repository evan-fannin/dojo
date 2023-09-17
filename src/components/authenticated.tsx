import { useSession } from '@/libs/session';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const Authenticated = ({ children }: { children: ReactNode }) => {
    const { user, jwt } = useSession();
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            router.push({
                pathname: '/signin',
                query: { redirectUrl: `${router.pathname}` },
            });
        } else {
            setAuthenticated(true);
        }
    }, [user, router]);

    return authenticated ? <>{children}</> : <></>;
};
export default Authenticated;
