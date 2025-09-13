import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/src/trpc/server"

import {
    BookingsView,
    BookingsViewError,
    BookingsViewLoading
} from "@/src/modules/bookings/ui/views/bookingsView"


const Page = async () => {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.bookings.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense
                fallback={<BookingsViewLoading />}
            >
                <ErrorBoundary fallback={<BookingsViewError />}>
                    <BookingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page