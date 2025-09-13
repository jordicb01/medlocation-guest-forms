import { bookingsRouter } from '@/src/modules/bookings/server/procedures';

import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
    bookings: bookingsRouter

});
// export type definition of API
export type AppRouter = typeof appRouter;