import React from "react";
import CartItemLoader from "./CartItemLoader";

type Props = {};

function CartLoader({}: Props) {
    return (
        <div className="mt-8">
            {[
                "a31b9739-cf67-45e6-9924-da21f4d758c6",
                "7056942b-16e1-4b25-82d8-8cc3a6648f84",
                "93b68483-3e42-4528-a635-75ba7297bf33",
                "27d6e859-5015-4e71-bdcd-258c08d47ecf",
            ].map((item) => (
                <CartItemLoader key={item} />
            ))}
        </div>
    );
}

export default CartLoader;
