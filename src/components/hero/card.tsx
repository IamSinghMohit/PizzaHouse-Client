import Image from "next/image";
interface Props {
    image: string;
    heading: string;
    content: string;
}

function SectionCard({ image, heading, content }: Props) {
    return (
        <div className="flex gap-4 min-w-[400px] py-3 items-center">
            <div className="bg-red-100 relative flex items-center justify-center w-[60px] h-[60px] rounded-full">
                <Image
                    src={image}
                    alt="section card image"
                    width={30}
                    height={30}
                />
            </div>
            <div className="max-w-[250px]">
                <p className="uppercase text-white text-[14px]">{heading}</p>
                <p className="text-gray-300 text-[12px]">{content}</p>
            </div>
        </div>
    );
}

export default SectionCard;
