export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-[#1F3A2B]">
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-[#A98446] stroke-[1.5]" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate font-semibold leading-none">Al-Munawwar</span>
                <span className="truncate text-[10px] text-muted-foreground leading-none mt-0.5">Admin CMS</span>
            </div>
        </>
    );
}
