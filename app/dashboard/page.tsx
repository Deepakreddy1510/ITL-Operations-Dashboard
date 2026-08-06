import { Shell } from "@/components/shell";
import { StatCard } from "@/components/stat-card";
import { SalesChart, ProductChart } from "@/components/chart";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [orders, quotes, materials] = await Promise.all([
    prisma.order.findMany(),
    prisma.quotation.findMany(),
    prisma.material.findMany(),
  ]);

  const monthSales = orders
    .filter((order) => order.status !== "PENDING")
    .reduce((sum, order) => sum + order.amount, 0);

  const pending = orders.filter((order) =>
    ["PENDING", "PRODUCTION"].includes(order.status)
  ).length;

  const ready = orders.filter((order) => order.status === "READY").length;

  const low = materials.filter(
    (material) => material.currentStock < material.minimumStock
  ).length;

  const sales = [
    { name: "Jan", value: 28 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 31 },
    { name: "Apr", value: 42 },
    { name: "May", value: 47 },
    { name: "Jun", value: 44 },
    { name: "Jul", value: 53 },
  ];

  const products = [
    { name: "PVC", value: 42 },
    { name: "HDPE", value: 34 },
    { name: "CPVC", value: 18 },
    { name: "Agri", value: 26 },
  ];

  return (
    <Shell title="Dashboard" subtitle="Hyderabad branch overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Today's Sales"
          value={money(1850000)}
          note="Across 6 invoices"
        />

        <StatCard
          label="Monthly Sales"
          value={money(monthSales)}
          note="Based on current orders"
        />

        <StatCard
          label="Pending Quotations"
          value={String(
            quotes.filter((quote) => quote.status === "PENDING").length
          )}
          note="Awaiting customer decision"
        />

        <StatCard
          label="Pending Orders"
          value={String(pending)}
          note="Pending or in production"
        />

        <StatCard
          label="Ready for Dispatch"
          value={String(ready)}
          note="Dispatch action required"
        />

        <StatCard
          label="Low Stock Materials"
          value={String(low)}
          note="Below configured minimum"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="card p-5">
          <h2 className="font-semibold">Monthly sales trend</h2>
          <p className="mb-4 text-sm text-slate-500">Values in ₹ lakh</p>
          <SalesChart data={sales} />
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">Product-wise sales</h2>
          <p className="mb-4 text-sm text-slate-500">
            Current month contribution
          </p>
          <ProductChart data={products} />
        </section>
      </div>
    </Shell>
  );
}