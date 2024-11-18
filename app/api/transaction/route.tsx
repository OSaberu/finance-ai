// app/api/transaction/route.js

import { db } from "../../_lib/prisma"; // Adjust the path as needed

export async function POST(req) {
  try {
    const { name, type, amount, category, paymentMethod, userId } =
      await req.json();

    const transaction = await db.transaction.create({
      data: {
        name,
        type,
        amount,
        category,
        paymentMethod,
        userId,
      },
    });

    console.log("Transaction created:", transaction); // Log transaction
    return new Response(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return new Response("Failed to create transaction", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const transaction = await db.transaction.delete({
      where: { id },
    });

    console.log(`Successfully deleting transaction (${id}):`, transaction); // Log transaction
    return new Response(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    console.error("Error deleting transaction :", error);
    return new Response("Failed to delete transaction", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("ID parameter is required", { status: 400 });
    }

    const transaction = await db.transaction.findFirst({
      where: { id },
    });

    if (!transaction) {
      return new Response("Transaction not found", { status: 404 });
    }

    console.log(`Successfully got transaction (${id}):`, transaction);
    return new Response(JSON.stringify(transaction), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error getting transaction:", error);
    return new Response("Failed to get transaction", { status: 500 });
  }
}
