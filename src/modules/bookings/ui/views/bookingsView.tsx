"use client";

import ErrorState from "@/src/components/errorState";
import LoadingState from "@/src/components/loadingState";
import { useTRPC } from "@/src/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";

export const BookingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.bookings.getMany.queryOptions());

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
}

export const BookingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Bookings"
            description="This may take a few seconds"
        />
    )
}

export const BookingsViewError = () => {
    return (
        <ErrorState
            title="Error loading Bookings"
            description="Please try again later"
        />
    )
}