import { cn } from '../utils/cn';

interface MarqueeProps {
    className?: string;
    children: React.ReactNode;
    reverse?: boolean;
}

const Marquee = ({ className, children, reverse = false }: MarqueeProps) => {
    return (
        <div className={cn("flex w-full overflow-hidden whitespace-nowrap bg-brand-red py-2 text-brand-white", className)}>
            <div className={cn("flex min-w-full animate-marquee gap-8 px-4", reverse && "animate-marquee-reverse")}>
                {children}
                {children}
                {children}
                {children}
            </div>
        </div>
    );
};

export default Marquee;
