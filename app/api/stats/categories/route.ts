import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const id = searchParams.get("id");

  const queryParams = OverviewQuerySchema.safeParse({ from, to, id });
  if (!queryParams.success) {
    throw new Error(queryParams.error.message);
  }

  const stats = await getCategoryStats(
    queryParams.data.from,
    queryParams.data.to,
    queryParams.data.id
  );

  return Response.json(stats);
}

export type GetCategoriesStatsResponseType = Awaited<
  ReturnType<typeof getCategoryStats>
>;

async function getCategoryStats(from: Date, to: Date, id: string) {
  const stats = await prisma.transaction.groupBy({
    by: ["type", "id"],
    where: {
      date: {
        gte: from,
        lte: to,
      },
      id: id,
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  return stats;
}
