import { Leaf } from "lucide-react";

export default function Logo({ size = 200, className = "" }) {
    const titleSize = size * 0.4;
    const subtitleSize = size * 0.105;

    return (
        <div
            className={`flex items-center ${className}`}
            style={{ gap: size * 0.04 }}
        >
            <div
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                <svg
                    viewBox="0 0 200 200"
                    width={size}
                    height={size}
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

            <div style={{ lineHeight: 1 }}>
                <div
                    className="flex items-end"
                >
                    <p
                        className="font-bold underline decoration-(--gray-2)"
                        style={{ fontSize: titleSize }}
                    >
                        <span className="text-(--black)">Agro</span>
                        <span className="text-(--green-500)">Sys</span>
                    </p>
                </div>

                <p
                    className="text-(--black)"
                    style={{
                        fontSize: subtitleSize,
                        letterSpacing: size * 0.004,
                        marginTop: size * 0.055,
                    }}
                >
                    SISTEMA DE GESTÃO AGRÍCOLA
                </p>
            </div>
        </div>
    );
}