import { getPayableTransaction } from "@/app/actions/auth.actions";
import PaymentTransaction from "@/components/PaymentTransaction";
import TransactionForm from "@/components/TransactionForm";
import { validateRequest } from "@/database/auth";
import React from "react";

export default async function Transaction() {
  const errandId = await getPayableTransaction();
  return (
    <div>
      <TransactionForm errand={errandId} />
    </div>
  );
}
