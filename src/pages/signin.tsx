import { useMutation } from '@/libs/api';
import { useSession } from '@/libs/session';
import Button from '@/ui/form/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useSession();

    const [submit, loading, error] = useMutation<
        {
            email: string;
            password: string;
        },
        { token: string }
    >('/api/signin');

    const router = useRouter();

    return (
        <Form
            submitLabel="Sign in"
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                submit({ email, password }).then(({ token }) => {
                    login(token);
                    router.push(`${router.query.redirectUrl}`);
                });
            }}
        >
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                disabled={loading}
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                disabled={loading}
            />
        </Form>
    );
};

export default Signin;
