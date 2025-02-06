export function PageHeader({ withTime }: { withTime: boolean }) {
    const today = new Date();

    return (
        <div className="mx-auto flex items-center justify-between gap-x-8 lg:mx-0">
            <div className="flex items-center gap-x-6">
                <img
                    alt="Uniworld Logo"
                    src="/uniworld_logo.png"
                    className="size-16 flex-none rounded-full ring-1 ring-gray-900/10 dark:bg-slate-50"
                />
                <h1>
                    <div className="text-sm/6 text-gray-500 dark:text-gray-400">
                        Flight List {withTime && (
                            <>
                                of {" "}
                                <time dateTime={today.toLocaleDateString()}>
                                    {today.toLocaleDateString("es-PA")}
                                </time>
                            </>
                        )}
                    </div>
                    <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                        Uniworld AirCargo
                    </div>
                </h1>
            </div>
        </div>
    );
}
