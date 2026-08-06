import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
async function main(){
  await prisma.notification.deleteMany(); await prisma.purchase.deleteMany(); await prisma.material.deleteMany(); await prisma.order.deleteMany(); await prisma.quotation.deleteMany(); await prisma.customer.deleteMany();

  await prisma.user.deleteMany();
  const adminEmail=(process.env.MANAGER_EMAIL||"manager@example.com").toLowerCase();
  const adminPassword=process.env.MANAGER_PASSWORD||"ChangeMe123!";
  await prisma.user.create({data:{name:"Branch Manager",email:adminEmail,passwordHash:await bcrypt.hash(adminPassword,12),isAdmin:true,isActive:true}});
  await prisma.user.create({data:{name:"Sales Viewer",email:"sales@example.com",passwordHash:await bcrypt.hash("Sales123!",12),isAdmin:false,isActive:true}});
  const customers=await Promise.all([
    prisma.customer.create({data:{name:"Sri Balaji Traders",phone:"98480 11223",location:"Kukatpally",outstanding:325000}}),
    prisma.customer.create({data:{name:"Metro Infra Projects",phone:"98660 22334",location:"Gachibowli",outstanding:840000}}),
    prisma.customer.create({data:{name:"Venkateshwara Agencies",phone:"99890 33445",location:"Secunderabad",outstanding:125000}}),
    prisma.customer.create({data:{name:"Deccan Builders",phone:"97010 44556",location:"Shamshabad",outstanding:460000}})
  ]);
  const now=new Date(); const d=(n:number)=>new Date(now.getTime()+n*86400000);
  await prisma.quotation.createMany({data:[
    {number:"QTN-HYD-1001",customerId:customers[0].id,date:d(-4),amount:1820000,salesperson:"Ramesh",status:"PENDING"},
    {number:"QTN-HYD-1002",customerId:customers[1].id,date:d(-8),amount:2650000,salesperson:"Suresh",status:"ACCEPTED"},
    {number:"QTN-HYD-1003",customerId:customers[2].id,date:d(-2),amount:940000,salesperson:"Ramesh",status:"PENDING"},
    {number:"QTN-HYD-1004",customerId:customers[3].id,date:d(-12),amount:1460000,salesperson:"Anil",status:"REJECTED"}
  ]});
  await prisma.order.createMany({data:[
    {number:"ORD-HYD-2201",customerId:customers[1].id,items:"HDPE Pipes 110mm",quantity:450,orderDate:d(-10),deliveryDate:d(2),amount:2150000,status:"PRODUCTION"},
    {number:"ORD-HYD-2202",customerId:customers[0].id,items:"PVC Pipes 4 inch",quantity:700,orderDate:d(-7),deliveryDate:d(0),amount:1280000,status:"READY"},
    {number:"ORD-HYD-2203",customerId:customers[3].id,items:"CPVC Pipes 2 inch",quantity:320,orderDate:d(-15),deliveryDate:d(-1),amount:880000,status:"DELAYED"},
    {number:"ORD-HYD-2204",customerId:customers[2].id,items:"Agriculture Pipes",quantity:250,orderDate:d(-5),deliveryDate:d(4),amount:640000,status:"PENDING"}
  ]});
  await prisma.material.createMany({data:[
    {name:"PVC Resin",currentStock:12.4,minimumStock:15,unit:"Ton",supplier:"Reliance Polymers",lastPurchaseDate:d(-12)},
    {name:"HDPE Granules",currentStock:26.8,minimumStock:18,unit:"Ton",supplier:"GAIL India",lastPurchaseDate:d(-8)},
    {name:"Calcium Carbonate",currentStock:8.2,minimumStock:10,unit:"Ton",supplier:"Deccan Minerals",lastPurchaseDate:d(-20)},
    {name:"Stabilizer Compound",currentStock:4.8,minimumStock:4,unit:"Ton",supplier:"Chemplast",lastPurchaseDate:d(-16)}
  ]});
  await prisma.purchase.createMany({data:[
    {supplier:"Reliance Polymers",material:"PVC Resin",quantity:20,amount:1760000,invoice:"INV-RP-8821",purchaseDate:d(-12)},
    {supplier:"GAIL India",material:"HDPE Granules",quantity:25,amount:2425000,invoice:"INV-GAIL-7720",purchaseDate:d(-8)},
    {supplier:"Deccan Minerals",material:"Calcium Carbonate",quantity:10,amount:360000,invoice:"INV-DM-4012",purchaseDate:d(-20)}
  ]});
  await prisma.notification.createMany({data:[
    {title:"PVC Resin below minimum",message:"Current stock is 12.4 Ton; minimum is 15 Ton.",type:"LOW_STOCK"},
    {title:"Delayed delivery",message:"ORD-HYD-2203 crossed its planned delivery date.",type:"DELAYED_ORDER"},
    {title:"Large accepted quotation",message:"QTN-HYD-1002 for ₹26.5 lakh was accepted.",type:"LARGE_ORDER"}
  ]});
}
main().finally(()=>prisma.$disconnect());
