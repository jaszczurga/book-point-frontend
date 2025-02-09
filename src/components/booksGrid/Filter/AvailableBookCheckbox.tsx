'use client';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const AvailableBookCheckbox = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleAvailableChange = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        if (params.get('status') === 'available') {
            params.delete('status');
        } else {
            params.set('status', 'available');
        }
        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }


    return (
        <div className="flex items-center justify-start mx-4 my-2" data-testid="show-available-cards">
            <input
                type="checkbox"
                defaultChecked={searchParams.get('status') === 'available'}
                id="onlyAvailable"
                onChange={handleAvailableChange}
                className="mr-2 w-4 h-4"
            />
            <label htmlFor="onlyAvailable" className="text-colorHeader text-sm">Show only available books</label>
        </div>
    )
}