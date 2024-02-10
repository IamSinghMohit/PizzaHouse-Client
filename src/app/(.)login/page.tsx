import { LoginForm, LoginWrapper } from "./components";

type Props = {
    searchParams: {
        with_layout?: string;
    };
};

export default function Login({ searchParams }: Props) {
    const layoutExist = Boolean(searchParams?.with_layout);
    return !layoutExist ? (
        <LoginForm />
    ) : (
        <LoginWrapper>
            <LoginForm />
        </LoginWrapper>
    );
}
