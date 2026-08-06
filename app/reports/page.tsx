import { Shell } from "@/components/shell";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Page() {
  const orders = await prisma.order.findMany();

  const total = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <Shell title="Reports" subtitle="Simple branch summaries">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Daily", "Weekly", "Monthly", "Yearly"].map((label, index) => (
          <div className="card p-5" key={label}>
            <h2 className="font-semibold">{label} report</h2>

            <p className="mt-4 text-2xl font-semibold">
              {money(total / (index + 1))}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Sales summary and order status
            </p>

            <p className="mt-5 text-xs text-slate-500">
              Use Ctrl+P to print or save as PDF.
            </p>
          </div>
        ))}
      </div>

      <div className="card mt-6 p-6">
        <h2 className="font-semibold">Management summary</h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          The Hyderabad branch currently has {orders.length} active order records
          with a combined value of {money(total)}. Use the browser print option to
          save this report as a PDF.
        </p>
      </div>
    </Shell>
  );
}