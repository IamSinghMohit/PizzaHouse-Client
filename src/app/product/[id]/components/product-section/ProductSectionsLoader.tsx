type Props = {};

function ProductSectionsLoader({}: Props) {
    return (
        <div>
            <div className="h-5 w-12 shimmer mb-1" />
            <div className="flex gap-1">
                {[
                    "b5f83469-508b-4c07-9ce8-11412873f9f2",
                    "191208c3-44c0-4ff6-86ab-3b99ac447bf2",
                    "ca4f09f3-12c0-4082-986b-b2d47136a52c",
                    "cdf261bd-b98d-448b-a54c-6d2bec66654f",
                ].map((id) => (
                    <div key={id} className="h-[40px] w-16 shimmer" />
                ))}
            </div>
        </div>
    );
}

export default ProductSectionsLoader;
