import { Card } from "@/components/ui/card";
import { getTopings } from "../../hooks/useTopings";
import Toping from "./Toping";

type Props = {
    category: string;
    className?: string;
};


async function TopingList({ category, className }: Props) {
    const data = await getTopings(category);
    return (
        <Card
            className={`bg-gray-50 p-2 flex flex-wrap gap-2 justify-between overflow-y-scroll md:justify-normal ${className}`}
        >
            {data.map((toping) => (
                <Toping toping={toping} key={toping.id} />
            ))}
        </Card>
    );
}

export default TopingList;
