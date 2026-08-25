import { randomUUID } from "crypto";

const SUPPORTED_GATEWAYS = ["SANDBOX"];

export const processGatewayPayment = async ({
  gateway = "SANDBOX",
  amount,
  currency = "USD",
  paymentToken,
}) => {
  const normalizedGateway = String(gateway).trim().toUpperCase();
  const paymentAmount = Number(amount);

  if (!SUPPORTED_GATEWAYS.includes(normalizedGateway)) {
    throw new Error("Unsupported payment gateway");
  }

  if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
    throw new Error("Invalid payment amount");
  }

  if (!paymentToken || typeof paymentToken !== "string") {
    throw new Error("Payment token is required");
  }

  // Simulated sandbox gateway response.
  // No real card data is stored or processed.
  const transactionId = `GW-${randomUUID().split("-")[0].toUpperCase()}`;

  return {
    success: true,
    gateway: normalizedGateway,
    transactionId,
    amount: paymentAmount,
    currency: String(currency).toUpperCase(),
    status: "COMPLETED",
    processedAt: new Date(),
  };
};