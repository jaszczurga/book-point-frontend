'use client';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type Props = {
    param: string;
    title: string;
    toggleValue: string;
}

export const CheckboxSingle: React.FC<Props> = ({param,title,toggleValue}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleAvailableChange = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        if (params.get(param) === toggleValue) {
            params.delete(param);
        } else {
            params.set(param, toggleValue);
        }
        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }


    return (
        <div className="flex items-center justify-start mx-4 my-2">
            <input
                type="checkbox"
                id="onlyAvailable"
                defaultChecked={searchParams.get(param) === toggleValue}
                onChange={handleAvailableChange}
                className="mr-2 w-4 h-4"
            />
            <label htmlFor="onlyAvailable" className="text-colorHeader text-sm">{title}</label>
        </div>
    )
}