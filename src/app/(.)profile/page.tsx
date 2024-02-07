import { ProfileForm,ProfileWrapper } from "./components";
type Props = {
    searchParams: {
        with_layout?: string;
    };
};

export default function Profile({ searchParams }: Props) {
    const with_layout = Boolean(searchParams.with_layout);
    return !with_layout ? (
        <ProfileForm />
    ) : (
        <ProfileWrapper>
            <ProfileForm />
        </ProfileWrapper>
    );
}
