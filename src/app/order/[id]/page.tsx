import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ClientOrderRenderer from "./components/ClientOrderRenderer";
import ServerOrderRenderer from "./components/ServerOrderRenderer";

type Props = {
    params: {
        id?: string;
    };
};

export default function page({ params }: Props) {
    const id = params.id || "";
    const shouldRenderServerData = !id.startsWith("client-");

    return (
        <MaxWidthWrapper className="mt-10">
            {shouldRenderServerData ? (
                <ServerOrderRenderer id={id} />
            ) : (
                <ClientOrderRenderer id={id} />
            )}
        </MaxWidthWrapper>
    );
}
