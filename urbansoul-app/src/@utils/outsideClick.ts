import { useEffect, useRef } from "react";

export const OutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                callback();
        }

        document.addEventListener('mouseup', handleClick);
        document.addEventListener('touchend', handleClick);

        return () => {
            document.removeEventListener('mouseup', handleClick);
            document.removeEventListener('touchend', handleClick);
        };
    }, [callback]);

    return ref;
}