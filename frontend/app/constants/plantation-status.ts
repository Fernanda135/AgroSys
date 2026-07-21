export const PLANTATION_STATUS = {
    PLANTED: "PLANTED",
    GROWING: "GROWING",
    READY: "READY",
    HARVESTED: "HARVESTED",
    DELAYED: "DELAYED",
} as const;

export const PLANTATION_STATUS_LABELS = {
    [PLANTATION_STATUS.PLANTED]: "Plantada",
    [PLANTATION_STATUS.GROWING]: "Em crescimento",
    [PLANTATION_STATUS.READY]: "Pronta para colher",
    [PLANTATION_STATUS.HARVESTED]: "Colhida",
    [PLANTATION_STATUS.DELAYED]: "Atrasada",
} as const;

export const PLANTATION_STATUS_COLORS = {
    [PLANTATION_STATUS.PLANTED]:
        "bg-blue-100 text-blue-700",

    [PLANTATION_STATUS.GROWING]:
        "bg-yellow-100 text-yellow-700",

    [PLANTATION_STATUS.READY]:
        "bg-orange-100 text-orange-700",

    [PLANTATION_STATUS.HARVESTED]:
        "bg-(--green-50) text-(--green-500)",

    [PLANTATION_STATUS.DELAYED]:
        "bg-red-100 text-red-700",
} as const;