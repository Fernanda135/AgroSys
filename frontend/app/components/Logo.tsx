import { Leaf } from "lucide-react";

export default function Logo({ size = 200, className = "" }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 200 200"
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
            >
                <polygon
                    points="100,4 186.6,52 186.6,148 100,196 13.4,148 13.4,52"
                    className="fill-(--black) stroke-(--green-500)"
                    strokeWidth="4"
                />

                <polygon
                    points="100,20 173.2,60 173.2,140 100,180 26.8,140 26.8,60"
                    className="fill-none stroke-(--green-500)"
                    strokeWidth="3"
                />
            </svg>

            <Leaf
                className="relative text-(--green-500)"
                size={size * 0.4}
                strokeWidth={1}
            />
        </div>
    );
}