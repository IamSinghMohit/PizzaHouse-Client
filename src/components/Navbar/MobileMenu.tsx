import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {}

export default function MobileMenu({}: Props) {
    const [open, setOpen] = useState(false);
    const portalId = "f0d9a1d8-47c0-4a0d-96b9-8ab3e59157e7";

    useEffect(() => {
        const div = document.createElement("div");
        div.id = portalId;
        document.getElementsByTagName("body")[0].prepend(div);

        return () => {
            document.getElementsByTagName("body")[0].removeChild(div);
        };
    }, []);

    return (
        <div className="overflow-hidden">
            <Button
                size="icon"
                onClick={() => setOpen((prev) => !prev)}
                className={`z-30 relative`}
            >
                {open ? <X strokeWidth={2.75} /> : <Menu strokeWidth={3} />}
            </Button>
            <div
                className={`fixed w-[260px] top-0 -right-full ${
                    open && "right-0"
                } h-screen z-20 transition-all duration-300 animate-out ease-in-out nav-blur`}
            >
                hello world
            </div>
        </div>
    );
}
