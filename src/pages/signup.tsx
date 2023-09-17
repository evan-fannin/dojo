import Form from "@/ui/form/Form";
import { useMutation } from "../libs/api";
import { useSession } from "../libs/session";
import Button from "../ui/form/Button";
import Input from "../ui/form/Input";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useSession();

  const [submit, loading, error] = useMutation<
    {
      email: string;
      password: string;
    },
    { token: string }
  >("/api/signup");

  const router = useRouter();

  return (
    <Form
      submitLabel="Create an account"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        submit({ email, password }).then(({ token }) => {
          login(token);

          router.push(
            "/"
          );
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

export default Signup;