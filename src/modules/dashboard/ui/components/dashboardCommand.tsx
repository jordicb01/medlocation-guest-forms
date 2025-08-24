import { Dispatch, SetStateAction } from 'react';

import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/src/components/ui/command'

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder='Find a Booking or Property'
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}

export default DashboardCommand