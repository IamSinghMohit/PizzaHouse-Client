import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ClientOrderRenderer from "./components/ClientOrderRenderer";
import FetchedOrderRenderer from "./components/FetchedOrderRenderer";

type Props = {
    params: {
        id?: string;
    };
};

export default function page({ params }: Props) {
    const id = params.id || "";
    const shouldFetchedTheOrder = !id.startsWith("client-");

    return (
        <MaxWidthWrapper className="mt-10">
            {shouldFetchedTheOrder  ? (
                <FetchedOrderRenderer id={id} />
            ) : (
                <ClientOrderRenderer id={id} />
            )}
        </MaxWidthWrapper>
    );
}
