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
            className={`bg-gray-50 p-2 flex flex-wrap gap-2 content-start overflow-y-scroll ${className} thin-scroll-thumb`}
        >
            {data.map((toping) => (
                <Toping toping={toping} key={toping.id} />
            ))}
        </Card>
    );
}

export default TopingList;
