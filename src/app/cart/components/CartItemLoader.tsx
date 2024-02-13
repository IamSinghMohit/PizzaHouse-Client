import React from "react";

type Props = {};

function CartItemLoader({}: Props) {
    return (
        <div className="flex bg-white rounded-md border items-start justify-between flex-wrap gap-2  my-2">
            {/* LEFT SIDE */}
            <div className="flex items-start gap-2">
                <div className="rounded-sm w-[120px] h-[90px] shimmer" />
                <div>
                    <h3 className="text-sm w-[30px] shimmer" />
                    <span className="w-[30px] shimmer" />
                </div>
            </div>
            {/* RIGHT SIDE  */}
            <div className="h-12 w-[120px] shimmer m-2" />
            <div className="w-[40px] h-[40px] shimmer m-2" />
        </div>
    );
}

export default CartItemLoader;
