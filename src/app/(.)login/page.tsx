import { LoginForm, Wrapper } from "./components";

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
        <Wrapper>
            <LoginForm />
        </Wrapper>
    );
}
