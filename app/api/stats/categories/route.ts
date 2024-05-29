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
    queryParams.data.id,
  );

  const categoryDescriptions = await getCategoryDescriptions();

  const categorizedStats = stats.map((categoryStat) => ({
    ...categoryStat,
    description: categoryDescriptions[categoryStat.type],
  }));

  return Response.json(categorizedStats);
}

export type GetCategoriesStatsResponseType = Awaited<
  ReturnType<typeof getCategoryStats>
>;

async function getCategoryStats(from: Date, to: Date, id: string | null) {
  const whereClause: any = {
    date: {
      gte: from,
      lte: to,
    },
  };

  if (id) {
    whereClause.id = id;
  }

  const stats = await prisma.transaction.groupBy({
    by: ["type"],
    where: whereClause,
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

async function getCategoryDescriptions() {
  const transactions = await prisma.transaction.findMany();
  const categoryDescriptions: { [key: string]: string } = {};

  transactions.forEach((transaction) => {
    categoryDescriptions[transaction.description] = transaction.description;
  });

  return categoryDescriptions;
}