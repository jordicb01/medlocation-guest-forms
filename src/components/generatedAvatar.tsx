import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GeneratedAvatarProps {
    seed: string;
    className?: string;
}

const GeneratedAvatar = ({ seed, className }: GeneratedAvatarProps) => {
    const avatar = createAvatar(initials, {
        seed,
        fontWeight: 500,
        fontSize: 42
    })

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default GeneratedAvatar